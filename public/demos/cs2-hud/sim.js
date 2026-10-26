// Plays a scripted sample match for the HUD demo. It answers the HUD's requests to the
// local GSI server with match data in the same shape main.py serves, so index.html runs unchanged.
(function () {
  var T = ['alp', 'kaan', 'deniz', 'mert', 'efe'];
  var CT = ['arda', 'can', 'baris', 'onur', 'emir'];
  var WEAPON = { alp: 'AK47', kaan: 'AK47', deniz: 'AWP', mert: 'GALILAR', efe: 'AK47', arda: 'M4A1', can: 'M4A1_SILENCER', baris: 'AWP', onur: 'FAMAS', emir: 'M4A1' };
  var NADES = { alp: ['flashbang', 'smokegrenade'], kaan: ['hegrenade'], deniz: [], mert: ['molotov'], efe: ['flashbang'], arda: ['smokegrenade'], can: ['flashbang', 'hegrenade'], baris: [], onur: ['incgrenade'], emir: ['smokegrenade'] };
  var ROUND = 58; // seconds per demo round

  // [time, 'dmg', victim, damage] or [time, 'kill', killer, victim]
  var EVENTS = [
    [7, 'dmg', 'arda', 27], [9, 'kill', 'alp', 'arda'], [11, 'dmg', 'mert', 41], [13, 'kill', 'can', 'mert'],
    [15, 'dmg', 'deniz', 12], [17, 'kill', 'deniz', 'onur'], [21, 'dmg', 'efe', 63], [24, 'kill', 'baris', 'efe'],
    [28, 'dmg', 'can', 35], [36, 'kill', 'emir', 'kaan'], [39, 'dmg', 'emir', 48],
  ];
  // Odd rounds the defuser is picked off and the bomb goes off; even rounds CT defuse with a kit.
  var ODD_EVENTS = [[41, 'kill', 'deniz', 'can']];

  var clock = 0, last = performance.now(), paused = false;
  window.addEventListener('message', function (e) {
    if (e.data === 'pause') paused = true;
    if (e.data === 'play') paused = false;
    if (e.data === 'restart') clock = 0;
  });
  function now() {
    var t = performance.now();
    if (!paused) clock += (t - last) / 1000;
    last = t;
    return clock;
  }

  function playRound(state, events, upTo) {
    events.forEach(function (ev) {
      if (ev[0] > upTo) return;
      if (ev[1] === 'dmg') state.hp[ev[2]] = Math.max(1, state.hp[ev[2]] - ev[3]);
      else { state.kills[ev[2]]++; state.deaths[ev[3]]++; state.hp[ev[3]] = 0; state.money[ev[2]] += 300; }
    });
  }

  function matchState() {
    var elapsed = now();
    var round = Math.floor(elapsed / ROUND);
    var t = elapsed - round * ROUND;
    var odd = round % 2 === 1;
    var all = T.concat(CT);
    var st = { hp: {}, kills: {}, deaths: {}, money: {} };
    all.forEach(function (p, i) { st.kills[p] = 0; st.deaths[p] = 0; st.hp[p] = 100; st.money[p] = 2400 + ((i * 731 + round * 977) % 3100); });

    // Earlier rounds count towards K/D and the score.
    var tScore = 0, ctScore = 0;
    for (var r = 0; r < round; r++) {
      playRound(st, r % 2 === 1 ? EVENTS.concat(ODD_EVENTS) : EVENTS, ROUND);
      if (r % 2 === 1) tScore++; else ctScore++;
    }
    all.forEach(function (p) { st.hp[p] = 100; });
    playRound(st, odd ? EVENTS.concat(ODD_EVENTS) : EVENTS, t);

    var faz, sure, bomb = '';
    var end = odd ? 50 : 45;
    if (t < 5) { faz = 'freezetime'; sure = 5 - t; }
    else if (t < 30) { faz = 'live'; sure = 115 - (t - 5); }
    else if (!odd && t >= 40 && t < end) { faz = 'defuse'; sure = 5 - (t - 40); bomb = 'planted'; }
    else if (t < end) { faz = 'bomb'; sure = Math.max(0, 40 - (t - 30) * 2); bomb = 'planted'; }
    else { faz = 'over'; sure = ROUND - t; bomb = odd ? 'exploded' : 'defused'; if (odd) tScore++; else ctScore++; }

    function player(name) {
      return { isim: name, hp: st.hp[name], para: st.money[name], kill: st.kills[name], olum: st.deaths[name], silah: st.hp[name] > 0 ? WEAPON[name] : '', bombalar: st.hp[name] > 0 ? NADES[name] : [] };
    }
    var spectateOrder = ['alp', 'can', 'deniz', 'emir', 'baris', 'kaan'];
    var alive = spectateOrder.filter(function (p) { return st.hp[p] > 0; });
    var watched = alive.length ? alive[Math.floor(t / 9) % alive.length] : null;
    var active = watched && {
      isim: watched, takim: T.indexOf(watched) >= 0 ? 'T' : 'CT', hp: st.hp[watched], zirt: 100,
      mermi: 30 - (Math.floor(t * 2) % 26), mermi_yedek: 90, kill: st.kills[watched], asist: Math.floor(round / 2), olum: st.deaths[watched],
    };

    return { t_skor: tScore, ct_skor: ctScore, round: round + 1, bomba_durumu: bomb, faz: faz, sure: sure, t_takimi: T.map(player), ct_takimi: CT.map(player), aktif_oyuncu: active };
  }

  var realFetch = window.fetch.bind(window);
  window.fetch = function (url, opts) {
    if (String(url).indexOf('/canli_veri') >= 0) {
      return Promise.resolve(new Response(JSON.stringify(matchState()), { headers: { 'Content-Type': 'application/json' } }));
    }
    return realFetch(url, opts);
  };
})();
