seedRaces.splice(0, seedRaces.length, ...regionalCatalog);

function dateLabel(r){
  const d=new Date(r.date+'T12:00:00');
  const base=d.toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'});
  return r.verified==='estimated' ? `≈ ${base} · à confirmer` : base;
}
function circuitBadge(r){return r.circuit?`<span class="badge">${esc(r.circuit)}</span>`:''}
function countryLabel(r){return r.country==='FR'?'France':r.country==='CH'?'Suisse':r.country==='IT'?'Italie':''}

card = function(r){
  const t=travel(r),s=matchRace(r),follow=state.following.includes(r.id);
  return `<article class="race-card" data-race="${r.id}"><div class="race-img" style="background-image:url('${r.img||IMG[1]}')"><span class="badge">${r.type==='trail'?'Trail':'Route'}</span></div><div class="race-body"><div class="status-group">${r.index?`<span class="badge index">UTMB Index ${r.index}</span>`:''}${circuitBadge(r)}${r.verified==='estimated'?'<span class="badge">Date à confirmer</span>':''}</div><h3>${esc(r.name)}</h3><div class="sub">${esc(r.city)} · ${dateLabel(r)}</div><div class="metrics"><span>↝ ${r.distance} km</span><span>△ ${r.elev} D+</span><span>🚗 ${t?t.min+' min':'Activer position'}</span></div><div class="match"><span class="score">${s}% match</span><button class="heart ${follow?'on':''}" data-follow="${r.id}" aria-label="Suivre">${follow?'♥':'♡'}</button></div></div></article>`
};

renderExplore = function(){
  const q=document.querySelector('#searchInput').value.toLowerCase().trim();
  let rs=allRaces().filter(r=>!q||(`${r.name} ${r.city} ${r.country||''} ${r.circuit||''} ${r.distance}`).toLowerCase().includes(q));
  if(filter==='trail')rs=rs.filter(r=>r.type==='trail');
  if(filter==='road')rs=rs.filter(r=>r.type==='road');
  if(filter==='index')rs=rs.filter(r=>r.index);
  if(filter==='near')rs=rs.filter(r=>{const t=travel(r);return t&&t.min<=state.profile.maxTravel});
  if(filter==='france')rs=rs.filter(r=>r.country==='FR');
  if(filter==='swiss')rs=rs.filter(r=>r.country==='CH');
  if(filter==='italy')rs=rs.filter(r=>r.country==='IT');
  if(filter==='utmbws')rs=rs.filter(r=>(r.circuit||'').includes('UTMB World Series'));
  if(filter==='torx')rs=rs.filter(r=>(r.circuit||'').includes('TORX'));
  rs.sort((a,b)=>matchRace(b)-matchRace(a));
  document.querySelector('#raceList').innerHTML=rs.length?rs.map(r=>{const t=travel(r),s=matchRace(r),f=state.following.includes(r.id);return `<article class="list-card" data-race="${r.id}"><div class="thumb" style="background-image:url('${r.img||IMG[1]}')"></div><div><div class="small muted">${dateLabel(r)} · ${countryLabel(r)}</div><h3>${esc(r.name)}</h3><div class="sub">${esc(r.city)}${r.index?' · UTMB Index '+r.index:''}${r.circuit?' · '+esc(r.circuit):''}</div><div class="metrics"><span>${r.distance} km</span><span>${r.elev} D+</span><span>${t?t.min+' min':'Position ?'}</span><span class="score">${s}%</span></div></div><button class="heart ${f?'on':''}" data-follow="${r.id}">${f?'♥':'♡'}</button></article>`}).join(''):'<div class="empty">Aucune course ne correspond à ces filtres.</div>';
};

raceDetailOpen = function(id){
  const r=allRaces().find(x=>x.id===id);if(!r)return;
  const t=travel(r),st=openStatus(r),f=state.following.includes(id),reg=state.registered.includes(id);
  const official=r.url?`<button class="btn secondary" data-official="${esc(r.url)}">Site officiel ↗</button>`:'';
  raceDetail.innerHTML=`<div class="modal-head"><div></div><button class="x" data-close>×</button></div><div class="detail-hero" style="background-image:url('${r.img||IMG[1]}')"><span class="badge">${r.type==='trail'?'Trail':'Route'}</span>${r.index?` <span class="badge index">Index ${r.index}</span>`:''}${r.circuit?` <span class="badge">${esc(r.circuit)}</span>`:''}<h2>${esc(r.name)}</h2><p>${esc(r.city)} · ${dateLabel(r)}</p></div><div class="detail-grid"><div class="kpi"><b>${r.distance} km</b><small>Distance</small></div><div class="kpi"><b>${r.elev} m</b><small>D+</small></div><div class="kpi"><b>${matchRace(r)}%</b><small>Match saison</small></div><div class="kpi"><b>${t?t.min+' min':'—'}</b><small>Trajet estimé</small></div></div><div class="beta-note" style="margin-top:14px"><b>${r.verified==='confirmed'?'Date 2027 confirmée':r.verified==='event'?'Événement 2027 confirmé, détail à revalider':'Date 2027 à confirmer'}</b><p>${st.txt}. Les données de la bêta servent à la découverte ; vérifie toujours le site officiel avant inscription.</p></div><div class="profile-actions" style="margin-top:14px">${official}<button class="btn ${f?'secondary':'primary'}" data-follow="${r.id}">${f?'Retirer de la veille':'♡ Suivre'}</button><button class="btn ${reg?'secondary':'outline'}" data-register="${r.id}">${reg?'Inscrit ✓':'Je suis inscrit'}</button></div></div>`;
  raceDialog.showModal();
  raceDetail.querySelector('[data-close]').onclick=()=>raceDialog.close();
  raceDetail.querySelectorAll('[data-follow]').forEach(b=>b.onclick=()=>{toggleFollow(b.dataset.follow);raceDialog.close()});
  raceDetail.querySelectorAll('[data-register]').forEach(b=>b.onclick=()=>{const x=b.dataset.register;state.registered=state.registered.includes(x)?state.registered.filter(i=>i!==x):[...state.registered,x];save();renderAll();raceDialog.close();toast(state.registered.includes(x)?'Course marquée comme inscrite':'Statut inscrit retiré')});
  raceDetail.querySelectorAll('[data-official]').forEach(b=>b.onclick=()=>window.open(b.dataset.official,'_blank','noopener'));
};

state.following=(state.following||[]).filter(id=>allRaces().some(r=>r.id===id));
state.registered=(state.registered||[]).filter(id=>allRaces().some(r=>r.id===id));
save();
renderAll();
