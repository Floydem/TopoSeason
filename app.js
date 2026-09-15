const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const shortMonths = ['JAN','FÉV','MAR','AVR','MAI','JUN','JUL','AOÛ','SEP','OCT','NOV','DÉC'];
const races = [
  {id:'r1',name:'Trail des Hautes Crêtes',place:'Massif du Jura',month:3,day:11,type:'trail',distance:31,elevation:1420,index:'50K',classic:false,drive:72,status:'soon',registration:'Ouverture estimée le 18 novembre',match:96},
  {id:'r2',name:'Boucle du Lac',place:'Haute-Savoie',month:3,day:18,type:'trail',distance:27,elevation:980,index:'20K',classic:false,drive:94,status:'open',registration:'Inscriptions ouvertes',match:91},
  {id:'r3',name:'Marathon des Alpes',place:'Annecy',month:4,day:9,type:'road',distance:42.2,elevation:210,index:null,classic:true,drive:126,status:'open',registration:'Inscriptions ouvertes',match:77},
  {id:'r4',name:'10K des Remparts',place:'Bourgogne-Franche-Comté',month:0,day:29,type:'road',distance:10,elevation:70,index:null,classic:false,drive:38,status:'open',registration:'Inscriptions ouvertes',match:98},
  {id:'r5',name:'Traversée du Haut-Doubs',place:'Massif du Jura',month:8,day:13,type:'trail',distance:44,elevation:1880,index:'50K',classic:true,drive:54,status:'unknown',registration:'Date à confirmer',match:94},
  {id:'r6',name:'Ultra des Roches',place:'Vosges',month:5,day:20,type:'trail',distance:82,elevation:3900,index:'100K',classic:false,drive:142,status:'soon',registration:'Préinscriptions annoncées prochainement',match:73},
  {id:'r7',name:'Semi des Vignes',place:'Alsace',month:9,day:4,type:'road',distance:21.1,elevation:120,index:null,classic:true,drive:109,status:'open',registration:'Inscriptions ouvertes',match:86},
  {id:'r8',name:'Trail des Sapins Noirs',place:'Jura',month:10,day:7,type:'trail',distance:18,elevation:760,index:'20K',classic:false,drive:63,status:'unknown',registration:'Ouverture non communiquée',match:83}
];

const defaults = {
  year: 2027,
  goals: [
    {id:'g1',month:0,type:'10 km',min:9,max:12,window:'Fin du mois',travel:60,index:'any'},
    {id:'g2',month:3,type:'Trail',min:25,max:35,window:'Autour du 15',travel:90,index:'prefer'},
    {id:'g3',month:8,type:'Trail',min:35,max:50,window:'Tout le mois',travel:90,index:'prefer'}
  ],
  following:['r1','r5'],radius:90,indexPref:true,alertPref:true,location:null
};
let state = loadState();
let activeFilter = 'all';
function loadState(){try{return {...defaults,...JSON.parse(localStorage.getItem('toposeason-v1')||'{}')}}catch{return {...defaults}}}
function save(){localStorage.setItem('toposeason-v1',JSON.stringify(state))}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

function renderAll(){renderSeason();renderRaces();renderWatch();renderProfile()}
function renderSeason(){
  document.getElementById('yearLabel').textContent=state.year;
  const matches=state.goals.reduce((n,g)=>n+matchingRaces(g).length,0);
  document.getElementById('seasonSummary').innerHTML=`
    <div class="sum-item"><b>${state.goals.length}</b><span>objectifs posés</span></div>
    <div class="sum-item"><b>${matches}</b><span>courses compatibles</span></div>
    <div class="sum-item"><b>${state.following.length}</b><span>courses suivies</span></div>
    <div class="sum-item"><b>${state.radius}</b><span>min de rayon</span></div>`;
  document.getElementById('timeline').innerHTML=MONTHS.map((m,i)=>{
    const gs=state.goals.filter(g=>g.month===i);
    return `<div class="month-row ${gs.length?'has-goal':''}"><div class="month-label">${shortMonths[i]}</div><div class="goal-stack">${gs.length?gs.map(goalCard).join(''):`<button class="empty-goal" data-add-month="${i}">+ Poser un objectif</button>`}</div></div>`
  }).join('');
  document.querySelectorAll('[data-add-month]').forEach(b=>b.onclick=()=>openGoal(+b.dataset.addMonth));
  document.querySelectorAll('.goal-card').forEach(c=>c.onclick=()=>{const g=state.goals.find(x=>x.id===c.dataset.goal); if(g){goTo('explore');document.getElementById('raceSearch').value=''; activeFilter=g.type.toLowerCase().includes('trail')?'trail':'road';syncFilters();renderRaces(g)}})
}
function goalCard(g){const n=matchingRaces(g).length;const pref=g.index==='required'?'Index obligatoire':g.index==='prefer'?'Index prioritaire':'Toutes courses';return `<article class="goal-card" data-goal="${g.id}"><div><div class="goal-top"><span class="tag">${esc(g.window)}</span>${g.index!=='any'?'<span class="tag index">△ INDEX</span>':''}</div><h3>${esc(g.type)} · ${g.min}${g.max!==g.min?'–'+g.max:''} KM</h3><div class="goal-meta"><span>🚗 ≤ ${g.travel} min</span><span>${pref}</span></div></div><div class="match-box"><b>${n}</b><span>match${n>1?'s':''}</span></div></article>`}
function matchingRaces(g){return races.filter(r=>{const typeOk=g.type.toLowerCase().includes('trail')?r.type==='trail':r.type==='road';const dist=r.distance>=g.min&&r.distance<=g.max;const indexOk=g.index!=='required'||!!r.index;return r.month===g.month&&typeOk&&dist&&r.drive<=g.travel&&indexOk})}

function renderRaces(goal=null){
  const q=(document.getElementById('raceSearch')?.value||'').toLowerCase().trim();
  let list=races.filter(r=>{
    const f=activeFilter==='all'||(activeFilter==='index'&&r.index)||(activeFilter==='classic'&&r.classic)||(activeFilter===r.type);
    const text=`${r.name} ${r.place} ${r.type}`.toLowerCase();return f&&(!q||text.includes(q));
  });
  if(goal) list=list.sort((a,b)=>scoreForGoal(b,goal)-scoreForGoal(a,goal));
  const grid=document.getElementById('raceGrid'); if(!grid)return;
  grid.innerHTML=list.length?list.map(raceCard).join(''):'<div class="empty-goal" style="grid-column:1/-1">Aucune course dans cette démo avec ces filtres.</div>';
  grid.querySelectorAll('.race-card').forEach(c=>c.onclick=e=>{if(e.target.closest('.heart-btn'))return;openRace(c.dataset.race)});
  grid.querySelectorAll('.heart-btn').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFollow(b.dataset.follow)});
}
function scoreForGoal(r,g){let s=0;if(r.month===g.month)s+=35;if(r.distance>=g.min&&r.distance<=g.max)s+=35;if(r.drive<=g.travel)s+=20;if(g.index==='prefer'&&r.index)s+=10;if(g.index==='required'&&!r.index)s-=50;return s}
function raceCard(r){const following=state.following.includes(r.id);return `<article class="race-card" data-race="${r.id}"><div class="race-visual"><div class="datebox">${String(r.day).padStart(2,'0')} ${shortMonths[r.month]} · ${state.year}</div><div class="mountain">${r.distance}K</div></div><div class="race-body"><div class="race-badges">${r.index?`<span class="tag index">△ INDEX ${r.index}</span>`:''}${r.classic?'<span class="tag">★ CLASSIQUE</span>':''}<span class="tag">${r.type==='trail'?'TRAIL':'ROUTE'}</span></div><h3>${esc(r.name)}</h3><div class="race-place">${esc(r.place)}</div><div class="race-numbers"><div class="race-num"><b>${r.distance}</b><span>KM</span></div><div class="race-num"><b>+${r.elevation}</b><span>D+</span></div><div class="race-num"><b>${r.drive}</b><span>MIN ROUTE</span></div></div><div class="race-foot"><span class="match-pill">MATCH ${r.match}%</span><button class="heart-btn ${following?'following':''}" data-follow="${r.id}" aria-label="Suivre">${following?'♥':'♡'}</button></div></div></article>`}
function syncFilters(){document.querySelectorAll('.filter').forEach(f=>f.classList.toggle('active',f.dataset.filter===activeFilter))}

function renderWatch(){const list=races.filter(r=>state.following.includes(r.id));const open=list.filter(r=>r.status==='open').length;const soon=list.filter(r=>r.status==='soon').length;document.getElementById('watchStats').innerHTML=`<div class="watch-stat"><b>${list.length}</b><span>suivies</span></div><div class="watch-stat"><b>${open}</b><span>ouvertes</span></div><div class="watch-stat"><b>${soon}</b><span>à surveiller</span></div>`;document.getElementById('watchList').innerHTML=list.length?list.map(r=>`<article class="watch-card"><div><span class="status ${r.status}">${r.status==='open'?'Inscriptions ouvertes':r.status==='soon'?'Ouverture proche':'Date inconnue'}</span><h3>${esc(r.name)}</h3><p>${esc(r.registration)} · ${r.distance} km · ${r.drive} min de route</p></div><div class="watch-actions"><button class="small-btn" data-unfollow="${r.id}">Retirer</button></div></article>`).join(''):`<div class="empty-goal">Tu ne suis encore aucune course. Va dans Explorer et touche ♡ pour lancer la veille.</div>`;document.querySelectorAll('[data-unfollow]').forEach(b=>b.onclick=()=>toggleFollow(b.dataset.unfollow))}
function toggleFollow(id){state.following=state.following.includes(id)?state.following.filter(x=>x!==id):[...state.following,id];save();renderSeason();renderRaces();renderWatch();showToast(state.following.includes(id)?'Course ajoutée à ta veille':'Course retirée de ta veille')}

function renderProfile(){document.getElementById('radiusRange').value=state.radius;document.getElementById('radiusLabel').textContent=state.radius;document.getElementById('indexPref').checked=state.indexPref;document.getElementById('alertPref').checked=state.alertPref;document.getElementById('locationLabel').textContent=state.location?.label||'Position non définie'}

function openGoal(month=new Date().getMonth()){document.getElementById('goalMonth').value=month;document.getElementById('goalDialog').showModal()}
function setupGoalForm(){const sel=document.getElementById('goalMonth');sel.innerHTML=MONTHS.map((m,i)=>`<option value="${i}">${m}</option>`).join('');document.getElementById('goalForm').addEventListener('submit',e=>{const submitter=e.submitter;if(submitter?.value==='cancel')return; e.preventDefault();const min=+document.getElementById('goalMin').value,max=+document.getElementById('goalMax').value;const win={month:'Tout le mois',early:'Début du mois',mid:'Autour du 15',late:'Fin du mois'}[document.getElementById('goalWindow').value];state.goals.push({id:'g'+Date.now(),month:+sel.value,type:document.getElementById('goalType').value,min:Math.min(min,max),max:Math.max(min,max),window:win,travel:+document.getElementById('goalTravel').value,index:document.querySelector('input[name="index"]:checked').value});save();renderSeason();document.getElementById('goalDialog').close();showToast('Objectif ajouté à ta saison')})}

function openRace(id){const r=races.find(x=>x.id===id);if(!r)return;const following=state.following.includes(id);document.getElementById('raceDetail').innerHTML=`<div class="race-detail-card"><div class="detail-hero"><button class="detail-close" onclick="document.getElementById('raceDialog').close()">×</button><div class="race-badges">${r.index?`<span class="tag index">△ INDEX ${r.index}</span>`:''}${r.classic?'<span class="tag">★ CLASSIQUE</span>':''}</div><h2>${esc(r.name)}</h2><p>${String(r.day).padStart(2,'0')} ${MONTHS[r.month]} ${state.year} · ${esc(r.place)}</p></div><div class="detail-body"><div class="detail-kpis"><div class="detail-kpi"><b>${r.distance} km</b><span>distance</span></div><div class="detail-kpi"><b>+${r.elevation} m</b><span>dénivelé</span></div><div class="detail-kpi"><b>${r.drive} min</b><span>route estimée</span></div><div class="detail-kpi"><b>${r.match}%</b><span>match</span></div></div><div class="match-reason"><strong>Pourquoi ce match ?</strong><p>La période, la distance et le temps de déplacement sont comparés à tes objectifs. Les courses Index sont rehaussées quand tu les définis comme prioritaires.</p></div><div class="detail-actions"><button class="outline-btn" onclick="showToast('Lien officiel simulé dans cette V1')">SITE OFFICIEL ↗</button><button class="solid-btn" onclick="toggleFollow('${r.id}');document.getElementById('raceDialog').close()">${following?'RETIRER DE LA VEILLE':'♡ SUIVRE LA COURSE'}</button></div></div></div>`;document.getElementById('raceDialog').showModal()}

function goTo(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.dataset.view===name));document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.nav===name));window.scrollTo({top:0,behavior:'smooth'});if(name==='watch')renderWatch()}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(showToast._t);showToast._t=setTimeout(()=>t.classList.remove('show'),2200)}

function init(){
  setupGoalForm();renderAll();
  document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>goTo(b.dataset.nav));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>goTo(b.dataset.go));
  document.getElementById('addGoalTop').onclick=()=>openGoal();
  document.getElementById('prevYear').onclick=()=>{state.year--;save();renderSeason();renderRaces()};document.getElementById('nextYear').onclick=()=>{state.year++;save();renderSeason();renderRaces()};
  document.getElementById('raceSearch').addEventListener('input',()=>renderRaces());document.querySelectorAll('.filter').forEach(f=>f.onclick=()=>{activeFilter=f.dataset.filter;syncFilters();renderRaces()});
  document.getElementById('radiusRange').oninput=e=>{state.radius=+e.target.value;document.getElementById('radiusLabel').textContent=state.radius;save();renderSeason()};
  document.getElementById('indexPref').onchange=e=>{state.indexPref=e.target.checked;save()};document.getElementById('alertPref').onchange=e=>{state.alertPref=e.target.checked;save()};
  document.getElementById('geoBtn').onclick=()=>{if(!navigator.geolocation){showToast('Géolocalisation non disponible');return}showToast('Demande de localisation…');navigator.geolocation.getCurrentPosition(p=>{state.location={lat:p.coords.latitude,lon:p.coords.longitude,label:'Position enregistrée sur cet appareil'};save();renderProfile();showToast('Position enregistrée')},()=>showToast('Localisation refusée ou indisponible'),{enableHighAccuracy:false,timeout:7000})};
  document.getElementById('notifBtn').onclick=()=>{goTo('watch');showToast('2 courses surveillées dans cette démo')};
  document.getElementById('goalDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});document.getElementById('raceDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
}
init();
