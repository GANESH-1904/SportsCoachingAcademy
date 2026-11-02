/* KINETIX – main.js : single script for every page (theme, image fallback, data, layout, behaviour). */
(function(){
"use strict";
/* --- 1. Runs immediately: theme + direction (no flash) and photo fallback --- */
/* Runs in <head> to avoid theme/direction flash. Detects system preference when nothing saved. */
(function () {
  var r = document.documentElement, t = null, d = null;
  try { t = localStorage.getItem('kx-theme'); d = localStorage.getItem('kx-dir'); } catch (e) {}
  r.setAttribute('data-theme', t || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  r.setAttribute('dir', d || 'ltr');
})();

/* If a photo fails to load, try its data-fb backup once before the site-wide blank handler kicks in. */
window.addEventListener('error', function (e) {
  var t = e.target;
  if (!t || t.tagName !== 'IMG' || !t.dataset.fb || t.dataset.fbTried) return;
  t.dataset.fbTried = '1';
  e.stopPropagation();
  t.removeAttribute('srcset');
  t.src = t.dataset.fb;
}, true);

/* --- 2. Everything else runs once the document has been parsed --- */
var PAGE="";
function run(name,fn){try{fn()}catch(e){if(window.console)console.error("[kinetix] "+name+" failed:",e)}}
function boot(){
PAGE=document.body.getAttribute("data-page")||"";

/* ===== brands ===== */
run("brands",function(){
/* Brand glyphs (Font Awesome Free 7, CC BY 4.0) – KX.bi(name) returns an inline SVG */
window.KX=window.KX||{};
KX.BRANDS={"instagram":["0 0 448 512","M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"],"facebook":["0 0 512 512","M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"],"x-twitter":["0 0 448 512","M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"],"youtube":["0 0 576 512","M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z"],"linkedin":["0 0 448 512","M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"],"whatsapp":["0 0 448 512","M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z"],"telegram":["0 0 512 512","M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM371 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5c-2.2 .5-37.1 23.5-104.6 69.1-9.9 6.8-18.9 10.1-26.9 9.9-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3 .6-4.5 6.7-9 18.4-13.7 72.3-31.5 120.5-52.3 144.6-62.3 68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9 2 1.7 3.2 4.1 3.5 6.7 .5 3.2 .6 6.5 .4 9.8z"],"threads":["0 0 448 512","M340.8 238c-.6-69.6-38.3-111.5-102-111.5-42.5 0-78.3 19.2-97.1 49.9l41.2 28.7c10.7-16.8 25.4-30.8 52.4-30.8 30.5 0 46.3 17 50.8 48.5-14.7-2.3-29.5-3.5-44.6-3.5-82.4 0-121.1 37.3-121.1 86.6s38.8 79.7 95.9 79.7c62.7 0 100.1-42.2 115.4-94.5 15.9 7.2 26.9 24 26.9 49.3 0 67.6-78 104.5-144.1 104.5-97.5 0-161.3-64-161.3-168.2 0-127.6 84.3-209.4 197.6-209.4 76 0 113.6 33.4 139.2 78.1L432 115.9c-27.8-58-89.9-99.5-183.1-99.5-148.5 0-249.5 105.4-249.5 258.2 0 139.8 98.9 220.9 216.7 220.9 97.4 0 195.8-56.8 195.8-154 0-50.8-29.2-84.5-71.2-103.5zM214.4 334.9c-21.5 0-40.4-10.2-40.4-29 0-29.6 36.4-38.6 72-38.6 13.5 0 26.8 .9 38.5 3.5-8.4 38.5-33.4 64.2-70 64.2l0 0z"],"pinterest":["0 0 512 512","M504 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2C161.5 437.2 163.5 467.4 165.6 487 73.4 450.9 8 361.1 8 256 8 119 119 8 256 8S504 119 504 256z"],"tiktok":["0 0 448 512","M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"]};
KX.bi=(n,c='')=>{const b=KX.BRANDS[n];return b?`<svg class="bi ${c}" viewBox="${b[0]}" fill="currentColor" aria-hidden="true" focusable="false"><path d="${b[1]}"/></svg>`:''};
});

/* ===== data ===== */
run("data",function(){
/* Kinetix data – sports, coaches, batches. TODO: replace with real content / API */
window.KX = window.KX || {};
KX.img = (id, w = 800) => !id ? '' : /^px:/.test(id) ? `https://images.pexels.com/photos/${id.slice(3)}/pexels-photo-${id.slice(3)}.jpeg?auto=compress&cs=tinysrgb&w=${w}` : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
KX.sports = [
 {id:'football',name:'Football',icon:'goal',cat:'team',tag:'Own the pitch.',ages:'6–17',img:'px:10347800',bg:'px:21561836',desc:'Ball mastery, positional play and match intelligence on full-size turf.'},
 {id:'basketball',name:'Basketball',icon:'dribbble',cat:'team',tag:'Rise above the rim.',ages:'8–17',img:'px:8337502',bg:'px:4946389',desc:'Shooting form, footwork and fast-break systems on an indoor hardwood court.'},
 {id:'cricket',name:'Cricket',icon:'target',cat:'team',tag:'Patience builds legends.',ages:'7–17',img:'px:13509977',bg:'px:29546853',desc:'Net sessions with bowling machines, fielding drills and match simulations.'},
 {id:'tennis',name:'Tennis',icon:'circle-dot',cat:'individual',tag:'Every point is a lesson.',ages:'6–17',img:'px:35214648',bg:'px:19872965',desc:'Stroke technique, court craft and tournament readiness on hard courts.'},
 {id:'swimming',name:'Swimming',icon:'waves',cat:'individual',tag:'Find your flow.',ages:'5–17',img:'px:12061244',bg:'px:8688139',desc:'Water safety to stroke refinement in a heated 25 m lap pool.'},
 {id:'athletics',name:'Athletics',icon:'timer',cat:'individual',tag:'Chase the clock.',ages:'9–16',img:'px:11344317',bg:'px:332835',desc:'Sprints, middle distance, jumps and throws on a synthetic track.'},
 {id:'badminton',name:'Badminton',icon:'feather',cat:'individual',tag:'Speed that startles.',ages:'8–15',img:'px:13701956',bg:'px:5407033',desc:'Footwork ladders, smash mechanics and doubles strategy on wooden courts.'},
 {id:'conditioning',name:'Strength & Conditioning',icon:'dumbbell',cat:'fitness',tag:'Strong body, steady mind.',ages:'12–17',img:'px:16551903',bg:'px:14599070',desc:'Age-safe strength, mobility and injury-prevention for every sport.'}
];
KX.coaches = [
 {id:'c1',name:'Oliver Bennett',role:'Head Football Coach',sport:'Football',exp:14,cert:'AFC B Licence',img:'px:6767251',quote:'Skills win practice. Character wins matches.',bio:'Former state-level midfielder who has sent 22 players to district and state academies.'},
 {id:'c2',name:'Charlotte Hughes',role:'Swimming Lead',sport:'Swimming',exp:11,cert:'SAI Level 2, Lifesaving',img:'px:34231103',quote:'Confidence in water changes a child everywhere else.',bio:'National-level swimmer turned coach; specialist in first-time swimmers and stroke correction.'},
 {id:'c3',name:'Thomas Walker',role:'Cricket Director',sport:'Cricket',exp:16,cert:'BCCI Level 2',img:'px:7207356',quote:'Technique first, then temperament.',bio:'Ranji-circuit pace bowler who builds technique through video analysis and match scenarios.'},
 {id:'c4',name:'Emily Carter',role:'Tennis Head Coach',sport:'Tennis',exp:9,cert:'ITF Level 1',img:'px:29242430',quote:'Play smart, play brave, play long.',bio:'Ex-national junior champion who focuses on movement efficiency and tournament mindset.'},
 {id:'c5',name:'Henry Fraser',role:'Basketball Coach',sport:'Basketball',exp:12,cert:'FIBA Coaching Cert.',img:'px:6767338',quote:'Great teams pass before they shoot.',bio:'Runs the academy league and mentors young point guards in decision making.'},
 {id:'c6',name:'Sophie Allen',role:'Badminton & Conditioning Coach',sport:'Badminton',exp:10,cert:'BWF Level 1, NSCA-CPT',img:'px:3757941',quote:'Strong athletes get injured less and improve faster.',bio:'Builds age-appropriate strength programmes and coaches our badminton and athletics squads.'}
];
KX.batches = [
 {id:'b1',img:'px:14792839',sport:'Football',name:'Football Juniors',age:[6,9],days:['Mon','Wed','Fri'],start:'16:30',end:'17:30',coach:'Oliver Bennett',cap:18,left:6,fee:2400,level:'Beginner'},
 {id:'b2',img:'px:25754073',sport:'Football',name:'Football Academy',age:[10,14],days:['Tue','Thu','Sat'],start:'17:00',end:'18:30',coach:'Oliver Bennett',cap:20,left:4,fee:2800,level:'Intermediate'},
 {id:'b3',img:'px:8337486',sport:'Basketball',name:'Basketball Starters',age:[8,12],days:['Mon','Wed'],start:'17:00',end:'18:00',coach:'Henry Fraser',cap:16,left:5,fee:2200,level:'Beginner'},
 {id:'b4',img:'px:8336973',sport:'Basketball',name:'Basketball Elite',age:[13,17],days:['Tue','Thu','Sat'],start:'18:30',end:'20:00',coach:'Henry Fraser',cap:14,left:3,fee:2900,level:'Advanced'},
 {id:'b5',img:'px:3948140',sport:'Cricket',name:'Cricket Cubs',age:[7,11],days:['Sat','Sun'],start:'07:00',end:'09:00',coach:'Thomas Walker',cap:24,left:9,fee:2000,level:'Beginner'},
 {id:'b6',img:'px:20652481',sport:'Cricket',name:'Cricket Pro Squad',age:[12,17],days:['Mon','Wed','Fri'],start:'06:00',end:'07:30',coach:'Thomas Walker',cap:20,left:2,fee:3000,level:'Advanced'},
 {id:'b7',img:'px:8224679',sport:'Tennis',name:'Tennis Foundations',age:[6,10],days:['Tue','Thu'],start:'16:30',end:'17:30',coach:'Emily Carter',cap:12,left:4,fee:3200,level:'Beginner'},
 {id:'b8',img:'px:8223992',sport:'Tennis',name:'Tennis Tournament Track',age:[11,17],days:['Mon','Wed','Fri'],start:'17:30',end:'19:00',coach:'Emily Carter',cap:10,left:2,fee:3600,level:'Advanced'},
 {id:'b9',img:'px:3775140',sport:'Swimming',name:'Splash Starters',age:[5,9],days:['Tue','Thu','Sat'],start:'06:00',end:'07:00',coach:'Charlotte Hughes',cap:12,left:5,fee:2600,level:'Beginner'},
 {id:'b10',img:'px:8688158',sport:'Swimming',name:'Swim Performance',age:[10,17],days:['Mon','Wed','Fri'],start:'06:00',end:'07:15',coach:'Charlotte Hughes',cap:12,left:3,fee:3000,level:'Advanced'},
 {id:'b11',img:'px:29264493',sport:'Athletics',name:'Track & Field Club',age:[9,16],days:['Tue','Thu','Sat'],start:'06:00',end:'07:30',coach:'Sophie Allen',cap:25,left:11,fee:1800,level:'Intermediate'},
 {id:'b12',img:'px:16941866',sport:'Badminton',name:'Badminton Rally',age:[8,15],days:['Mon','Wed','Fri'],start:'18:00',end:'19:15',coach:'Sophie Allen',cap:16,left:7,fee:2200,level:'Intermediate'},
 {id:'b13',img:'px:19018865',sport:'Strength & Conditioning',name:'Athlete Conditioning',age:[12,17],days:['Tue','Thu'],start:'19:00',end:'20:00',coach:'Sophie Allen',cap:15,left:8,fee:2000,level:'Intermediate'}
];
KX.fmtTime = t => { const [h,m] = t.split(':').map(Number); return `${h%12||12}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`; };
KX.inr = n => '₹' + Number(n).toLocaleString('en-IN');
});

/* ===== layout-and-core ===== */
run("layout-and-core",function(){
/* ==========================================================================
   KINETIX – main.js
   Layout injection · theme/RTL · renderers · filters · validation · auth
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const KX = (window.KX = window.KX || {});
  const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  KX.store = store;
  const icons = () => window.lucide && window.lucide.createIcons();
  const ic = (n, c = '') => `<i data-lucide="${n}" class="icon ${c}" aria-hidden="true"></i>`;
  KX.ic = ic; KX.icons = icons;

  /* Toast */
  KX.toast = function (msg, type) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.style.borderInlineStartColor = type === 'error' ? 'var(--bad)' : 'var(--ok)'; t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3500);
  };

  /* Broken-image fallback so no empty boxes ever show */
  document.addEventListener('error', e => { if (e.target.tagName === 'IMG' && !e.target.classList.contains('img-fail')) { e.target.classList.add('img-fail'); e.target.removeAttribute('srcset'); e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%271%27 height=%271%27/%3E'; } }, true);

  /* Theme + RTL */
  function themeIcon() { $$('[data-theme-toggle]').forEach(b => { const d = document.documentElement.dataset.theme === 'dark'; b.innerHTML = ic(d ? 'sun' : 'moon'); b.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode'); }); icons(); }
  function bindTools() {
    $$('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => { const n = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; try { localStorage.setItem('kx-theme', n); } catch (e) {} themeIcon(); }));
    $$('[data-rtl-toggle]').forEach(b => { b.addEventListener('click', () => { const n = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'; document.documentElement.dir = n; try { localStorage.setItem('kx-dir', n); } catch (e) {} b.setAttribute('aria-pressed', n === 'rtl'); }); b.setAttribute('aria-pressed', document.documentElement.dir === 'rtl'); });
  }
  KX.toolButtons = () => `<button class="icon-btn" data-theme-toggle type="button" aria-label="Toggle dark mode"></button><button class="icon-btn" data-rtl-toggle type="button" aria-label="Toggle right-to-left layout">RTL</button>`;

  /* Header + footer (shared) */
  const page = document.body.dataset.page || '';
  const MARK = (id) => `<svg class="logo-mark" viewBox="0 0 64 64" role="img" aria-label="Kinetix Sports Academy logo" focusable="false" xmlns="http://www.w3.org/2000/svg"><circle class="lm-ring" cx="32" cy="32" r="31"/><circle class="lm-disc" cx="32" cy="32" r="26.500"/><ellipse class="lm-fg" cx="38.33" cy="53.00" rx="4.1" ry="1.8" transform="rotate(-46.0 38.33 53.00)"/><ellipse class="lm-fg" cx="43.82" cy="50.25" rx="4.1" ry="1.8" transform="rotate(-63.2 43.82 50.25)"/><ellipse class="lm-fg" cx="48.24" cy="46.01" rx="4.1" ry="1.8" transform="rotate(-80.4 48.24 46.01)"/><ellipse class="lm-fg" cx="51.21" cy="40.65" rx="4.1" ry="1.8" transform="rotate(-97.6 51.21 40.65)"/><ellipse class="lm-fg" cx="52.47" cy="34.64" rx="4.1" ry="1.8" transform="rotate(-114.8 52.47 34.64)"/><ellipse class="lm-fg" cx="51.89" cy="28.54" rx="4.1" ry="1.8" transform="rotate(-132.0 51.89 28.54)"/><ellipse class="lm-fg" cx="25.67" cy="53.00" rx="4.1" ry="1.8" transform="rotate(-134.0 25.67 53.00)"/><ellipse class="lm-fg" cx="20.18" cy="50.25" rx="4.1" ry="1.8" transform="rotate(-116.8 20.18 50.25)"/><ellipse class="lm-fg" cx="15.76" cy="46.01" rx="4.1" ry="1.8" transform="rotate(-99.6 15.76 46.01)"/><ellipse class="lm-fg" cx="12.79" cy="40.65" rx="4.1" ry="1.8" transform="rotate(-82.4 12.79 40.65)"/><ellipse class="lm-fg" cx="11.53" cy="34.64" rx="4.1" ry="1.8" transform="rotate(-65.2 11.53 34.64)"/><ellipse class="lm-fg" cx="12.11" cy="28.54" rx="4.1" ry="1.8" transform="rotate(-48.0 12.11 28.54)"/><polygon class="lm-fg" points="32.00 7.40 32.84 9.64 35.23 9.75 33.36 11.24 34.00 13.55 32.00 12.23 30.00 13.55 30.64 11.24 28.77 9.75 31.16 9.64"/><clipPath id="${id}"><circle cx="32" cy="33.5" r="11.5"/></clipPath><circle class="lm-fg" cx="32" cy="33.5" r="11.5"/><g clip-path="url(#${id})"><polygon class="lm-ring" points="37.07 26.52 35.94 23.05 38.89 20.91 41.85 23.05 40.72 26.52"/><polygon class="lm-ring" points="40.20 36.17 43.16 34.02 46.11 36.17 44.98 39.64 41.33 39.64"/><polygon class="lm-ring" points="32.00 42.12 34.95 44.27 33.83 47.74 30.17 47.74 29.05 44.27"/><polygon class="lm-ring" points="23.80 36.17 22.67 39.64 19.02 39.64 17.89 36.17 20.84 34.02"/><polygon class="lm-ring" points="26.93 26.52 23.28 26.52 22.15 23.05 25.11 20.91 28.06 23.05"/></g><polygon class="lm-ring" points="32.00 29.36 35.94 32.22 34.43 36.85 29.57 36.85 28.06 32.22"/><path class="lm-ln" d="M32.00 29.36L32.00 25.91M32.00 25.91L26.59 26.06M32.00 25.91L37.41 26.06M35.94 32.22L39.22 31.15M39.22 31.15L37.41 26.06M39.22 31.15L40.75 36.34M34.43 36.85L36.46 39.64M36.46 39.64L40.75 36.34M36.46 39.64L32.00 42.70M29.57 36.85L27.54 39.64M27.54 39.64L32.00 42.70M27.54 39.64L23.25 36.34M28.06 32.22L24.78 31.15M24.78 31.15L23.25 36.34M24.78 31.15L26.59 26.06" fill="none" stroke-width="0.69" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const session = store.get('kx-session', null);
  const bi = (n, c) => (KX.bi ? KX.bi(n, c) : '');
  const PHONE = '+919876543210', WA = 'https://wa.me/919876543210';
  /* Social profiles. TODO: replace each URL with the academy's real profile link */
  const SOCIAL = [['instagram', 'Instagram', 'https://www.instagram.com/'], ['facebook', 'Facebook', 'https://www.facebook.com/'], ['x-twitter', 'X (Twitter)', 'https://x.com/'], ['youtube', 'YouTube', 'https://www.youtube.com/'], ['linkedin', 'LinkedIn', 'https://www.linkedin.com/'], ['whatsapp', 'WhatsApp', WA], ['telegram', 'Telegram', 'https://t.me/'], ['threads', 'Threads', 'https://www.threads.net/'], ['pinterest', 'Pinterest', 'https://www.pinterest.com/'], ['tiktok', 'TikTok', 'https://www.tiktok.com/']];
  KX.socialRow = cls => `<div class="social ${cls || ''}">${SOCIAL.map(s => `<a href="${s[2]}" target="_blank" rel="noopener" aria-label="${s[1]}" title="${s[1]}" data-b="${s[0]}">${bi(s[0])}</a>`).join('')}</div>`;
  KX.waLink = t => WA + (t ? '?text=' + encodeURIComponent(t) : '');

  function header() {
    const cur = page === 'home2' ? 'home' : page;
    const links = [['about', 'About', 'about.html'], ['sports', 'Sports', 'sports.html'], ['coaches', 'Coaches', 'coaches.html'], ['batches', 'Batches', 'batches.html'], ['services', 'Services', 'services.html'], ['contact', 'Contact', 'contact.html'], ['dashboard', 'Dashboard', 'dashboard.html']];
    const homeItems = [['index.html', 'home', 'Home', 'Overview of the academy'], ['home2.html', 'home2', 'Home 2', 'Elite memberships & performance labs']];
    const homeDrop = `<li class="has-drop"><button class="drop-toggle ${cur === 'home' ? 'active' : ''}" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="homeMenu">Home ${ic('chevron-down', 'chev')}</button>
   <ul class="drop-menu" id="homeMenu">${homeItems.map(i => `<li><a href="${i[0]}"${i[1] && page === i[1] ? ' aria-current="page"' : ''}><b>${i[2]}</b><small>${i[3]}</small></a></li>`).join('')}</ul></li>`;
    const cta = session
      ? `<button class="btn btn-login" type="button" data-act="site-logout">Log out</button>`
      : `<a class="btn btn-login" href="login.html">Login</a>`;
    return `<header class="site-header"><div class="nav-wrap">
 <a class="brand" href="index.html" aria-label="Kinetix Sports Academy – home">${MARK('kmh')}<span><b>KINETIX</b><small>Sports Academy</small></span></a>
 <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="navPanel" aria-label="Open menu">${ic('menu')}</button>
 <div class="nav-panel" id="navPanel"><ul class="nav">
  ${homeDrop}
  ${links.map(l => `<li><a class="${cur === l[0] ? 'active' : ''}" href="${l[2]}"${cur === l[0] ? ' aria-current="page"' : ''}>${l[1]}</a></li>`).join('')}
 </ul>
 <div class="nav-actions"><div class="tools">${KX.toolButtons()}</div>${cta}</div></div>
</div></header>`;
  }
  function footer() {
    const d = new Date(), day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    const open = day === 0 ? h >= 7 && h < 13 : h >= 6 && h < 21, close = day === 0 ? '1 PM' : '9 PM';
    const news = page === 'home2' ? '' : `<section class="foot-news" aria-label="Newsletter"><div class="container"><div><b>${ic('mail')} The weekly training brief</b><span>Drills, nutrition tips and fixtures. Once a week, no spam.</span></div>
 <form data-validate data-success="You are subscribed. Check your inbox to confirm." action="#" method="post" novalidate><div class="field"><label class="sr" for="fnl">Email address</label><input class="input" id="fnl" name="email" type="email" placeholder="you@example.com" required autocomplete="email"></div><button class="btn btn-primary" type="submit">Subscribe</button></form></div></section>`;
    return `<section class="cta-band" aria-label="Book a free trial"><div class="container"><div><span class="tagline">Your champion is waiting.</span><h2>Let’s start their sports journey</h2></div>
 <div class="btn-row" style="margin:0"><a class="btn btn-primary" href="contact.html#trial">Book a free trial</a><a class="btn btn-secondary" href="tel:${PHONE}">${ic('phone')} Call us</a></div></div></section>
<footer class="site-footer">${news}<div class="foot-grid">
 <div class="foot-brand"><a class="brand" href="index.html">${MARK('kmf')}<span><b>KINETIX</b><small>Sports Academy</small></span></a>
  <span class="tagline" style="margin-top:var(--s3)">Where every champion begins.</span>
  <p>Eight sports, certified coaches and structured batches for ages 5–17. Train with purpose in Chennai.</p>
  <h5 class="follow">Follow us</h5>${KX.socialRow()}</div>
 <div><h4>Explore</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="sports.html">Sports</a></li><li><a href="coaches.html">Coaches</a></li><li><a href="batches.html">Batches</a></li><li><a href="services.html">Services</a></li><li><a href="home2.html">Premium programme</a></li><li><a href="contact.html">Contact</a></li></ul></div>
 <div><h4>Parent care</h4><ul><li><a class="pri" href="signup.html">Enrol a child</a></li><li><a href="contact.html#trial">Book a free trial</a></li><li><a href="login.html">Log in</a></li><li><a href="dashboard.html">Parent dashboard</a></li><li><a href="services.html#pricing">Fees &amp; plans</a></li><li><a href="services.html#calc">Fee calculator</a></li><li><a href="index.html#finder">Find a batch</a></li><li><a href="index.html#reviews">Reviews</a></li></ul></div>
 <div class="find"><h4>Find the academy</h4><ul><li><span class="open-dot${open ? '' : ' closed'}"></span><span>${open ? 'Open now · closes ' + close : 'Closed now · opens 6 AM'}</span></li>
 <li>${ic('map-pin')}<span>45 Champions Road, Velachery, Chennai, Tamil Nadu, India</span></li><li>${ic('mail')}<a href="mailto:hello@kinetixacademy.example">hello@kinetixacademy.example</a></li><li>${ic('phone')}<a href="tel:${PHONE}">+91 98765 43210</a></li><li>${ic('clock')}<span>Mon–Sat 6 AM – 9 PM · Sun 7 AM – 1 PM</span></li><li>${ic('navigation')}<a href="https://www.google.com/maps/search/?api=1&query=Velachery+Chennai" target="_blank" rel="noopener">Get directions</a></li></ul></div></div>
 <div class="foot-bottom"><div class="container"><span>© 2026 Kinetix Sports Academy. All rights reserved.</span><nav aria-label="Legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></nav></div></div></footer>
<nav class="m-bar" aria-label="Quick actions"><a href="tel:${PHONE}">${ic('phone')}<span>Call</span></a><a class="wa" href="${KX.waLink('Hi Kinetix, I would like to know more.')}" target="_blank" rel="noopener">${bi('whatsapp')}<span>WhatsApp</span></a><a class="go" href="contact.html#trial">${ic('calendar-check')}<span>Free trial</span></a></nav>
<button class="to-top" type="button" aria-label="Back to top">${ic('arrow-up')}</button>`;
  }
  const h = $('#site-header'), f = $('#site-footer'); if (h) h.innerHTML = header(); if (f) f.innerHTML = footer();

  /* Home dropdown (hover on desktop, tap/keyboard everywhere) */
  const drops = $$('.has-drop');
  const closeDrops = except => drops.forEach(d => { if (d !== except) { d.classList.remove('open'); const t = $('.drop-toggle', d); if (t) t.setAttribute('aria-expanded', 'false'); } });
  drops.forEach(d => { const t = $('.drop-toggle', d);
    t.addEventListener('click', () => { const o = !d.classList.contains('open'); closeDrops(d); d.classList.toggle('open', o); t.setAttribute('aria-expanded', o); });
    d.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover) and (min-width:1101px)').matches) { closeDrops(d); d.classList.add('open'); t.setAttribute('aria-expanded', 'true'); } });
    d.addEventListener('mouseleave', () => { if (matchMedia('(hover:hover) and (min-width:1101px)').matches) { d.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); } });
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && d.classList.contains('open')) { d.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.focus(); e.stopPropagation(); } });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.has-drop')) closeDrops(); });

  /* Log out from the public header */
  $$('[data-act="site-logout"]').forEach(b => b.addEventListener('click', () => { try { localStorage.removeItem('kx-session'); } catch (e) {} KX.toast('You have been logged out.'); setTimeout(() => location.reload(), 500); }));

  /* Add-to-calendar (.ics) for events: <a data-ics="2026-11-15|Title|Location"> */
  $$('[data-ics]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const [d, t, l] = a.dataset.ics.split('|'), ymd = d.replace(/-/g, ''), next = new Date(d + 'T00:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, '');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kinetix Sports Academy//EN', 'BEGIN:VEVENT', `UID:${ymd}-${t.length}@kinetix.example`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, `DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${end}`, `SUMMARY:${t}`, `LOCATION:${l || 'Kinetix Sports Academy, Velachery, Chennai'}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), x = document.createElement('a'); x.href = url; x.download = t.replace(/\W+/g, '-').toLowerCase() + '.ics'; document.body.appendChild(x); x.click(); x.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); KX.toast('Event saved. Open the file to add it to your calendar.');
  }));

  /* Login/sign-up pages: already signed in -> go straight to the dashboard */
  if (session && (page === 'login' || page === 'signup')) location.replace('index.html');

  /* Header interactions */
  const tg = $('.nav-toggle'), panel = $('#navPanel');
  const closeNav = () => { if (!panel) return; panel.classList.remove('open'); document.body.classList.remove('nav-open'); if (tg) { tg.setAttribute('aria-expanded', 'false'); tg.setAttribute('aria-label', 'Open menu'); tg.innerHTML = ic('menu'); icons(); } };
  if (tg) tg.addEventListener('click', () => { const o = panel.classList.toggle('open'); document.body.classList.toggle('nav-open', o); tg.setAttribute('aria-expanded', o); tg.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); tg.innerHTML = ic(o ? 'x' : 'menu'); icons(); });
  if (panel) panel.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  addEventListener('resize', () => { if (innerWidth > 1100) closeNav(); });
  const hd = $('.site-header'), tt = $('.to-top');
  addEventListener('scroll', () => { if (hd) hd.classList.toggle('scrolled', scrollY > 10); if (tt) tt.classList.toggle('show', scrollY > 600); }, { passive: true });
  if (tt) tt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* Card renderers (with skeleton loading state) */
  const cardSport = s => `<article class="card sport-card" data-cat="${s.cat}" data-tap><div class="thumb">${s.img ? `<img src="${KX.img(s.img, 700)}" alt="${s.name} training at Kinetix" loading="lazy">` : `<span class="ph-ico" role="img" aria-label="${s.name}"><i data-lucide="${s.icon}" class="icon"></i></span>`}</div><div class="body"><span class="script">${s.tag}</span><h3>${s.name}</h3><p>${s.desc}</p><div class="meta"><span class="pill">${s.cat[0].toUpperCase() + s.cat.slice(1)}</span></div></div></article>`;
  const cardCoach = c => `<article class="card coach-card" data-tap><div class="thumb"><img src="${KX.img(c.img, 600)}" alt="Portrait of ${c.name}, ${c.role}" loading="lazy" width="600" height="660"></div><div class="body"><h3>${c.name}</h3><span class="script">${c.role}</span><p>${c.bio}</p><div class="meta"><span class="pill">${c.exp}+ yrs</span><span class="pill">${c.cert}</span></div></div></article>`;
  const renderers = { sports: cardSport, coaches: cardCoach };
  $$('[data-render]').forEach(el => {
    const k = el.dataset.render; if (!renderers[k]) return; const off = +el.dataset.offset || 0, list = KX[k].slice(off, off + (+el.dataset.limit || 99));
    el.innerHTML = list.map(() => '<div class="skeleton" aria-hidden="true"></div>').join('');
    setTimeout(() => { el.innerHTML = list.map(renderers[k]).join(''); icons(); }, 350);
  });

  /* Batch table + filters */
  const bt = $('#batchBody');
  if (bt) {
    const fs = $('#fSport'), fa = $('#fAge'), fd = $('#fDay'), none = $('#noBatch');
    [...new Set(KX.batches.map(b => b.sport))].forEach(s => fs.insertAdjacentHTML('beforeend', `<option>${s}</option>`));
    const draw = () => {
      const age = +fa.value, rows = KX.batches.filter(b => (!fs.value || b.sport === fs.value) && (!fd.value || b.days.includes(fd.value)) && (!age || (age >= b.age[0] && age <= b.age[1])));
      bt.innerHTML = rows.map(b => `<tr><td data-label="Batch"><b>${b.name}</b><br><span class="muted">${b.sport} · ${b.level}</span></td><td data-label="Age">${b.age[0]}–${b.age[1]} yrs</td><td data-label="Days">${b.days.join(', ')}</td><td data-label="Time">${KX.fmtTime(b.start)} – ${KX.fmtTime(b.end)}</td><td data-label="Coach">${b.coach}</td><td data-label="Seats"><span class="pill ${b.left <= 3 ? 'bad' : b.left <= 6 ? 'warn' : 'ok'}">${b.left} seats left</span></td><td data-label="Fee">${KX.inr(b.fee)}/mo</td><td><a class="btn btn-primary btn-sm" href="dashboard.html#enroll">Enrol</a><a class="btn btn-secondary btn-sm" href="contact.html?batch=${b.id}#trial">Free trial</a></td></tr>`).join('');
      none.hidden = rows.length > 0;
    };
    [fs, fa, fd].forEach(e => e.addEventListener('change', draw)); draw();
  }

  /* Category filter chips (sports page) */
  $$('[data-filter-group]').forEach(g => { const target = $(g.dataset.filterGroup); $$('.chip', g).forEach(c => c.addEventListener('click', () => { $$('.chip', g).forEach(x => x.setAttribute('aria-pressed', x === c)); const v = c.dataset.filter; $$('[data-cat]', target).forEach(i => (i.style.display = v === 'all' || i.dataset.cat === v ? '' : 'none')); })); });

  /* Accordion */
  $$('.faq-q').forEach(q => q.addEventListener('click', () => q.setAttribute('aria-expanded', q.getAttribute('aria-expanded') !== 'true')));

  /* Counters + reveal */
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); const n = e.target.dataset.count; if (n) { const end = +n, t0 = performance.now(); const tick = t => { const p = Math.min((t - t0) / 1200, 1); e.target.textContent = Math.round(end * p).toLocaleString('en-IN') + (e.target.dataset.suffix || ''); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); } io.unobserve(e.target); }), { threshold: .2 });
  $$('.section-head,.stat,.media,.card,.step,.quote,.event,[data-count]').forEach(e => { if (!e.matches('[data-count]')) e.classList.add('reveal'); io.observe(e); });

  /* Touch alternative to hover: tap a card/tile to highlight it */
  document.addEventListener('click', e => { if (!matchMedia('(hover:none)').matches) return; const c = e.target.closest('[data-tap],.tile'); $$('.is-active').forEach(x => x !== c && x.classList.remove('is-active')); if (c) c.classList.toggle('is-active'); });

  /* Countdown */
  $$('[data-countdown]').forEach(el => { const end = new Date(el.dataset.countdown).getTime(); const t = () => { let d = Math.max(0, end - Date.now()); const v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]; $$('b', el).forEach((b, i) => (b.textContent = String(v[i]).padStart(2, '0'))); }; t(); setInterval(t, 1000); });

  /* Password toggle */
  $$('[data-pw-toggle]').forEach(b => b.addEventListener('click', () => { const i = b.previousElementSibling, s = i.type === 'password'; i.type = s ? 'text' : 'password'; b.innerHTML = ic(s ? 'eye-off' : 'eye'); b.setAttribute('aria-label', s ? 'Hide password' : 'Show password'); icons(); }));

  /* Form validation (client side). TODO: set form action to Formspree / Netlify Forms endpoint */
  function check(field) {
    const i = $('.input,input[type=checkbox]', field); if (!i) return true; const v = i.type === 'checkbox' ? i.checked : i.value.trim(); let m = '';
    if (i.required && !v) m = i.dataset.msg || 'This field is required.';
    else if (v && i.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = 'Enter a valid email, e.g. name@example.com.';
    else if (v && i.type === 'tel' && !/^[+]?[0-9\s-]{8,15}$/.test(v)) m = 'Enter a valid phone number (8–15 digits).';
    else if (v && i.minLength > 0 && v.length < i.minLength) m = `Use at least ${i.minLength} characters.`;
    else if (v && i.dataset.match && v !== $(i.dataset.match).value) m = 'Passwords do not match.';
    let e = $('.error', field); if (!e) { e = document.createElement('span'); e.className = 'error'; e.setAttribute('role', 'alert'); field.appendChild(e); }
    e.textContent = m; field.classList.toggle('invalid', !!m); i.setAttribute('aria-invalid', !!m); return !m;
  }
  KX.validate = form => $$('.field', form).map(check).every(Boolean);
  $$('form[data-validate]').forEach(form => {
    form.noValidate = true;
    $$('.field', form).forEach(fl => { const i = $('.input,input[type=checkbox]', fl); if (i) { i.addEventListener('blur', () => check(fl)); i.addEventListener('input', () => fl.classList.contains('invalid') && check(fl)); } });
    form.addEventListener('submit', e => { e.preventDefault(); if (!KX.validate(form)) { const bad = $('.invalid .input,.invalid input', form); if (bad) bad.focus(); return; } const a = form.dataset.auth; if (a) return auth(a, form); KX.toast(form.dataset.success || 'Thanks! We will reply within one working day.'); form.reset(); });
  });

  /* Auth (demo only – uses localStorage; replace with a real backend) */
  function auth(kind, form) {
    const val = n => (form.elements[n] ? form.elements[n].value.trim() : ''), users = store.get('kx-users', []);
    if (kind === 'signup') {
      if (users.some(u => u.email === val('email').toLowerCase())) { KX.toast('An account with this email already exists.', 'error'); return; }
      users.push({ name: val('name'), email: val('email').toLowerCase(), phone: val('phone'), password: val('password') }); store.set('kx-users', users);
      KX.toast('Account created. Redirecting to sign in…'); setTimeout(() => (location.href = 'login.html'), 900);
    } else {
      const em = val('email').toLowerCase(), pw = val('password'), demo = em === 'parent@kinetix.example' && pw === 'Parent@123', u = users.find(x => x.email === em && x.password === pw);
      if (!demo && !u) { KX.toast('Email or password is incorrect.', 'error'); return; }
      store.set('kx-session', { name: demo ? 'Priya Sharma' : u.name, email: em, phone: demo ? '+91 98765 11122' : u.phone });
      KX.toast('Welcome back! Taking you to the homepage…'); setTimeout(() => (location.href = 'index.html'), 700);
    }
  }
  $$('[data-social]').forEach(b => b.addEventListener('click', () => KX.toast(b.dataset.social + ' sign-in is a placeholder – connect your OAuth provider.')));
  const fp = $('[data-forgot]'); if (fp) fp.addEventListener('click', e => { e.preventDefault(); const em = $('#email'); KX.toast(em && em.value ? 'Reset link sent to ' + em.value + ' (demo).' : 'Enter your email first, then select Forgot password.', em && em.value ? '' : 'error'); });


  /* ---------- Batch finder (home) ---------- */
  const fin = $('[data-finder]');
  if (fin) {
    const fa = $('#finAge'), fs = $('#finSport'), fd = $('#finDay'), out = $('#finOut');
    [...new Set(KX.batches.map(b => b.sport))].forEach(x => fs.insertAdjacentHTML('beforeend', `<option>${x}</option>`));
    const draw = () => {
      const age = +fa.value;
      if (!age) { out.innerHTML = '<p class="fin-note">Choose your child’s age to see batches that fit.</p>'; return; }
      const rows = KX.batches.filter(b => age >= b.age[0] && age <= b.age[1] && (!fs.value || b.sport === fs.value) && (!fd.value || b.days.includes(fd.value))).sort((a, b) => a.left - b.left).slice(0, 4);
      out.innerHTML = rows.length ? rows.map(b => `<article class="card fin-card"><h3>${b.name}</h3><div class="meta"><span class="pill">${b.sport}</span><span class="pill">${b.level}</span><span class="pill ${b.left <= 3 ? 'bad' : b.left <= 6 ? 'warn' : 'ok'}">${b.left} seats left</span></div><p class="muted" style="margin:0">${b.days.join(', ')} · ${KX.fmtTime(b.start)} – ${KX.fmtTime(b.end)}<br>Coach ${b.coach}</p><div class="row"><b>${KX.inr(b.fee)}<small class="muted" style="font:400 .85rem var(--f-body)">/mo</small></b><span class="btns"><a class="btn btn-primary btn-sm" href="contact.html?batch=${b.id}#trial">Book free trial</a></span></div></article>`).join('') : '<p class="fin-note">No open batch matches those filters yet. Try another day or sport, or <a href="contact.html" style="color:var(--primary);font-weight:700">ask our team</a>.</p>';
    };
    [fa, fs, fd].forEach(e => e.addEventListener('change', draw)); draw();
  }

  /* ---------- Fee calculator (services) ---------- */
  const calc = $('[data-calc]');
  if (calc) {
    const q = n => { const e = $(`[name=${n}]`, calc); return e.type === 'radio' ? $(`[name=${n}]:checked`, calc).value : e.value; };
    const upd = () => {
      const plan = +q('plan'), kids = +q('kids'), annual = q('pay') === 'annual';
      const shares = [1, .9, .85].slice(0, kids), monthly = Math.round(plan * shares.reduce((a, b) => a + b, 0)), full = plan * kids, save = full - monthly, reg = annual ? 0 : 1000 * kids;
      $('#cMonthly', calc).textContent = KX.inr(monthly); $('#cFull', calc).textContent = KX.inr(full); $('#cSave', calc).textContent = '− ' + KX.inr(save); $('#cReg', calc).textContent = annual ? 'Waived' : KX.inr(reg); $('#cFirst', calc).textContent = KX.inr(monthly + reg);
    };
    $$('select,input', calc).forEach(e => e.addEventListener('change', upd)); upd();
  }

  /* ---------- Pre-fill the trial form from links (?batch=b2 or ?sport=Cricket) ---------- */
  const tf = $('#trialForm');
  if (tf) {
    const prm = new URLSearchParams(location.search), b = KX.batches.find(x => x.id === prm.get('batch')), sp = b ? b.sport : prm.get('sport');
    if (sp) { const o = [...$('#sport').options].find(x => x.textContent.trim() === sp); if (o) $('#sport').value = o.value || o.textContent; }
    if (b) { $('#age').value = Math.max(b.age[0], Math.min(b.age[1], +$('#age').value || b.age[0])); $('#msg').value = `Interested in ${b.name} (${b.days.join('/')}, ${KX.fmtTime(b.start)}).`; }
    const wa = $('[data-wa-send]', tf);
    if (wa) wa.addEventListener('click', () => {
      if (!KX.validate(tf)) { const bad = $('.invalid .input', tf); if (bad) bad.focus(); return; }
      const v = n => tf.elements[n].value.trim();
      const t = `Hi Kinetix! I'd like to book a free trial.\nParent: ${v('name')}\nPhone: ${v('phone')}\nSport: ${v('sport')}\nChild's age: ${v('age')}\nPreferred day: ${v('day') || 'Any'}\nNotes: ${v('message') || '-'}`;
      window.open('https://wa.me/919876543210?text=' + encodeURIComponent(t), '_blank', 'noopener');
    });
  }

  /* Brand glyph placeholders + compact social/help block on standalone pages */
  $$('[data-bi]').forEach(e => { e.innerHTML = bi(e.dataset.bi); });
  $$('[data-auth-foot]').forEach(e => { e.innerHTML = `<a class="wa-help" href="${KX.waLink('Hi Kinetix, I need help with my account.')}" target="_blank" rel="noopener">${bi('whatsapp')} Need help? Chat on WhatsApp</a>${KX.socialRow('center')}`; });


  /* ---------- Creative extras: scroll progress, Sport Match quiz, first-day checklist ---------- */
  const bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  const upd = () => { const h = document.documentElement; bar.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, h.scrollHeight - innerHeight))})`; };
  addEventListener('scroll', upd, { passive: true }); upd();

  const fin0 = $('#finder');
  if (page === 'home' && fin0 && KX.batches) {
    const sec = document.createElement('section'); sec.className = 'section match-sec'; sec.id = 'match'; sec.setAttribute('aria-labelledby', 'mt');
    sec.innerHTML = `<div class="container"><div class="section-head"><span class="tagline">Two minutes, three questions.</span><h2 id="mt">Sport Match</h2><p>Tell us about your child and we will suggest the sports and batches most likely to click.</p></div>
    <div class="match card"><div class="match-q"><h3><span>1</span>How old is your child?</h3><div class="match-opts" data-q="age">${[['5–7', 6], ['8–10', 9], ['11–13', 12], ['14–17', 15]].map(a => `<button type="button" class="chip" data-v="${a[1]}" aria-pressed="false">${a[0]} yrs</button>`).join('')}</div></div>
    <div class="match-q"><h3><span>2</span>What lights them up?</h3><div class="match-opts" data-q="vibe">${[['team', 'Playing with a team'], ['solo', 'Going one-on-one'], ['speed', 'Speed and power'], ['water', 'Being in the water']].map(a => `<button type="button" class="chip" data-v="${a[0]}" aria-pressed="false">${a[1]}</button>`).join('')}</div></div>
    <div class="match-q"><h3><span>3</span>Their energy style?</h3><div class="match-opts" data-q="energy">${[['calm', 'Calm and focused'], ['mid', 'A healthy balance'], ['high', 'Always on the move']].map(a => `<button type="button" class="chip" data-v="${a[0]}" aria-pressed="false">${a[1]}</button>`).join('')}</div></div>
    <div class="match-out" id="matchOut" aria-live="polite"><p class="muted">Pick one answer in each row to see your matches.</p></div></div></div>`;
    fin0.parentNode.insertBefore(sec, fin0);
    const W = { vibe: { team: { Football: 3, Basketball: 3, Cricket: 3 }, solo: { Tennis: 3, Badminton: 3 }, speed: { Athletics: 3, 'Strength & Conditioning': 2, Badminton: 1, Football: 1 }, water: { Swimming: 4 } }, energy: { calm: { Cricket: 2, Swimming: 2, Tennis: 1 }, mid: { Tennis: 2, Badminton: 2, Basketball: 1, Swimming: 1 }, high: { Football: 2, Basketball: 2, Athletics: 2, 'Strength & Conditioning': 2 } } };
    const WHY = { Football: 'builds teamwork, stamina and quick decisions', Basketball: 'rewards teamwork, coordination and fast thinking', Cricket: 'grows patience, focus and team spirit', Tennis: 'sharpens focus, footwork and self-reliance', Badminton: 'builds speed, reflexes and agility', Swimming: 'builds full-body strength, confidence and water safety', Athletics: 'develops speed, power and personal bests', 'Strength & Conditioning': 'builds safe strength and injury resistance' };
    const pick = {}, out = $('#matchOut', sec);
    const show = () => {
      if (!(pick.age && pick.vibe && pick.energy)) return;
      const sc = {}; ['vibe', 'energy'].forEach(k => Object.entries(W[k][pick[k]]).forEach(([s, v]) => (sc[s] = (sc[s] || 0) + v)));
      const fit = s => KX.batches.filter(b => b.sport === s && pick.age >= b.age[0] && pick.age <= b.age[1]);
      const top = Object.entries(sc).filter(([s]) => fit(s).length).sort((a, b) => b[1] - a[1]).slice(0, 2);
      out.innerHTML = top.length ? `<div class="grid g2">${top.map(([s], i) => `<div class="card match-res"><span class="pill ${i ? '' : 'ok'}">${i ? 'Also great' : 'Best match'}</span><h3>${s}</h3><p class="muted">${s} ${WHY[s]}.</p><ul class="match-b">${fit(s).slice(0, 2).map(b => `<li><b>${b.name}</b><span>${b.days.join(', ')} · ${KX.fmtTime(b.start)} · ${KX.inr(b.fee)}/mo</span><a class="btn btn-secondary btn-sm" href="contact.html?batch=${b.id}#trial">Free trial</a></li>`).join('')}</ul></div>`).join('')}</div><div class="btn-row" style="margin:var(--s3) 0 0"><a class="btn btn-primary" href="dashboard.html#enroll">Enrol in the dashboard</a><a class="btn btn-secondary" href="batches.html">See all batches</a></div>` : '<p class="muted">No open batch for that age yet. Call us and we will find a fit.</p>';
    };
    sec.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; const g = b.parentElement; $$('.chip', g).forEach(x => x.setAttribute('aria-pressed', x === b)); pick[g.dataset.q] = g.dataset.q === 'age' ? +b.dataset.v : b.dataset.v; show(); });
  }

  const mainEl = $('main');
  if (page === 'batches' && mainEl) {
    const items = ['Water bottle and a light snack', 'Sport shoes (non-marking for indoor courts)', 'Comfortable kit and a spare T-shirt', 'Swimwear, cap and goggles (swimmers)', 'Sunscreen and a hat for outdoor batches', 'Any medical notes shared with the coach'], K = 'kx-checklist', done = store.get(K, []);
    const sec = document.createElement('section'); sec.className = 'section alt'; sec.setAttribute('aria-labelledby', 'ck');
    sec.innerHTML = `<div class="container"><div class="section-head"><span class="tagline">Ready for day one.</span><h2 id="ck">First-day checklist</h2><p>Tick things off as you pack. We remember your progress on this device.</p></div><div class="card checklist"><div class="ck-top"><b id="ckN"></b><i class="ck-bar"><i id="ckB"></i></i></div>${items.map((t, i) => `<label class="ck-row"><input type="checkbox" data-i="${i}" ${done.includes(i) ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div></div>`;
    mainEl.appendChild(sec);
    const sync = () => { const n = $$('input:checked', sec).length; $('#ckN', sec).textContent = n === items.length ? 'All packed. See you on the field!' : `${n} of ${items.length} packed`; $('#ckB', sec).style.width = (n / items.length * 100) + '%'; };
    sec.addEventListener('change', () => { store.set(K, $$('input:checked', sec).map(x => +x.dataset.i)); sync(); }); sync();
  }

  themeIcon(); bindTools(); icons();
})();
});

/* ===== hero ===== */
run("hero",function(){if(['404','about','batches','coaches','contact','home','home2','privacy','services','sports','terms'].indexOf(PAGE)<0)return;
/* ==========================================================================
   KINETIX – hero.js: interactive hero banners (runs after main.js + data.js)
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const KX = window.KX || {}, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const icons = () => KX.icons && KX.icons();

  /* HOME – crossfading slideshow, rotating sport word, mouse parallax */
  const home = $('.hx-home');
  if (home) {
    const slides = $$('.slide', home), dots = $$('.hx-dots button', home), cap = $('.hx-cap', home);
    let i = 0, t;
    const go = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => { d.classList.remove('on'); if (k === i) { void d.offsetWidth; d.classList.add('on'); } });
      cap.textContent = slides[i].dataset.cap;
    };
    const play = () => { clearInterval(t); if (!reduce) t = setInterval(() => go(i + 1), 5500); };
    dots.forEach((d, k) => { d.addEventListener('click', () => { go(k); play(); }); });
    home.addEventListener('mouseenter', () => { clearInterval(t); home.classList.add('paused'); });
    home.addEventListener('mouseleave', () => { home.classList.remove('paused'); go(i); play(); });
    go(0); play();
    const rot = $('.rot', home), words = (rot.dataset.words || '').split(',');
    let w = 0;
    if (words.length > 1 && !reduce) setInterval(() => { rot.classList.add('out'); setTimeout(() => { w = (w + 1) % words.length; rot.textContent = words[w]; rot.classList.remove('out'); }, 350); }, 2400);
    if (!reduce) home.addEventListener('mousemove', e => {
      const r = home.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $$('[data-depth]', home).forEach(el => { el.style.transform = `translate(${(x * el.dataset.depth).toFixed(1)}px,${(y * el.dataset.depth).toFixed(1)}px)`; });
    });
  }

  /* HOME 2 – cursor spotlight */
  const prem = $('.hx-prem');
  if (prem && !reduce) prem.addEventListener('mousemove', e => { const r = prem.getBoundingClientRect(); prem.style.setProperty('--mx', (e.clientX - r.left) + 'px'); prem.style.setProperty('--my', (e.clientY - r.top) + 'px'); });

  /* SPORTS – pick a sport, the banner changes (auto-cycles until you interact) */
  const sp = $('.hx-sports');
  if (sp && KX.sports) {
    const strip = $('.sp-strip', sp), bgs = $('.bgs', sp), tag = $('#spTag'), desc = $('#spDesc'), age = $('#spAge');
    const mAges = $('#spAges'), mBat = $('#spBatches'), mCoach = $('#spCoach'), mFee = $('#spFee'), bar = $('#spBar'), cnt = $('#spCount');
    const N = KX.sports.length, DELAY = 4500;
    strip.innerHTML = KX.sports.map((s, k) => `<button class="sp-chip" type="button" data-k="${k}" aria-pressed="false">${KX.ic(s.icon)}<span>${s.name.replace('Strength & Conditioning', 'Strength')}</span></button>`).join('');
    bgs.innerHTML = KX.sports.map(() => '<img alt="">').join('');
    const imgs = $$('img', bgs), chips = $$('.sp-chip', strip);
    const load = k => { const s = KX.sports[k], im = imgs[k]; const src = s.bg || s.img; if (src && !im.getAttribute('src')) im.src = KX.img(src, 1400); };
    let cur = 0, auto, stopped = false;
    const facts = s => {
      const b = KX.batches.filter(x => x.sport === s.name), fees = b.map(x => x.fee), coaches = [...new Set(b.map(x => x.coach))];
      return { n: b.length, fee: fees.length ? Math.min(...fees) : null, coach: coaches.join(' & ') || 'Certified coaches' };
    };
    const restartBar = () => { if (!bar) return; bar.classList.remove('run'); void bar.offsetWidth; if (!stopped && !reduce) bar.classList.add('run'); };
    const show = k => {
      cur = (k + N) % N; const s = KX.sports[cur], f = facts(s);
      load(cur); load((cur + 1) % N);
      imgs.forEach((x, n) => x.classList.toggle('on', n === cur));
      chips.forEach((c, n) => { c.classList.toggle('on', n === cur); c.setAttribute('aria-pressed', n === cur); });
      tag.textContent = s.tag; desc.textContent = s.desc; age.textContent = s.name;
      if (mAges) { mAges.textContent = s.ages; mBat.textContent = f.n; mCoach.textContent = f.coach; mFee.textContent = f.fee ? KX.inr(f.fee) : 'On request'; }
      if (cnt) cnt.textContent = (cur + 1) + ' / ' + N;
      const chip = chips[cur]; if (chip && chip.scrollIntoView && stopped) chip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      restartBar();
    };
    const stop = () => { stopped = true; clearInterval(auto); if (bar) bar.classList.remove('run'); sp.classList.add('is-stopped'); };
    chips.forEach((c, k) => { c.addEventListener('click', () => { stop(); show(k); }); c.addEventListener('mouseenter', () => { stop(); show(k); }); c.addEventListener('focus', () => { stop(); show(k); }); });
    const pv = $('#spPrev'), nx = $('#spNext');
    if (pv) pv.addEventListener('click', () => { stop(); show(cur - 1); });
    if (nx) nx.addEventListener('click', () => { stop(); show(cur + 1); });
    show(0); icons();
    if (!reduce) auto = setInterval(() => { if (!stopped) show(cur + 1); }, DELAY);
  }

  /* COACHES – spotlight on one coach at a time (auto-cycles until you interact) */
  const co = $('.hx-coach');
  if (co && KX.coaches) {
    const avs = $('.avs', co), q = $('#cQ'), n = $('#cN'), r = $('#cR'), im = $('#cImg'), sp = $('#cSport'), ex = $('#cExp'), ce = $('#cCert'), ct = $('#cCount');
    const N = KX.coaches.length;
    avs.innerHTML = KX.coaches.map((c, k) => `<button class="av" type="button" data-k="${k}" aria-label="${c.name}" aria-pressed="false"><img src="${KX.img(c.img, 160)}" alt="" width="54" height="54"></button>`).join('');
    const btns = $$('.av', avs);
    let cur = 0, auto, stopped = false;
    const show = k => {
      cur = (k + N) % N; const c = KX.coaches[cur];
      btns.forEach((b, i) => { b.classList.toggle('on', i === cur); b.setAttribute('aria-pressed', i === cur); });
      q.style.opacity = 0; setTimeout(() => { q.textContent = '“' + c.quote + '”'; q.style.opacity = 1; }, 150);
      n.textContent = c.name; r.textContent = c.role;
      if (ex) ex.textContent = c.exp + '+ years coaching';
      if (ce) ce.textContent = c.cert;
      if (sp) sp.textContent = c.sport;
      if (ct) ct.textContent = (cur + 1) + ' / ' + N;
      if (im) { im.classList.add('swap'); im.alt = 'Portrait of ' + c.name + ', ' + c.role; im.onload = () => im.classList.remove('swap'); im.src = KX.img(c.img, 900); }
    };
    const stop = () => { stopped = true; clearInterval(auto); };
    btns.forEach((b, k) => { b.addEventListener('click', () => { stop(); show(k); }); b.addEventListener('mouseenter', () => { stop(); show(k); }); b.addEventListener('focus', () => { stop(); show(k); }); });
    show(0);
    if (!reduce) auto = setInterval(() => { if (!stopped) show(cur + 1); }, 5500);
  }

  /* BATCHES – live board of today's sessions */
  const td = $('#today');
  if (td && KX.batches) {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const draw = () => {
      const d = new Date(), day = DAYS[d.getDay()], now = d.getHours() * 60 + d.getMinutes();
      const rows = KX.batches.filter(b => b.days.includes(day)).sort((a, b) => a.start.localeCompare(b.start));
      const nextIdx = rows.findIndex(b => mins(b.start) > now);
      const list = rows.map((b, k) => {
        const live = mins(b.start) <= now && now < mins(b.end), done = mins(b.end) <= now, next = !live && k === nextIdx;
        return `<div class="t-row ${live ? 'now' : done ? 'done' : next ? 'next' : ''}"><span class="tm">${KX.fmtTime(b.start)}</span><span>${b.name}<small>${b.sport} · ${b.coach}</small></span><span class="tag">${live ? 'Live now' : done ? 'Done' : next ? 'Up next' : b.left + ' seats'}</span></div>`;
      }).join('');
      td.innerHTML = `<div class="head"><b>Today · ${day}</b><span class="live">${d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}</span></div><div class="t-list">${list || '<p class="empty-t">No sessions today. See the full timetable below.</p>'}</div>`;
    };
    draw(); setInterval(draw, 30000);
  }

  /* BATCHES hero – live totals + "jump to a day" pills that drive the filter below */
  const bh = $('.hx-batch');
  if (bh && KX.batches) {
    $('#bhBatches').textContent = KX.batches.length;
    $('#bhSports').textContent = new Set(KX.batches.map(b => b.sport)).size;
    $('#bhSeats').textContent = KX.batches.reduce((a, b) => a + b.left, 0);
    const wrap = $('#dayPills'), ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], tdy = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
    wrap.innerHTML = ['All'].concat(ORDER).map(d => `<button type="button" class="day-pill${d === tdy ? ' is-today' : ''}" data-d="${d}" aria-pressed="${d === 'All'}">${d}</button>`).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('.day-pill'); if (!b) return;
      $$('.day-pill', wrap).forEach(x => x.setAttribute('aria-pressed', x === b));
      const sel = $('#fDay'); if (sel) { sel.value = b.dataset.d === 'All' ? '' : b.dataset.d; sel.dispatchEvent(new Event('change')); }
      const t = $('#bt'); if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    const sel = $('#fDay'); if (sel) sel.addEventListener('change', () => $$('.day-pill', wrap).forEach(x => x.setAttribute('aria-pressed', x.dataset.d === (sel.value || 'All'))));
  }

  /* CONTACT – open / closed pill */
  const op = $('#openPill');
  if (op) {
    const d = new Date(), day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    const open = day === 0 ? h >= 7 && h < 13 : h >= 6 && h < 21;
    $('.od', op).classList.toggle('closed', !open);
    $('span:last-child', op).textContent = open ? 'We are open now · closes ' + (day === 0 ? '1 PM' : '9 PM') : 'Closed now · opens ' + (day === 6 ? 'Sunday 7 AM' : '6 AM');
  }
})();
});

/* ===== extras ===== */
run("extras",function(){if(['about','batches','coaches','home','home2','sports'].indexOf(PAGE)<0)return;
/* ==========================================================================
   KINETIX – extras.js : behaviour for the new index / home2 sections
   Loaded after main.js + hero.js (all deferred).
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* 1. Image safety net – if any remote photo fails, show a branded panel instead of a broken icon */
  const SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F2937"/><stop offset="1" stop-color="#7F1D3A"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="320" text-anchor="middle" font-family="Arial,sans-serif" font-size="54" font-weight="700" letter-spacing="8" fill="rgba(255,255,255,.8)">KINETIX</text></svg>');
  const PLAIN = SVG.replace(/%3Ctext.*%3C%2Ftext%3E/, '');   // no wordmark for full-bleed hero slides
  const heal = img => {
    if (img.dataset.alt && !img.dataset.triedAlt) { img.dataset.triedAlt = '1'; img.removeAttribute('srcset'); img.src = img.dataset.alt; return; }   // 1st: try the backup photo
    if (img.dataset.ill && !img.dataset.triedIll) { img.dataset.triedIll = '1'; img.removeAttribute('srcset'); img.src = img.dataset.ill; return; }   // 2nd: bundled illustration
    if (img.dataset.fb) return; img.dataset.fb = '1'; img.classList.add('img-fallback'); img.removeAttribute('srcset');
    img.src = img.closest('.hx-slides, .bgs, .bgimg, .hx') || img.classList.contains('bgimg') ? PLAIN : SVG;   // 2nd: branded panel
  };
  document.addEventListener('error', e => { if (e.target && e.target.tagName === 'IMG') heal(e.target); }, true);
  $$('img').forEach(i => { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) heal(i); });

  /* 2. Parent playbook – expand / collapse tips */
  $$('.pb-toggle').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', open);
    $('#' + b.getAttribute('aria-controls')).hidden = !open;
    b.firstChild.textContent = open ? 'Show less' : 'Read the tip';
  }));

  /* 3. Home 2 – progress report tabs */
  const tabs = $('.rep-tabs');
  if (tabs) {
    const btns = $$('.chip', tabs), panels = $$('.rep-panel');
    const pick = k => {
      btns.forEach((b, i) => b.setAttribute('aria-pressed', i === k));
      panels.forEach((p, i) => { p.hidden = i !== k; });
    };
    btns.forEach((b, k) => b.addEventListener('click', () => pick(k)));
    pick(0);
  }

  /* 4. Home 2 – elite hero: rotating word, spotlight follows cursor, floating cards drift */
  const el = $('.hx-elite');
  if (el) {
    const rot = $('.rot', el), words = (rot.dataset.words || '').split(',');
    let w = 0;
    if (words.length > 1 && !reduce) setInterval(() => {
      rot.classList.add('out');
      setTimeout(() => { w = (w + 1) % words.length; rot.textContent = words[w]; rot.classList.remove('out'); }, 350);
    }, 2600);
    if (!reduce) el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      $$('[data-depth]', el).forEach(c => { c.style.transform = `translate(${(x * c.dataset.depth).toFixed(1)}px,${(y * c.dataset.depth).toFixed(1)}px)`; });
    });
  }

  /* 5. Index – "open now" pill in the Visit section */
  const vp = $('#visitPill');
  if (vp) {
    const d = new Date(), day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    const open = day === 0 ? h >= 7 && h < 13 : h >= 6 && h < 21;
    $('.od', vp).classList.toggle('closed', !open);
    $('span:last-child', vp).textContent = open ? 'Open now · closes ' + (day === 0 ? '1 PM' : '9 PM') : 'Closed now · opens ' + (day === 6 ? 'Sunday 7 AM' : '6 AM');
  }

  /* 6. Sports – skills matrix: turn data-v="1-5" into accessible dot ratings */
  $$('.skill-matrix td[data-v]').forEach(td => {
    const v = +td.dataset.v; td.setAttribute('aria-label', v + ' out of 5');
    td.innerHTML = '<span class="dots" aria-hidden="true">' + [1, 2, 3, 4, 5].map(n => '<i' + (n <= v ? ' class="on"' : '') + '></i>').join('') + '</span>';
  });

  /* 7. Batches – weekly grid, "filling up fast" cards, time-of-day slots (all driven by KX.batches) */
  const KB = window.KX && window.KX.batches;
  if (KB) {
    const ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], tdy = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
    const fmt = KX.fmtTime, sportOf = n => KX.sports.find(s => s.name === n) || {}, icon = n => KX.ic ? KX.ic(sportOf(n).icon || 'trophy') : '';
    const refreshIcons = () => KX.icons && KX.icons();

    const wk = $('#weekGrid');
    if (wk) {
      wk.innerHTML = ORDER.map(d => {
        const rows = KB.filter(b => b.days.includes(d)).sort((a, b) => a.start.localeCompare(b.start));
        const slots = rows.map(b => `<div class="wk-slot k-${sportOf(b.sport).cat || 'team'}"><b>${b.name}</b><span>${fmt(b.start)} – ${fmt(b.end)}</span><small>${b.coach.split(' ')[0]} · ${b.level}</small></div>`).join('');
        return `<div class="wk-day${d === tdy ? ' is-today' : ''}"><h3>${d}${d === tdy ? '<em>Today</em>' : ''}</h3><p class="wk-n">${rows.length} session${rows.length === 1 ? '' : 's'}</p>${slots || '<p class="wk-none">Rest day</p>'}</div>`;
      }).join('');
    }

    const fg = $('#fillGrid');
    if (fg) {
      const low = KB.filter(b => b.left <= 3).sort((a, b) => a.left - b.left);
      fg.innerHTML = low.map(b => {
        const s = sportOf(b.sport), pct = Math.round((b.cap - b.left) / b.cap * 100);
        return `<article class="pcard"><div class="pc-img"><img src="${KX.img(b.img || s.img, 700)}" alt="${b.name} batch in session" loading="lazy"><span class="pc-badge hot">${b.left} seat${b.left === 1 ? '' : 's'} left</span></div><div class="pc-body"><h3>${b.name}</h3><p class="muted fill-meta">${b.days.join(', ')} · ${fmt(b.start)} – ${fmt(b.end)}<br>Ages ${b.age[0]}–${b.age[1]} · ${b.coach}</p><div class="seatbar" role="img" aria-label="${pct}% of seats taken"><i style="width:${pct}%"></i></div><p class="seat-note">${b.cap - b.left} of ${b.cap} seats taken · ${KX.inr(b.fee)}/mo</p><a class="btn btn-primary btn-sm" href="dashboard.html#enroll">Reserve a seat</a></div></article>`;
      }).join('') || '<p class="muted center">Every batch has plenty of room right now.</p>';
    }

    const sg = $('#slotGrid');
    if (sg) {
      const m = t => { const [h, mm] = t.split(':').map(Number); return h * 60 + mm; };
      const defs = [
        { t: 'Early bird', r: 'Before 9 AM', img: 28120909, alt: 'Child running in the early morning light', f: b => m(b.start) < 540, note: 'Cool mornings, empty lanes and a fresh start before school.' },
        { t: 'After school', r: '4 PM – 6 PM', img: 8613305, alt: 'Active kids doing bending exercises', f: b => m(b.start) >= 900 && m(b.start) < 1080 && b.start >= '16:00', note: 'The busiest slot. Easy to reach straight from the school gate.' },
        { t: 'Evening', r: 'After 6 PM', img: 33933259, alt: 'Teenagers playing a street basketball game in the evening', f: b => m(b.start) >= 1080, note: 'Floodlit sessions for older athletes with a longer school day.' }
      ];
      sg.innerHTML = defs.map(d => {
        const rows = KB.filter(d.f), sports = [...new Set(rows.map(b => b.sport))];
        return `<article class="pcard"><div class="pc-img"><img src="https://images.pexels.com/photos/${d.img}/pexels-photo-${d.img}.jpeg?auto=compress&cs=tinysrgb&w=800" alt="${d.alt}" loading="lazy"><span class="pc-badge">${d.r}</span></div><div class="pc-body"><h3>${d.t}</h3><p class="muted">${d.note}</p><p class="slot-count"><b>${rows.length}</b> batches · <b>${sports.length}</b> sports</p><div class="mini-tags">${sports.map(s => `<span>${s}</span>`).join('')}</div></div></article>`;
      }).join('');
    }
    refreshIcons();
  }
})();
});

/* ===== home-blocks ===== */
run("home-blocks",function(){if(['home'].indexOf(PAGE)<0)return;
/* KINETIX – home-plus.js : bag checklist, fee guide and today board for the home page */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = t => String(t).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const icons = () => window.lucide && window.lucide.createIcons && window.lucide.createIcons();

  /* 1. Kit checklist ------------------------------------------------------- */
  const KIT = {
    Football: { items: ['Football boots or turf shoes', 'Shin guards', 'Club or plain sports jersey', 'Shorts and long socks', 'Water bottle (750 ml)', 'Small towel', 'Spare T-shirt'], tip: 'Check studs for wear every month. Children outgrow boots quickly, so a snug fit beats a roomy one.' },
    Cricket: { items: ['Cricket shoes with a firm grip', 'Whites or coloured kit as per batch', 'Cap or helmet for batters', 'Thigh pad, gloves and abdominal guard', 'Bat (the academy supplies a kit bat for trials)', 'Water bottle (750 ml)', 'Sunscreen'], tip: 'Ask the coach before buying a bat. Size and weight depend on height, not age.' },
    Tennis: { items: ['Non-marking tennis shoes', 'Junior racket sized to height', 'Cap or visor', 'Water bottle (750 ml)', 'Wristband and small towel', 'Sunscreen', 'Spare shirt'], tip: 'A racket that is too long or heavy builds poor technique. We can help you size one.' },
    Swimming: { items: ['Swimsuit (no loose shorts)', 'Swim cap', 'Goggles that fit without leaking', 'Towel and change of clothes', 'Flip-flops for the pool deck', 'Water bottle', 'Plastic bag for wet kit'], tip: 'Shower before and after. Rinse the swimsuit and goggles with fresh water to protect them from chlorine.' },
    Badminton: { items: ['Indoor court shoes', 'Junior racket', 'Light, breathable T-shirt', 'Wristband and towel', 'Water bottle (750 ml)', 'Spare shirt'], tip: 'Never wear running shoes on a badminton court. Side-to-side movement needs flatter, grippier soles.' },
    Basketball: { items: ['Basketball shoes with ankle support', 'Breathable jersey and shorts', 'Water bottle (750 ml)', 'Towel', 'Ankle brace if the coach advises it', 'Spare shirt'], tip: 'Replace shoes once the sole smooths out. Worn grip is a common cause of ankle rolls.' },
    Athletics: { items: ['Cushioned running shoes', 'Light shorts and vest', 'Cap and sunscreen', 'Water bottle (750 ml)', 'Small towel', 'Spare socks'], tip: 'Spikes are only needed for competition. Train in good running shoes until the coach says otherwise.' }
  };
  const kit = $('#kxKit');
  if (kit) {
    const names = Object.keys(KIT), tabs = $('.bag-tabs', kit), body = $('.bag-body', kit);
    let cur = names[0], saved = store.get('kx-kit');
    const count = n => KIT[n].items.filter((_, i) => (saved[n] || {})[i]).length;
    const render = () => {
      tabs.innerHTML = names.map(n => `<button type="button" role="tab" aria-selected="${n === cur}" data-n="${n}">${n}<small>${count(n)}/${KIT[n].items.length}</small></button>`).join('');
      const k = KIT[cur], c = count(cur), pct = Math.round(c / k.items.length * 100);
      body.innerHTML = `<h3>${cur} bag checklist</h3><p class="muted" style="margin:0">${c === k.items.length ? '<span class="bag-done">Bag packed. See you on the field.</span>' : 'Tick items as you pack. Your list is saved on this device.'}</p><div class="bag-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Packing progress"><i style="width:${pct}%"></i></div><div class="bag-list">${k.items.map((t, i) => `<label><input type="checkbox" data-i="${i}" ${(saved[cur] || {})[i] ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div><p class="bag-tip"><b>Coach tip:</b> ${esc(k.tip)}</p>`;
    };
    kit.addEventListener('click', e => { const b = e.target.closest('[data-n]'); if (b) { cur = b.dataset.n; render(); const t = $('[aria-selected="true"]', tabs); t && t.focus(); } });
    kit.addEventListener('change', e => { const i = e.target.dataset.i; if (i == null) return; (saved[cur] = saved[cur] || {})[i] = e.target.checked; store.set('kx-kit', saved); const f = document.activeElement && document.activeElement.dataset.i; render(); const el = $(`input[data-i="${f}"]`, body); el && el.focus(); });
    tabs.addEventListener('keydown', e => { if (!/Arrow(Up|Down|Left|Right)/.test(e.key)) return; e.preventDefault(); const d = /Down|Right/.test(e.key) ? 1 : -1; cur = names[(names.indexOf(cur) + d + names.length) % names.length]; render(); $('[aria-selected="true"]', tabs).focus(); });
    render();
  }

  /* 2. Fee guide – built from the live batch data, so it never drifts ---------- */
  const fg = $('#kxFees');
  if (fg && window.KX && KX.batches) {
    const rows = KX.sports.map(s => {
      const b = KX.batches.filter(x => x.sport === s.name); if (!b.length) return '';
      const fees = b.map(x => x.fee), lo = Math.min(...fees), hi = Math.max(...fees);
      const ages = [Math.min(...b.map(x => x.age[0])), Math.max(...b.map(x => x.age[1]))];
      const seats = b.reduce((a, x) => a + x.left, 0);
      return `<tr><td>${esc(s.name)}</td><td>${ages[0]}–${ages[1]} yrs</td><td>${b.length}</td><td><span class="fee">${lo === hi ? KX.inr(lo) : KX.inr(lo) + ' – ' + KX.inr(hi)}</span> / month</td><td>${seats} seat${seats === 1 ? '' : 's'} open</td></tr>`;
    }).join('');
    fg.innerHTML = rows;
  }

  /* 3. Today at Kinetix – live board from the batch data ------------------------- */
  const tb = $('#kxToday');
  if (tb && window.KX && KX.batches) {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const dur = m => m >= 60 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') : m + ' min';
    const draw = () => {
      const d = new Date(), now = d.getHours() * 60 + d.getMinutes(), key = DAYS[d.getDay()];
      const rows = KX.batches.filter(b => b.days.includes(key)).sort((a, b) => mins(a.start) - mins(b.start));
      const live = rows.filter(b => now >= mins(b.start) && now < mins(b.end)).length;
      const nextIdx = rows.findIndex(b => mins(b.start) > now);
      const sub = $('#kxTodaySub');
      if (!rows.length) {
        if (sub) sub.textContent = FULL[d.getDay()] + ' is a rest day for batches.';
        let n = 1; while (n < 7 && !KX.batches.some(b => b.days.includes(DAYS[(d.getDay() + n) % 7]))) n++;
        const nd = DAYS[(d.getDay() + n) % 7];
        tb.innerHTML = `<div class="tb-empty"><b>No batches today</b>Training resumes ${FULL[(d.getDay() + n) % 7]}. Walk-ins are still welcome during opening hours.</div>`;
        return;
      }
      if (sub) sub.textContent = `${FULL[d.getDay()]}: ${rows.length} session${rows.length === 1 ? '' : 's'}` + (live ? `, ${live} in progress now.` : '.');
      tb.innerHTML = rows.map((b, i) => {
        const s = mins(b.start), e = mins(b.end), isLive = now >= s && now < e, isDone = now >= e;
        const cls = isLive ? 'is-live' : isDone ? 'is-done' : i === nextIdx ? 'is-next' : '';
        const state = isLive ? '<span class="pill ok">In session now</span>' : isDone ? '<span class="pill">Finished</span>' : `<span class="pill ${i === nextIdx ? 'warn' : ''}">${i === nextIdx ? 'Next up · ' : ''}Starts in ${dur(s - now)}</span>`;
        const seats = isDone ? '' : `<span class="${b.left <= 3 ? 'pill bad' : 'muted'}" style="${b.left <= 3 ? '' : 'font-size:.9rem'}">${b.left === 0 ? 'Full' : b.left + ' seat' + (b.left === 1 ? '' : 's') + ' left'}</span>`;
        return `<article class="tb-row ${cls}"><div class="tb-time">${KX.fmtTime(b.start)}<small>${dur(e - s)} session</small></div><div class="tb-main"><h3>${esc(b.name)}</h3><div class="tb-meta"><span>${esc(b.sport)}</span><span>${esc(b.level)}</span><span>Ages ${b.age[0]}–${b.age[1]}</span><span>Coach ${esc(b.coach.split(' ')[0])}</span></div></div><div class="tb-state">${state}${seats}</div></article>`;
      }).join('');
    };
    draw(); setInterval(draw, 60000);
  }
})();
});

/* ===== dashboard ===== */
run("dashboard",function(){if(['dashboard'].indexOf(PAGE)<0)return;
/* ==========================================================================
   KINETIX – Parent dashboard (demo data kept in localStorage)
   TODO: replace the store with API calls to your backend / payment gateway
   ========================================================================== */
(function () {
  'use strict';
  const KX = window.KX, $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  /* Standalone page: no login needed. Demo family data lives in this browser only. */
  const sess = Object.assign({ name: 'Priya Sharma', email: 'parent@kinetix.example', phone: '+91 98765 11122' }, KX.store.get('kx-dash-profile', {}));
  const KEY = 'kx-parent-dashboard', DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], WK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const parse = s => { const [a, b, c] = s.split('-').map(Number); return new Date(a, b - 1, c); };
  const fd = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), ml = d => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const ic = KX.ic, inr = KX.inr, ft = KX.fmtTime, first = sess.name.split(' ')[0];

  /* ---------- state ---------- */
  function seed() {
    const s = { children: [], enr: [], pay: [], fb: [], msg: [{ id: 1, t: 'Welcome to Kinetix!', b: 'Add your child, choose a batch and book a free trial. We are here to help.', d: ymd(today), read: false }], prefs: { email: true, sms: true, whatsapp: false, reminders: true }, nid: 100 };
    if (sess.email !== 'parent@kinetix.example') return s;
    const prev = ml(new Date(today.getFullYear(), today.getMonth() - 1, 1)), cur = ml(today), due = ymd(new Date(today.getFullYear(), today.getMonth() + 1, 0)), on = ymd(addDays(today, -60));
    s.children = [{ id: 1, name: 'Aarav', age: 11 }, { id: 2, name: 'Meera', age: 8 }];
    s.enr = [{ id: 1, child: 1, batch: 'b2', on }, { id: 2, child: 1, batch: 'b10', on }, { id: 3, child: 2, batch: 'b7', on }];
    s.enr.forEach((e, i) => { const f = B(e.batch).fee; s.pay.push({ id: i * 2 + 1, enr: e.id, month: prev, amount: f, status: 'paid', paidOn: ymd(addDays(today, -26)), method: 'UPI', txn: 'KX' + (48100 + i) }, { id: i * 2 + 2, enr: e.id, month: cur, amount: f, status: 'pending', due }); });
    const sk = (a, b, c, d) => ({ Technique: a, Fitness: b, Teamwork: c, Attitude: d });
    s.fb = [{ id: 1, enr: 1, d: ymd(addDays(today, -6)), r: 4, sk: sk(4, 3, 5, 5), n: 'Aarav’s first touch has improved a lot. Next focus: scanning the field before receiving the ball.', coach: 'Oliver Bennett' },
      { id: 2, enr: 2, d: ymd(addDays(today, -9)), r: 5, sk: sk(5, 4, 4, 5), n: 'Dropped 1.2 seconds from his 50 m freestyle. Turns are sharper and breathing is calmer.', coach: 'Charlotte Hughes' },
      { id: 3, enr: 3, d: ymd(addDays(today, -4)), r: 4, sk: sk(4, 4, 3, 5), n: 'Meera’s forehand is more consistent. Wall rallies at home will help her timing.', coach: 'Emily Carter' },
      { id: 4, enr: 1, d: ymd(addDays(today, -20)), r: 3, sk: sk(3, 3, 4, 4), n: 'Good effort in match play. Needs to communicate more with defenders.', coach: 'Oliver Bennett' }];
    s.msg = [{ id: 2, t: 'Fee reminder', b: `${cur} fees are due by ${fd(parse(due))}. Pay from Fees & payments.`, d: ymd(today), read: false }, { id: 3, t: 'Venue change', b: 'Tennis Foundations moves to Court 3 this Thursday for resurfacing.', d: ymd(addDays(today, -1)), read: false }, { id: 4, t: 'New coach feedback', b: 'Emily Carter posted feedback for Meera.', d: ymd(addDays(today, -4)), read: true }, { id: 5, t: 'Annual day registration', b: 'Register your child for the Kinetix Annual Day by 20 Nov.', d: ymd(addDays(today, -8)), read: true }, s.msg[0]];
    return s;
  }
  const B = id => KX.batches.find(b => b.id === id);
  let st = KX.store.get(KEY, null) || seed(); const save = () => KX.store.set(KEY, st);
  const C = id => st.children.find(c => c.id === id), E = id => st.enr.find(e => e.id === id), nid = () => ++st.nid;
  const ui = { sch: 'all', att: 'all', fb: 'all', enrChild: null, enrSport: 'all' };

  /* ---------- helpers ---------- */
  const sessionsOf = (e, from, to) => { const b = B(e.batch), out = []; for (let d = new Date(from); d <= to; d = addDays(d, 1)) if (b.days.includes(DAYS[d.getDay()])) out.push(new Date(d)); return out; };
  const status = (e, d) => { const h = (e.child * 7 + e.id * 13 + d.getDate() * 3 + d.getMonth()) % 10; return h < 7 ? 'Present' : h < 9 ? 'Late' : 'Absent'; };
  const attOf = e => sessionsOf(e, new Date(Math.max(parse(e.on), addDays(today, -27))), addDays(today, -1)).map(d => ({ d, e, s: status(e, d) }));
  const rate = l => l.length ? Math.round(l.filter(x => x.s !== 'Absent').length / l.length * 100) : null;
  const overlap = (a, b) => a.days.some(d => b.days.includes(d)) && a.start < b.end && b.start < a.end;
  const left = b => Math.max(0, b.left - st.enr.filter(e => e.batch === b.id && e.new).length);
  const pill = (t, c = '') => `<span class="pill ${c}">${t}</span>`, pc = s => s === 'Present' ? 'ok' : s === 'Late' ? 'warn' : 'bad';
  const stars = n => `<span class="stars" role="img" aria-label="${n} out of 5">${[1, 2, 3, 4, 5].map(i => `<i data-lucide="star" class="icon ${i > n ? 'off' : ''}"></i>`).join('')}</span>`;
  const metric = (i, v, l) => `<div class="metric"><span class="ic-box">${ic(i)}</span><div><b>${v}</b><span>${l}</span></div></div>`;
  const head = (t, p) => `<header class="panel-head"><h2>${t}</h2><p>${p}</p></header>`;
  const empty = (i, t, p, a = '') => `<div class="empty"><div class="ic-box">${ic(i)}</div><h3>${t}</h3><p>${p}</p>${a}</div>`;
  const childSel = (key, all) => `<div class="field"><label for="s-${key}">Child</label><select class="input" id="s-${key}" data-ui="${key}">${all ? `<option value="all">All children</option>` : ''}${st.children.map(c => `<option value="${c.id}" ${String(ui[key]) === String(c.id) ? 'selected' : ''}>${c.name} (${c.age})</option>`).join('')}</select></div>`;
  const needKids = a => empty('users', 'Add your first child', 'Add a child profile to enrol in batches and see schedules.', `<a class="btn btn-primary" href="#children">Add a child</a>`);
  const unread = () => st.msg.filter(m => !m.read).length, due = () => st.pay.filter(p => p.status === 'pending');
  const enrLabel = e => `${C(e.child).name} · ${B(e.batch).name}`;

  /* ---------- panels ---------- */
  const P = {};
  const TITLES = { overview: 'Overview', children: 'My children', enroll: 'Enrol in batch', schedule: 'Schedule', attendance: 'Attendance', feedback: 'Coach feedback', fees: 'Fees & payments', messages: 'Messages', settings: 'Settings' };
  const nextSessions = () => {
    const now = new Date(), out = [];
    st.enr.forEach(e => sessionsOf(e, today, addDays(today, 9)).forEach(d => { const bt = B(e.batch), [h, m] = bt.start.split(':').map(Number), [eh, em] = bt.end.split(':').map(Number), s0 = new Date(d), e0 = new Date(d); s0.setHours(h, m); e0.setHours(eh, em); if (e0 > now) out.push({ d, e, s0, e0 }); }));
    (st.mk || []).forEach(k => { const d = parse(k.date), s0 = new Date(d), e0 = new Date(d); s0.setHours(15, 0); e0.setHours(16, 0); if (e0 > now) out.push({ d, e: E(k.enr), s0, e0, mk: true }); });
    return out.filter(x => x.e).sort((a, b) => a.s0 - b.s0);
  };
  const countdown = x => { const now = new Date(); if (x.s0 <= now) return 'In progress now'; const m = Math.round((x.s0 - now) / 60000); if (m < 60) return `Starts in ${m} min`; if (m < 1440) return `Starts in ${Math.floor(m / 60)} h ${m % 60} min`; const dd = Math.round((parse(ymd(x.d)) - today) / 864e5); return dd === 1 ? 'Tomorrow' : `In ${dd} days`; };
  const skillAvg = c => { const f = st.fb.filter(x => E(x.enr) && E(x.enr).child === c.id); if (!f.length) return null; const k = Object.keys(f[0].sk); return k.map(n => [n, f.reduce((a, x) => a + x.sk[n], 0) / f.length]); };
  const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; };
  P.overview = () => {
    const att = st.enr.flatMap(attOf), r = rate(att), owe = due().reduce((a, p) => a + p.amount, 0), ns = nextSessions(), nx = ns[0], up = ns.slice(0, 5);
    const wk = [0, 1, 2, 3].map(w => rate(att.filter(x => x.d >= addDays(today, -28 + 7 * w) && x.d < addDays(today, -21 + 7 * w))));
    const hero = nx ? `<div class="hero-card"><div><span class="eyebrow">${ic('zap')} Next session${nx.mk ? ' · Make-up' : ''}</span><h2>${C(nx.e.child).name} · ${nx.mk ? 'Make-up clinic' : B(nx.e.batch).name}</h2><p>${nx.d.getTime() === today.getTime() ? 'Today' : DAYS[nx.d.getDay()] + ', ' + fd(nx.d)} · ${nx.mk ? '3:00 PM – 4:00 PM' : ft(B(nx.e.batch).start) + ' – ' + ft(B(nx.e.batch).end)} · Coach ${B(nx.e.batch).coach}</p></div><div class="hero-side"><b>${countdown(nx)}</b><a class="btn btn-primary btn-sm" href="#schedule">Full schedule</a></div></div>` : `<div class="hero-card"><div><span class="eyebrow">${ic('zap')} ${greet()}</span><h2>Let’s get your first batch booked</h2><p>Add a child, pick a batch and the first session lands right here.</p></div><div class="hero-side"><a class="btn btn-primary btn-sm" href="#children">Add a child</a></div></div>`;
    const alerts = [owe ? `<a class="alert warn" href="#fees">${ic('wallet')}<span><b>${inr(owe)} in fees due</b> · ${due().length} pending. Pay securely in one tap.</span>${ic('chevron-right')}</a>` : '', r !== null && r < 75 ? `<a class="alert bad" href="#attendance">${ic('user-x')}<span><b>Attendance is ${r}%</b> · Missed sessions can be made up in a free clinic.</span>${ic('chevron-right')}</a>` : '', unread() ? `<a class="alert" href="#messages">${ic('bell')}<span><b>${unread()} unread message${unread() > 1 ? 's' : ''}</b> from the academy.</span>${ic('chevron-right')}</a>` : ''].join('');
    const kids = st.children.length ? `<div class="box" style="margin-bottom:var(--s3)"><h3>Athlete progress</h3><div class="kid-grid">${st.children.map(c => { const sk = skillAvg(c), es = st.enr.filter(e => e.child === c.id), ar = rate(es.flatMap(attOf)); return `<div class="kid"><div class="kid-top"><span class="avatar">${c.name[0].toUpperCase()}</span><div><b>${c.name}</b><small>Age ${c.age} · ${es.length} batch${es.length === 1 ? '' : 'es'}</small></div>${ar === null ? '' : pill(ar + '% att.', ar >= 85 ? 'ok' : ar >= 70 ? 'warn' : 'bad')}</div>${sk ? sk.map(([k, v]) => `<div class="meter"><span>${k}</span><i style="--w:${v * 20}%" role="img" aria-label="${k} ${v.toFixed(1)} of 5"></i></div>`).join('') : '<p class="muted" style="margin:var(--s2) 0 0">Skill ratings appear after the first coach review.</p>'}</div>`; }).join('')}</div></div>` : '';
    return head('Overview', `${greet()}, ${first}. Here is how your athletes are doing.`) + hero + (alerts ? `<div class="alerts">${alerts}</div>` : '') + `<div class="metrics">${metric('users', st.children.length, 'Children')}${metric('clipboard-check', st.enr.length, 'Active batches')}${metric('user-check', r === null ? '–' : r + '%', 'Attendance, last 4 weeks')}${metric('wallet', inr(owe), 'Fees outstanding')}</div>
 <div class="dgrid"><div class="box"><h3>Upcoming sessions</h3>${up.length ? `<div class="rows">${up.map(x => `<div><span><b>${C(x.e.child).name} · ${x.mk ? 'Make-up clinic' : B(x.e.batch).name}</b><small>${B(x.e.batch).coach}${x.mk ? ' · Make-up' : ''}</small></span><span>${x.d.getTime() === today.getTime() ? pill('Today', 'warn') : DAYS[x.d.getDay()] + ', ' + fd(x.d)} · ${x.mk ? '3:00 PM' : ft(B(x.e.batch).start)}</span></div>`).join('')}</div>` : `<p class="muted">No sessions in the next few days. <a href="#enroll" style="color:var(--primary);font-weight:700">Enrol in a batch</a>.</p>`}</div>
 <div class="box"><h3>Attendance trend</h3>${r === null ? '<p class="muted">Attendance appears after the first session.</p>' : `<div class="bars">${wk.map((v, i) => `<div class="bar"><i style="--h:${v || 0}"></i>${v === null ? '–' : v + '%'}<span>${i === 3 ? 'This wk' : (3 - i) + ' wk ago'}</span></div>`).join('')}</div>`}</div></div>${kids}
 <div class="dgrid even"><div class="box"><h3>Latest coach feedback</h3>${st.fb.length ? `<div class="rows">${[...st.fb].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 2).map(f => `<div style="align-items:flex-start"><span><b>${enrLabel(E(f.enr))}</b><small>${f.n}</small></span>${stars(f.r)}</div>`).join('')}</div>` : '<p class="muted">No feedback yet. Coaches post notes after each cycle.</p>'}</div>
 <div class="box"><h3>Quick actions</h3><div class="quick"><a href="#enroll">${ic('clipboard-check')}Enrol a child</a><a href="#fees">${ic('wallet')}Pay fees</a><a href="#schedule">${ic('calendar-days')}View schedule</a><a href="#feedback">${ic('message-square-text')}Message a coach</a></div></div></div>`;
  };
  P.children = () => head('My children', 'Manage athlete profiles and see their batches.') + `<div class="dgrid even" style="align-items:start"><div>${st.children.length ? st.children.map(c => { const es = st.enr.filter(e => e.child === c.id); return `<div class="box child-card" style="margin-bottom:var(--s3)"><span class="avatar">${c.name[0].toUpperCase()}</span><div style="flex:1"><h3 style="margin:0">${c.name}</h3><span class="muted">Age ${c.age}</span><div class="chipline">${es.length ? es.map(e => `<span class="pill">${B(e.batch).name}<button class="x" type="button" data-act="leave" data-id="${e.id}" aria-label="Leave ${B(e.batch).name}" title="Leave this batch">×</button></span>`).join('') : pill('Not enrolled')}</div><div class="btn-row" style="margin:0"><button class="btn btn-primary btn-sm" data-act="enrolFor" data-id="${c.id}">Enrol in batch</button><button class="btn btn-secondary btn-sm" data-act="rmChild" data-id="${c.id}">Remove</button></div></div></div>`; }).join('') : empty('users', 'No children yet', 'Use the form to add your first athlete.')}</div>
 <form class="box" id="childForm" novalidate><h3>Add a child</h3><div class="field"><label for="cn">Child’s name</label><input class="input" id="cn" name="name" required minlength="2"></div><div class="field"><label for="ca">Age (5–17)</label><input class="input" id="ca" name="age" type="number" min="5" max="17" required></div><div class="field"><label for="cm">Medical notes (optional)</label><textarea class="input" id="cm" name="notes" style="min-height:90px"></textarea></div><button class="btn btn-primary btn-block" type="submit">Add child</button></form></div>`;
  P.enroll = () => {
    if (!st.children.length) return head('Enrol in batch', 'Choose a batch that fits age and schedule.') + needKids();
    if (!C(ui.enrChild)) ui.enrChild = st.children[0].id; const ch = C(ui.enrChild), sports = ['all', ...new Set(KX.batches.map(b => b.sport))];
    const list = KX.batches.filter(b => ch.age >= b.age[0] && ch.age <= b.age[1] && (ui.enrSport === 'all' || b.sport === ui.enrSport));
    return head('Enrol in batch', 'Choose a batch that fits age and schedule. We flag any clashes.') + `<div class="sel-row">${childSel('enrChild')}</div><div class="filters" style="justify-content:flex-start">${sports.map(s => `<button class="chip" data-act="sport" data-id="${s}" aria-pressed="${ui.enrSport === s}">${s === 'all' ? 'All sports' : s}</button>`).join('')}</div>
 ${list.length ? `<div class="grid g3">${list.map(b => { const done = st.enr.some(e => e.child === ch.id && e.batch === b.id), l = left(b); return `<div class="card"><span class="pill">${b.sport} · ${b.level}</span><h3 style="margin-top:var(--s2)">${b.name}</h3><p class="muted" style="margin:0">${b.days.join(', ')}<br>${ft(b.start)} – ${ft(b.end)}<br>Coach ${b.coach}</p><p style="margin:var(--s2) 0">${pill(l + ' seats left', l <= 3 ? 'bad' : 'ok')} <b style="margin-inline-start:8px">${inr(b.fee)}/mo</b></p><button class="btn ${done ? 'btn-secondary' : 'btn-primary'} btn-block btn-sm" data-act="enrol" data-id="${b.id}" ${done || !l ? 'disabled' : ''}>${done ? 'Already enrolled' : l ? 'Enrol ' + ch.name : 'Batch full'}</button></div>`; }).join('')}</div>` : empty('search', 'No batches match', `There is no ${ui.enrSport} batch for age ${ch.age}. Try another sport.`)}`;
  };
  P.schedule = () => {
    if (!st.enr.length) return head('Schedule', 'Your weekly training timetable.') + empty('calendar-days', 'Nothing scheduled', 'Enrol in a batch to see weekly sessions.', '<a class="btn btn-primary" href="#enroll">Find a batch</a>');
    const es = st.enr.filter(e => ui.sch === 'all' || String(e.child) === String(ui.sch));
    return head('Schedule', 'Your weekly training timetable. Today is highlighted.') + `<div class="sel-row">${childSel('sch', 1)}</div><div class="week">${WK.map(dn => { const items = es.filter(e => B(e.batch).days.includes(dn)).sort((a, b) => B(a.batch).start.localeCompare(B(b.batch).start)); return `<div class="day ${DAYS[today.getDay()] === dn ? 'today' : ''}"><h4>${dn}</h4>${items.length ? items.map(e => `<div class="slot"><b>${C(e.child).name}</b>${B(e.batch).name}<br>${ft(B(e.batch).start)} – ${ft(B(e.batch).end)}</div>`).join('') : '<span class="muted">Rest day</span>'}</div>`; }).join('')}</div>`;
  };
  P.attendance = () => {
    const es = st.enr.filter(e => ui.att === 'all' || String(e.child) === String(ui.att)), l = es.flatMap(attOf).sort((a, b) => b.d - a.d), r = rate(l), n = s => l.filter(x => x.s === s).length;
    return head('Attendance', 'Sessions attended over the last four weeks.') + (st.children.length ? `<div class="sel-row">${childSel('att', 1)}</div>` : '') + (l.length ? `<div class="dgrid even"><div class="box" style="display:flex;gap:var(--s4);align-items:center;flex-wrap:wrap"><div class="ring" style="--v:${r}" role="img" aria-label="${r}% attendance"><span>${r}%</span></div><div>${pill(n('Present') + ' present', 'ok')}<br><br>${pill(n('Late') + ' late', 'warn')}<br><br>${pill(n('Absent') + ' absent', 'bad')}</div></div><div class="box"><h3>Tip</h3><p class="muted">${r >= 90 ? 'Excellent consistency. Regular attendance is the best predictor of progress.' : 'Missed a session? Use “Book make-up” in the table below. One free make-up clinic is included each month.'}</p></div></div>
 <div class="box" style="margin-bottom:var(--s3)"><h3>Last 28 days</h3><div class="heat">${Array.from({ length: 28 }, (_, i) => { const d = addDays(today, -27 + i), xs = l.filter(x => x.d.getTime() === d.getTime()), w = xs.some(x => x.s === 'Absent') ? 'Absent' : xs.some(x => x.s === 'Late') ? 'Late' : xs.length ? 'Present' : ''; return `<span class="hc ${w ? pc(w) : ''}" title="${fd(d)}${w ? ' · ' + w : ' · No session'}"><small>${d.getDate()}</small></span>`; }).join('')}</div><p class="legend"><i class="ok"></i>Present <i class="warn"></i>Late <i class="bad"></i>Absent <i></i>No session</p></div>
 <div class="table-wrap"><table><thead><tr><th scope="col">Date</th><th scope="col">Child</th><th scope="col">Batch</th><th scope="col">Status</th><th scope="col">Make-up</th></tr></thead><tbody>${l.slice(0, 14).map(x => { const mk = (st.mk || []).find(k => k.enr === x.e.id && k.miss === ymd(x.d)); return `<tr><td>${DAYS[x.d.getDay()]}, ${fd(x.d)}</td><td>${C(x.e.child).name}</td><td>${B(x.e.batch).name}</td><td>${pill(x.s, pc(x.s))}</td><td>${x.s !== 'Absent' ? '<span class="muted">–</span>' : mk ? pill('Booked ' + fd(parse(mk.date)), 'ok') : `<button class="btn btn-secondary btn-sm" data-act="makeup" data-id="${x.e.id}" data-d="${ymd(x.d)}">Book make-up</button>`}</td></tr>`; }).join('')}</tbody></table></div>` : empty('user-check', 'No attendance yet', 'Records appear after your child’s first session.'));
  };
  P.feedback = () => {
    const l = st.fb.filter(f => ui.fb === 'all' || String(E(f.enr).child) === String(ui.fb)).sort((a, b) => b.d.localeCompare(a.d));
    return head('Coach feedback', 'Ratings and next steps from your child’s coaches.') + (st.children.length ? `<div class="sel-row">${childSel('fb', 1)}</div>` : '') + (l.length ? `<div class="grid g2">${l.map(f => `<div class="card"><div class="row-between" style="margin-bottom:var(--s2)"><span><b>${enrLabel(E(f.enr))}</b><br><span class="muted">${f.coach} · ${fd(parse(f.d))}</span></span>${stars(f.r)}</div><p>${f.n}</p>${Object.entries(f.sk).map(([k, v]) => `<div class="meter"><span>${k}</span><i style="--w:${v * 20}%" role="img" aria-label="${v} of 5"></i></div>`).join('')}</div>`).join('')}</div>` : empty('message-square-text', 'No feedback yet', 'Coaches post feedback at the end of each training cycle.')) + (st.enr.length ? `<form class="box" id="coachForm" novalidate style="margin-top:var(--s4)"><h3>Message a coach</h3><div class="field"><label for="cb">Batch</label><select class="input" id="cb" name="enr" required>${st.enr.map(e => `<option value="${e.id}">${enrLabel(e)}</option>`).join('')}</select></div><div class="field"><label for="cq">Your message</label><textarea class="input" id="cq" name="msg" required minlength="10"></textarea></div><button class="btn btn-primary" type="submit">Send message</button></form>` : '');
  };
  P.fees = () => {
    const pend = due(), paid = st.pay.filter(p => p.status === 'paid'), tot = pend.reduce((a, p) => a + p.amount, 0), row = p => { const e = E(p.enr); return `<tr><td>${C(e.child).name}</td><td>${B(e.batch).name}</td><td>${p.month}</td><td>${inr(p.amount)}</td><td>${p.status === 'paid' ? pill('Paid ' + fd(parse(p.paidOn)), 'ok') : pill('Due ' + fd(parse(p.due)), 'warn')}</td><td>${p.status === 'paid' ? `<button class="btn btn-secondary btn-sm" data-act="receipt" data-id="${p.id}">Receipt</button>` : `<button class="btn btn-primary btn-sm" data-act="pay" data-id="${p.id}">Pay now</button>`}</td></tr>`; };
    return head('Fees & payments', 'Pay monthly fees securely and download receipts.') + `<div class="total-strip"><div><span style="color:#B9C4D8">Outstanding</span><br><b style="font:700 2.4rem var(--f-display)">${inr(tot)}</b></div>${pend.length ? `<button class="btn btn-primary" data-act="payAll">Pay all (${pend.length})</button>` : pill('All paid up', 'ok')}</div>` + (st.pay.length ? `<div class="table-wrap"><table><thead><tr><th scope="col">Child</th><th scope="col">Batch</th><th scope="col">Month</th><th scope="col">Amount</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>${[...pend, ...paid.reverse()].map(row).join('')}</tbody></table></div>` : empty('wallet', 'No fees yet', 'Fees appear here after you enrol in a batch.', '<a class="btn btn-primary" href="#enroll">Enrol now</a>'));
  };
  P.messages = () => head('Messages', 'Updates from the academy and your coaches.') + (st.msg.length ? `<div class="btn-row" style="margin:0 0 var(--s3)"><button class="btn btn-secondary btn-sm" data-act="readAll" ${unread() ? '' : 'disabled'}>Mark all as read</button></div>` + [...st.msg].sort((a, b) => b.d.localeCompare(a.d) || b.id - a.id).map(m => `<div class="msg ${m.read ? '' : 'unread'}"><span class="ic-box">${ic(m.t.includes('Fee') ? 'wallet' : m.t.includes('feedback') ? 'message-square-text' : 'bell')}</span><div style="flex:1"><h4>${m.t}</h4><p class="muted" style="margin:0">${m.b}</p><small class="muted">${fd(parse(m.d))}</small></div>${m.read ? '' : `<button class="btn btn-secondary btn-sm" data-act="read" data-id="${m.id}">Mark read</button>`}</div>`).join('') : empty('bell', 'You are all caught up', 'New updates will show up here.'));
  P.settings = () => head('Settings', 'Update your profile and notification preferences.') + `<div class="dgrid even" style="align-items:start"><form class="box" id="profForm" novalidate><h3>Profile</h3><div class="field"><label for="pn">Full name</label><input class="input" id="pn" name="name" value="${sess.name}" required minlength="2"></div><div class="field"><label for="pe">Email</label><input class="input" id="pe" value="${sess.email}" disabled></div><div class="field"><label for="pp">Phone</label><input class="input" id="pp" name="phone" type="tel" value="${sess.phone || ''}" required></div><button class="btn btn-primary" type="submit">Save profile</button></form>
 <div class="box"><h3>Notifications</h3>${[['email', 'Email updates'], ['sms', 'SMS alerts'], ['whatsapp', 'WhatsApp messages'], ['reminders', 'Session reminders']].map(([k, l]) => `<label class="switch"><span>${l}</span><input type="checkbox" data-pref="${k}" ${st.prefs[k] ? 'checked' : ''}></label>`).join('')}<p class="muted" style="margin-top:var(--s3)">Demo data is stored only in this browser.</p><button class="btn btn-secondary btn-sm" data-act="reset">Reset demo data</button></div></div>`;

  /* ---------- rendering + routing ---------- */
  let cur = 'overview';
  function render() { $('#p-' + cur).innerHTML = P[cur](); KX.icons(); badge(); }
  function show(n) {
    if (!P[n]) n = 'overview'; cur = n; $$('.panel').forEach(p => (p.hidden = p.id !== 'p-' + n));
    $$('.side-nav a').forEach(a => { const on = a.dataset.p === n; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
    document.title = TITLES[n] + ' | Kinetix Parent Dashboard'; $('#p-' + n).innerHTML = '<div class="skeleton"></div>'; setTimeout(() => cur === n && render(), 220); side(false); scrollTo(0, 0); $('.dash-main').scrollTop = 0;
  }
  function badge() { const b = $('#badge'), u = unread(); b.hidden = !u; b.textContent = u; }
  const side = o => { $('#side').classList.toggle('open', o); $('#scrim').classList.toggle('show', o); };
  $('#sideToggle').addEventListener('click', () => side(true)); $('#scrim').addEventListener('click', () => side(false));
  addEventListener('hashchange', () => show(location.hash.slice(1)));
  $('#welcome').textContent = `Welcome back, ${first}!`; $('#avatar').textContent = first[0].toUpperCase(); $('#pname').textContent = sess.name;

  /* ---------- modal ---------- */
  const modal = $('#modal'), box = $('#modalBox');
  const open = h => { box.innerHTML = h; modal.classList.add('open'); KX.icons(); const f = $('input,select,button', box); f && f.focus(); }, close = () => modal.classList.remove('open');
  modal.addEventListener('click', e => e.target === modal && close()); addEventListener('keydown', e => e.key === 'Escape' && close());
  const setErr = (f, m) => { let e = $('.error', f); if (!e) { e = document.createElement('span'); e.className = 'error'; f.appendChild(e); } e.textContent = m; f.classList.toggle('invalid', !!m); return !m; };
  function payModal(ids) {
    const items = st.pay.filter(p => ids.includes(p.id)), tot = items.reduce((a, p) => a + p.amount, 0), fields = { upi: '<div class="field"><label for="f1">UPI ID</label><input class="input" id="f1" name="upi" placeholder="name@bank" autocomplete="off"></div>', card: '<div class="field"><label for="f1">Card number</label><input class="input" id="f1" name="card" inputmode="numeric" placeholder="1234 5678 9012 3456" autocomplete="cc-number"></div><div class="grid g2" style="gap:var(--s2)"><div class="field"><label for="f2">Expiry (MM/YY)</label><input class="input" id="f2" name="exp" placeholder="08/29" autocomplete="cc-exp"></div><div class="field"><label for="f3">CVV</label><input class="input" id="f3" name="cvv" inputmode="numeric" maxlength="3" autocomplete="cc-csc"></div></div>', net: '<div class="field"><label for="f1">Choose your bank</label><select class="input" id="f1" name="bank"><option value="">Select bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select></div>' };
    open(`<h3 id="mTitle">Pay fees</h3><p class="muted">${items.length} item(s) · Total <b>${inr(tot)}</b></p><form id="payForm" novalidate><div class="field"><label for="pm">Payment method</label><select class="input" id="pm"><option value="upi">UPI</option><option value="card">Debit / credit card</option><option value="net">Net banking</option></select></div><div id="pf">${fields.upi}</div><div class="btn-row" style="margin:0"><button class="btn btn-primary" type="submit" style="flex:1">Pay ${inr(tot)}</button><button class="btn btn-secondary" type="button" data-act="close">Cancel</button></div><p class="muted" style="font-size:.85rem;margin:var(--s2) 0 0">Demo only. No real payment is made.</p></form>`);
    $('#pm').addEventListener('change', e => ($('#pf').innerHTML = fields[e.target.value]));
    $('#payForm').addEventListener('submit', ev => {
      ev.preventDefault(); const m = $('#pm').value, g = n => ($('[name=' + n + ']', box) || {}).value || '', f = i => $$('.field', $('#pf'))[i]; let ok = true;
      if (m === 'upi') ok = setErr(f(0), /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(g('upi').trim()) ? '' : 'Enter a valid UPI ID, e.g. name@bank.');
      if (m === 'card') { const a = setErr(f(0), /^\d{16}$/.test(g('card').replace(/\s/g, '')) ? '' : 'Enter a 16-digit card number.'), b = setErr($$('.field', box)[2], /^(0[1-9]|1[0-2])\/\d{2}$/.test(g('exp')) ? '' : 'Use MM/YY.'), c = setErr($$('.field', box)[3], /^\d{3}$/.test(g('cvv')) ? '' : 'Enter 3 digits.'); ok = a && b && c; }
      if (m === 'net') ok = setErr(f(0), g('bank') ? '' : 'Choose your bank.');
      if (!ok) return; const txn = 'KX' + Date.now().toString().slice(-6);
      items.forEach(p => Object.assign(p, { status: 'paid', paidOn: ymd(today), method: { upi: 'UPI', card: 'Card', net: 'Net banking' }[m], txn }));
      st.msg.push({ id: nid(), t: 'Payment received', b: `${inr(tot)} received. Transaction ${txn}. Thank you!`, d: ymd(today), read: false }); save(); close(); render(); KX.toast(`Payment of ${inr(tot)} successful.`);
    });
  }

  function makeupModal(enrId, miss) {
    const en = E(enrId), bt = B(en.batch), used = (st.mk || []).map(k => k.month);
    const slots = []; for (let i = 1; i <= 21 && slots.length < 6; i++) { const d = addDays(today, i), dn = DAYS[d.getDay()]; if (dn !== 'Sat' && dn !== 'Sun') continue; if (used.includes(ymd(d).slice(0, 7))) continue; const own = st.enr.some(x => x.child === en.child && B(x.batch).days.includes(dn) && B(x.batch).start < '16:00' && B(x.batch).end > '15:00'); if (!own) slots.push(d); }
    open(`<h3 id="mTitle">Book a make-up clinic</h3><p class="muted">${C(en.child).name} missed ${bt.name} on ${fd(parse(miss))}. Pick a free weekend clinic (3:00 – 4:00 PM, Coach ${bt.coach}). One per month is included.</p>${slots.length ? `<div class="slots">${slots.map(d => `<button type="button" class="slot-pick" data-act="mkgo" data-enr="${en.id}" data-miss="${miss}" data-date="${ymd(d)}"><b>${DAYS[d.getDay()]}</b>${fd(d)}</button>`).join('')}</div>` : '<p>No free weekend slot is available in the next three weeks, or this month’s clinic is already used. Message the coach for a custom slot.</p>'}<div class="btn-row" style="margin:var(--s3) 0 0"><button class="btn btn-secondary" type="button" data-act="close">Cancel</button></div>`);
  }

  /* ---------- actions (event delegation) ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return; const id = a.dataset.id, act = a.dataset.act;
    if (act === 'close') close();
    else if (act === 'leave') { const en = E(+id); if (!confirm(`Remove ${C(en.child).name} from ${B(en.batch).name}? Unpaid fees for this batch will be cancelled.`)) return; st.enr = st.enr.filter(x => x.id !== en.id); st.pay = st.pay.filter(p => p.enr !== en.id || p.status === 'paid'); st.fb = st.fb.filter(f => f.enr !== en.id); st.mk = (st.mk || []).filter(k => k.enr !== en.id); save(); render(); KX.toast('Batch removed.'); }
    else if (act === 'makeup') makeupModal(+id, a.dataset.d);
    else if (act === 'mkgo') { const [en, miss, date] = [+a.dataset.enr, a.dataset.miss, a.dataset.date]; st.mk = st.mk || []; if (st.mk.some(k => k.month === date.slice(0, 7))) return KX.toast('You have already used this month’s make-up clinic.', 'error'); st.mk.push({ id: nid(), enr: en, miss, date, month: date.slice(0, 7) }); st.msg.push({ id: nid(), t: 'Make-up session booked', b: `${C(E(en).child).name}: make-up clinic on ${fd(parse(date))}, 3:00 PM – 4:00 PM with Coach ${B(E(en).batch).coach}.`, d: ymd(today), read: false }); save(); close(); render(); KX.toast('Make-up session booked.'); }
    else if (act === 'rmChild') { const c = C(+id); if (!confirm(`Remove ${c.name} and their enrolments?`)) return; const gone = st.enr.filter(x => x.child === c.id).map(x => x.id); st.children = st.children.filter(x => x.id !== c.id); st.enr = st.enr.filter(x => x.child !== c.id); st.pay = st.pay.filter(p => !gone.includes(p.enr)); st.fb = st.fb.filter(f => !gone.includes(f.enr)); save(); render(); KX.toast(c.name + ' removed.'); }
    else if (act === 'enrolFor') { ui.enrChild = +id; location.hash = 'enroll'; }
    else if (act === 'sport') { ui.enrSport = id; render(); }
    else if (act === 'enrol') {
      const b = B(id), ch = C(ui.enrChild), clash = st.enr.filter(x => x.child === ch.id).find(x => overlap(B(x.batch), b));
      if (clash) return KX.toast(`Clashes with ${B(clash.batch).name} (${B(clash.batch).days.join('/')} ${ft(B(clash.batch).start)}).`, 'error');
      const en = { id: nid(), child: ch.id, batch: b.id, on: ymd(today), new: true }; st.enr.push(en);
      st.pay.push({ id: nid(), enr: en.id, month: ml(today), amount: b.fee, status: 'pending', due: ymd(addDays(today, 7)) });
      st.msg.push({ id: nid(), t: 'Enrolment confirmed', b: `${ch.name} is enrolled in ${b.name}. First fee is due in 7 days.`, d: ymd(today), read: false }); save(); render(); KX.toast(`${ch.name} enrolled in ${b.name}.`);
    }
    else if (act === 'pay') payModal([+id]); else if (act === 'payAll') payModal(due().map(p => p.id));
    else if (act === 'receipt') { const p = st.pay.find(x => x.id === +id), en = E(p.enr), txt = `KINETIX SPORTS ACADEMY – FEE RECEIPT\n\nTransaction: ${p.txn}\nDate: ${p.paidOn}\nParent: ${sess.name}\nChild: ${C(en.child).name}\nBatch: ${B(en.batch).name}\nMonth: ${p.month}\nAmount: ${inr(p.amount)}\nMethod: ${p.method}\n\nThank you!`, l = document.createElement('a'); l.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' })); l.download = `receipt-${p.txn}.txt`; l.click(); URL.revokeObjectURL(l.href); }
    else if (act === 'read') { st.msg.find(m => m.id === +id).read = true; save(); render(); }
    else if (act === 'readAll') { st.msg.forEach(m => (m.read = true)); save(); render(); }
    else if (act === 'reset') { if (!confirm('Reset all demo data for this account?')) return; try { localStorage.removeItem(KEY); } catch (x) {} st = seed(); save(); render(); KX.toast('Demo data reset.'); }
  });
  document.addEventListener('change', e => {
    const k = e.target.dataset.ui, p = e.target.dataset.pref;
    if (k) { ui[k] = k === 'enrChild' ? +e.target.value : e.target.value; render(); const f = $('#s-' + k); f && f.focus(); }
    if (p) { st.prefs[p] = e.target.checked; save(); KX.toast('Preference saved.'); }
  });
  document.addEventListener('submit', e => {
    const f = e.target; if (!['childForm', 'coachForm', 'profForm'].includes(f.id)) return; e.preventDefault(); if (!KX.validate(f)) return; const v = n => f.elements[n].value.trim();
    if (f.id === 'childForm') { const age = +v('age'); if (age < 5 || age > 17) return setErr($('#ca').parentElement, 'Age must be between 5 and 17.'); const c = { id: nid(), name: v('name'), age }; st.children.push(c); ui.enrChild = c.id; save(); render(); KX.toast(`${c.name} added. Now choose a batch.`); }
    if (f.id === 'coachForm') { const en = E(+v('enr')); st.msg.push({ id: nid(), t: 'Message sent to ' + B(en.batch).coach, b: v('msg'), d: ymd(today), read: true }); save(); f.reset(); render(); KX.toast('Message sent. The coach will reply within 2 working days.'); }
    if (f.id === 'profForm') { sess.name = v('name'); sess.phone = v('phone'); KX.store.set('kx-dash-profile', { name: sess.name, phone: sess.phone }); $('#avatar').textContent = sess.name[0].toUpperCase(); $('#pname').textContent = sess.name; KX.toast('Profile saved.'); }
  });
  badge(); show(location.hash.slice(1) || 'overview');
})();
});

/* ===== image-frames ===== */
run("image-frames",function(){if(['home','home2'].indexOf(PAGE)<0)return;
/* refine.js : wraps photos in aligned frames (see refine.css section 1) */
(function(){
  var SEL=['.day-card>img','.bf>img','.edge .e .ei>img','.s-tile>img','.media>img','.bento .tile>img','.coach-card .thumb>img','.bp-media>img'].join(',');
  function frame(img){
    if(img.parentElement.classList.contains('fr'))return;
    var w=document.createElement('div');w.className='fr';
    img.parentNode.insertBefore(w,img);w.appendChild(img);
    function set(){w.style.setProperty('--bgimg','url("'+(img.currentSrc||img.src)+'")')}
    set();img.addEventListener('load',set);img.addEventListener('error',set);
    if(img.parentElement.parentElement&&img.closest('.s-tile')){
      var fit=function(){
        if(!img.naturalWidth)return;
        var t=img.closest('.s-tile'),fr=t.clientWidth/Math.max(t.clientHeight,1),ir=img.naturalWidth/img.naturalHeight;
        w.classList.toggle('is-fit',Math.abs(ir/fr-1)>0.45);
      };
      img.addEventListener('load',fit);window.addEventListener('resize',fit);if(img.complete)fit();
    }
  }
  function run(){document.querySelectorAll(SEL).forEach(frame)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
});

}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
