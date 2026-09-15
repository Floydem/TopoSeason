// TopoSeason — recherche par objectif et alternatives classées
let goalFocus=null;

function goalKind(g){return /trail/i.test(g.type||'')?'trail':'road'}
function targetDay(g){return g.window==='early'?7:g.window==='late'?24:g.window==='mid'?15:15}
function windowFits(r,g){
  const d=new Date(r.date+'T12:00:00');
  if(d.getMonth()!==+g.month)return false;
  if(g.window==='early')return d.getDate()<=10;
  if(g.window==='mid')return d.getDate()>=11&&d.getDate()<=20;
  if(g.window==='late')return d.getDate()>=21;
  return true;
}
function daysFromGoal(r,g){
  const rd=new Date(r.date+'T12:00:00');
  const td=new Date(state.year,+g.month,targetDay(g),12,0,0);
  return Math.abs(Math.round((rd-td)/86400000));
}
function goalScoreDetail(r,g){
  const d=new Date(r.date+'T12:00:00');
  const dayGap=daysFromGoal(r,g);
  const sameMonth=d.getMonth()===+g.month;
  let dateScore=dayGap<=7?35:dayGap<=21?30:dayGap<=45?23:dayGap<=75?15:dayGap<=120?8:Math.max(0,5-Math.floor((dayGap-120)/45));
  if(sameMonth&&windowFits(r,g))dateScore=Math.max(dateScore,35);
  else if(sameMonth)dateScore=Math.max(dateScore,29);

  const min=+g.min,max=+g.max;
  const distExact=r.distance>=min&&r.distance<=max;
  const distGap=distExact?0:r.distance<min?min-r.distance:r.distance-max;
  const span=Math.max(5,max-min);
  const distScore=distExact?30:Math.max(0,30-(distGap*(18/span)+distGap*.65));

  const typeExact=r.type===goalKind(g);
  const typeScore=typeExact?20:4;

  const t=travel(r);
  let travelScore=5,travelExact=true;
  if(t){
    travelExact=t.min<=+g.travel;
    const over=Math.max(0,t.min-(+g.travel||90));
    travelScore=travelExact?10:Math.max(0,10-over/12);
  }

  let indexScore=5,indexExact=true;
  if(g.index==='required'){
    indexExact=!!(r.index||/UTMB Index|UTMB World Series/i.test(r.circuit||''));
    indexScore=indexExact?5:-15;
  }else if(g.index==='prefer'){
    indexScore=(r.index||/UTMB Index|UTMB World Series/i.test(r.circuit||''))?5:2;
  }

  const score=Math.max(1,Math.min(100,Math.round(dateScore+distScore+typeScore+travelScore+indexScore)));
  const exact=sameMonth&&windowFits(r,g)&&distExact&&typeExact&&travelExact&&indexExact;
  const notes=[];
  if(sameMonth)notes.push('bonne période');
  else {
    const months=Math.max(1,Math.round(dayGap/30));
    notes.push(`${months} mois d’écart env.`);
  }
  if(distExact)notes.push('distance ciblée');
  else notes.push(`${Math.round(distGap*10)/10} km hors plage`);
  if(!typeExact)notes.push(r.type==='trail'?'trail au lieu de route':'route au lieu de trail');
  if(t&&!travelExact)notes.push(`${t.min-(+g.travel||90)} min au-delà du trajet`);
  if(g.index==='required'&&!indexExact)notes.push('sans Index');
  return {score,exact,notes,t,dayGap,distGap,typeExact,travelExact,indexExact,sameMonth};
}
function goalSummary(g){
  const month=MONTHS[+g.month]||'';
  const range=+g.min===+g.max?`${g.min} km`:`${g.min}–${g.max} km`;
  const when=g.window==='early'?'début':g.window==='mid'?'mi-mois':g.window==='late'?'fin':'tout le mois';
  return `${g.type} · ${range} · ${month} ${state.year} (${when}) · ≤ ${g.travel} min`;
}
function ensureGoalPanel(){
  let p=document.querySelector('#goalMatchPanel');
  if(!p){p=document.createElement('div');p.id='goalMatchPanel';p.className='goal-match-panel';const list=document.querySelector('#raceList');list?.insertAdjacentElement('beforebegin',p)}
  return p;
}
function setGoalFocus(g,openExplorer=true){
  goalFocus=g?{...g}:null;
  if(!goalFocus)return;
  filter='all';
  const search=document.querySelector('#searchInput');if(search)search.value='';
  document.querySelectorAll('#chips .chip').forEach(c=>c.classList.toggle('active',c.dataset.filter==='all'));
  if(openExplorer)go('explore'); else renderExplore();
}
function clearGoalFocus(){goalFocus=null;const p=document.querySelector('#goalMatchPanel');if(p)p.innerHTML='';renderExplore()}
function focusCard(r,detail,rank){
  const t=detail.t,s=detail.score,f=state.following.includes(r.id),p=placeFamily(r);
  const label=detail.exact?'Correspondance exacte':s>=80?'Très bonne alternative':s>=65?'Alternative cohérente':'Alternative élargie';
  return `<article class="list-card pretest-list goal-result ${detail.exact?'exact':''}" data-race="${r.id}"><div class="thumb" style="background-image:url('${raceImage(r)}')"><span>${p.label}</span></div><div class="list-main"><div class="status-group mini-badges"><span class="badge goal-rank">#${rank}</span><span class="badge ${detail.exact?'open':s>=80?'index':''}">${label}</span>${reliabilityBadge(r)}${nearBadge(r)}</div><div class="small muted">${dateLabel(r)} · ${countryLabel(r)}</div><h3>${esc(r.name)}</h3><div class="sub">${esc(cleanCity(r))}${compactCircuit(r)?' · '+esc(compactCircuit(r)):''}</div><div class="metrics"><span>${r.distance} km</span><span>${r.elev} D+</span><span>${t?t.min+' min':'Position ?'}</span><span class="score">${s}%</span></div><div class="goal-reasons">${detail.notes.map(n=>`<span>${esc(n)}</span>`).join('')}</div></div><button class="heart ${f?'on':''}" data-follow="${r.id}">${f?'♥':'♡'}</button></article>`
}

const _renderExploreGoalFallback=renderExplore;
renderExplore=function(){
  if(!goalFocus){const p=ensureGoalPanel();p.innerHTML='';return _renderExploreGoalFallback()}
  const q=(document.querySelector('#searchInput')?.value||'').toLowerCase().trim();
  let rs=allRaces().filter(r=>!q||(`${r.name} ${r.city} ${r.country||''} ${r.circuit||''} ${r.distance}`).toLowerCase().includes(q));
  if(filter==='trail')rs=rs.filter(r=>r.type==='trail');
  if(filter==='road')rs=rs.filter(r=>r.type==='road');
  if(filter==='index')rs=rs.filter(r=>r.index||/UTMB Index/i.test(r.circuit||''));
  if(filter==='near')rs=rs.filter(r=>{const t=travel(r);return t&&t.min<=state.profile.maxTravel});
  if(filter==='france')rs=rs.filter(r=>r.country==='FR');
  if(filter==='swiss')rs=rs.filter(r=>r.country==='CH');
  if(filter==='italy')rs=rs.filter(r=>r.country==='IT');
  if(filter==='utmbws')rs=rs.filter(r=>/UTMB World Series/i.test(r.circuit||''));
  if(filter==='torx')rs=rs.filter(r=>/TORX/i.test(r.circuit||''));
  const ranked=rs.map(r=>({r,d:goalScoreDetail(r,goalFocus)})).sort((a,b)=>b.d.score-a.d.score||a.d.dayGap-b.d.dayGap);
  const exact=ranked.filter(x=>x.d.exact);
  const p=ensureGoalPanel();
  p.innerHTML=`<div class="goal-match-head"><div><span class="eyebrow">Recherche ciblée</span><h2>${exact.length?`${exact.length} course${exact.length>1?'s':''} très proche${exact.length>1?'s':''}`:'Pas de match exact, voici les meilleures alternatives'}</h2><p>${esc(goalSummary(goalFocus))}</p></div><div class="goal-match-actions">${goalFocus.id?`<button class="btn secondary" data-edit-focus="${goalFocus.id}">Modifier</button>`:''}<button class="btn outline" data-clear-goal>Voir tout le catalogue</button></div></div><div class="goal-match-legend"><span><b>90–100%</b> très proche</span><span><b>75–89%</b> bonne alternative</span><span><b>&lt;75%</b> recherche élargie</span></div>`;
  const count=document.querySelector('#catalogCount');if(count)count.textContent=`${ranked.length} proposition${ranked.length>1?'s':''} classée${ranked.length>1?'s':''} pour cet objectif`;
  document.querySelector('#raceList').innerHTML=ranked.length?ranked.slice(0,24).map((x,i)=>focusCard(x.r,x.d,i+1)).join(''):'<div class="empty">Aucune course disponible avec ces filtres. Retire un filtre pour élargir la recherche.</div>';
};

let pendingGoalDraft=null;
const gf=document.querySelector('#goalForm');
if(gf){
  const submit=gf.querySelector('button[type="submit"]');if(submit)submit.textContent='Enregistrer et trouver des courses';
  gf.addEventListener('submit',()=>{
    pendingGoalDraft={id:document.querySelector('#goalId')?.value||'',type:document.querySelector('#goalType')?.value||'Trail',month:+document.querySelector('#goalMonth')?.value,min:+document.querySelector('#goalMin')?.value,max:+document.querySelector('#goalMax')?.value,window:document.querySelector('#goalWindow')?.value||'month',travel:+document.querySelector('#goalTravel')?.value||90,index:document.querySelector('#goalIndex')?.value||'any',priority:document.querySelector('#goalPriority')?.value||'normal'};
    setTimeout(()=>{
      if(!pendingGoalDraft)return;
      const d=pendingGoalDraft;
      const saved=d.id?state.goals.find(x=>x.id===d.id):[...state.goals].reverse().find(x=>+x.month===+d.month&&x.type===d.type&&+x.min===+d.min&&+x.max===+d.max&&x.window===d.window);
      setGoalFocus(saved||d,true);pendingGoalDraft=null;
      toast('Objectif enregistré · courses classées par pertinence');
    },0);
  },true);
}

document.addEventListener('click',e=>{
  const clear=e.target.closest('[data-clear-goal]');if(clear){e.preventDefault();clearGoalFocus();return}
  const edit=e.target.closest('[data-edit-focus]');if(edit){e.preventDefault();openGoal(edit.dataset.editFocus);return}
  const heroFind=e.target.closest('#hero [data-go="explore"]');if(heroFind){const g=mainGoal();if(g)goalFocus={...g}}
},true);
