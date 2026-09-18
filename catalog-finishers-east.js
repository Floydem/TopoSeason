// Run&Da — extension catalogue 2027 découverte via Finishers
// Données factuelles uniquement : noms, lieux, périodes/dates, formats, D+ lorsqu'il est publié.
// Les pages Finishers servent de source de découverte; les descriptions/images Finishers ne sont pas copiées.
(()=>{
  const add=(base,formats)=>{
    formats.forEach((f,i)=>{
      const v=Array.isArray(f)?f:[f,null,''];
      const distance=Number(v[0]), elev=v[1]==null?null:Number(v[1]), index=v[2]||'';
      const id='fin-'+base.id+'-'+String(distance).replace('.','_')+(i?'-'+i:'');
      regionalCatalog.push({
        id,name:base.name+(formats.length>1?' '+distance+'K':''),
        city:base.city,date:base.date,type:base.type,distance,elev,index,
        lat:base.lat,lon:base.lon,open:base.open||'',country:base.country,
        circuit:base.circuit||'',verified:base.verified||'estimated',
        url:base.url||'',source:'Finishers',sourceUrl:base.sourceUrl||'',
        geoPrecision:'city',img:base.img||IMG[base.type==='road'?3:0]
      });
    });
  };

  // FRANCE — Doubs / Jura proche / Territoire de Belfort
  const srcDoubs='https://www.finishers.com/fr/disciplines/trail/trails-en-france/trails-en-bourgogne-franche-comte/trails-dans-le-doubs';
  add({id:'saut-doubs',name:'Trail du Saut du Doubs',city:'Villers-le-Lac · Doubs',date:'2027-05-29',type:'trail',country:'FR',lat:47.063,lon:6.667,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-saut-du-doubs'},[8,15,25,55]);
  add({id:'rives-doubs',name:'Les Rives du Doubs',city:'Besançon · Doubs',date:'2027-03-28',type:'road',country:'FR',lat:47.238,lon:6.024,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/les-rives-du-doubs'},[5,10]);
  add({id:'vallee-baumoise',name:'Trail de la Vallée Baumoise',city:'Baume-les-Dames · Doubs',date:'2027-07-11',type:'trail',country:'FR',lat:47.352,lon:6.361,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[10,14,22,38]);
  add({id:'premiers-sapins',name:'Trail des Premiers Sapins',city:'Nods · Doubs',date:'2027-07-18',type:'trail',country:'FR',lat:47.096,lon:6.338,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[10,15,17,23]);
  add({id:'duo-vert-besancon',name:'Duo Trail Vert de Besançon',city:'Besançon · Doubs',date:'2027-09-05',type:'trail',country:'FR',lat:47.238,lon:6.024,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[17]);
  add({id:'corrida-fourg',name:'Corrida de Fourg',city:'Fourg · Doubs',date:'2027-09-12',type:'trail',country:'FR',lat:47.095,lon:5.807,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[10,20]);
  add({id:'echelles-mort',name:'Trail des Échelles de la Mort',city:'Damprichard · Doubs',date:'2027-09-19',type:'trail',country:'FR',lat:47.245,lon:6.882,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[12,23,35]);
  add({id:'insp-pirey',name:"L'ins'Pirey",city:'Pirey · Doubs',date:'2027-09-26',type:'trail',country:'FR',lat:47.261,lon:5.965,circuit:'Trail',verified:'estimated',sourceUrl:srcDoubs},[13]);

  const srcBelfort='https://www.finishers.com/ou-courir/europe/france/bourgogne-franche-comte/territoire-de-belfort';
  add({id:'10k-belfort',name:'Les 10 km de Belfort',city:'Belfort · Territoire de Belfort',date:'2027-04-15',type:'road',country:'FR',lat:47.640,lon:6.863,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/les-10-km-de-belfort'},[10]);
  add({id:'anjoutey',name:'Course Nature Anjoutey',city:'Anjoutey · Territoire de Belfort',date:'2027-09-05',type:'trail',country:'FR',lat:47.700,lon:6.931,circuit:'Trail',verified:'estimated',sourceUrl:srcBelfort},[6,14]);

  // FRANCE — Vosges / Alsace
  const srcVosges='https://www.finishers.com/disciplines/trail/trails-en-france/trails-dans-le-grand-est/trails-dans-les-vosges';
  add({id:'callunes',name:'Trail des Callunes',city:'Ban-de-Sapt · Vosges',date:'2027-02-14',type:'trail',country:'FR',lat:48.337,lon:7.014,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[12,26,33]);
  add({id:'thm-moselotte',name:'Trail Hivernal de la Moselotte',city:'Cornimont · Vosges',date:'2027-02-21',type:'trail',country:'FR',lat:47.963,lon:6.830,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[14,28,38]);
  add({id:'terroirs-vosgiens',name:'Trail des Terroirs Vosgiens',city:'Épinal · Vosges',date:'2027-03-21',type:'trail',country:'FR',lat:48.174,lon:6.450,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[11,21]);
  add({id:'pierre-percee',name:'Light on Trail Pierre-Percée',city:'Celles-sur-Plaine · Vosges',date:'2027-04-11',type:'trail',country:'FR',lat:48.456,lon:6.948,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[17,37]);
  add({id:'roches-vosges',name:'Trail des Roches',city:'Saint-Dié-des-Vosges',date:'2027-04-25',type:'trail',country:'FR',lat:48.284,lon:6.950,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[12,20,40]);
  add({id:'tumulus',name:'Trail du Tumulus',city:'Vecoux · Vosges',date:'2027-05-09',type:'trail',country:'FR',lat:47.977,lon:6.636,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[14,39]);
  add({id:'rush-bout-monde',name:'Rush du Bout du Monde',city:'Mortagne · Vosges',date:'2027-05-23',type:'trail',country:'FR',lat:48.270,lon:6.750,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[10,14,24]);
  add({id:'vallee-lacs',name:'Trail de la Vallée des Lacs',city:'Gérardmer · Vosges',date:'2027-06-20',type:'trail',country:'FR',lat:48.073,lon:6.877,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[12,33,65]);
  add({id:'trace-loups',name:'La Trace des Loups',city:'Rouvres-la-Chétive · Vosges',date:'2027-06-27',type:'trail',country:'FR',lat:48.305,lon:5.780,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[10,18]);
  add({id:'nordic-bresse',name:"Nordic' Trail La Bresse",city:'La Bresse · Vosges',date:'2027-07-11',type:'trail',country:'FR',lat:48.003,lon:6.875,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[10,20,40]);
  add({id:'avison',name:"Trail de l'Avison",city:'Laval-sur-Vologne · Vosges',date:'2027-08-15',type:'trail',country:'FR',lat:48.191,lon:6.700,circuit:'Trail',verified:'estimated',sourceUrl:srcVosges},[7,14]);
  add({id:'infernal-vosges',name:"L'Infernal Trail des Vosges",city:'Saint-Nabord · Vosges',date:'2027-09-04',type:'trail',country:'FR',lat:48.050,lon:6.580,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/linfernal-trail-des-vosges'},[8,15,30,70,100,130,200]);
  add({id:'alsace-utmb',name:'Trail Alsace Grand Est by UTMB',city:'Alsace · Bas-Rhin',date:'2027-05-15',type:'trail',country:'FR',lat:48.462,lon:7.482,circuit:'UTMB World Series',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-alsace-grand-est-utmb'},[[18,250,'20K'],[29,800,'20K'],[47,1600,'50K'],[109,3900,'100K'],[156,5100,'100M']]);
  add({id:'tour-alsace',name:'Trail de la Tour en Alsace',city:'Belmont · Bas-Rhin',date:'2027-09-15',type:'trail',country:'FR',lat:48.411,lon:7.227,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-de-la-tour-en-alsace'},[13,20.5]);

  // FRANCE — Ain / Isère / Haute-Savoie / Savoie
  const srcAin='https://www.finishers.com/disciplines/trail/trails-en-france/trails-en-auvergne-rh%C3%B4ne-alpes/trails-dans-l-ain';
  add({id:'biche',name:'Trail de la Biche',city:'Giron · Ain',date:'2027-07-11',type:'trail',country:'FR',lat:46.228,lon:5.774,circuit:'Trail',verified:'estimated',sourceUrl:srcAin},[12,26]);
  add({id:'ultra01',name:'Tiger Balm Ultra 01',city:'Oyonnax · Ain',date:'2027-07-18',type:'trail',country:'FR',lat:46.256,lon:5.656,circuit:'Trail',verified:'estimated',sourceUrl:srcAin},[13,25,45,63,98,170]);
  add({id:'grangeons',name:'La Ronde des Grangeons',city:'Ambérieu-en-Bugey · Ain',date:'2027-09-12',type:'trail',country:'FR',lat:45.959,lon:5.356,circuit:'Trail',verified:'estimated',sourceUrl:srcAin},[10,17.5,35.5]);
  add({id:'ainbattable-road',name:'Ainbattable',city:'Ceyzériat · Ain',date:'2027-09-12',type:'road',country:'FR',lat:46.181,lon:5.319,circuit:'Course nature',verified:'estimated',sourceUrl:'https://www.finishers.com/course/aibattable'},[5,10]);
  add({id:'ainbattable-trail',name:'Ainbattable',city:'Ceyzériat · Ain',date:'2027-09-12',type:'trail',country:'FR',lat:46.181,lon:5.319,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/aibattable'},[18]);
  add({id:'nuit-ajt',name:'La Nuit AJT',city:'Trévoux · Ain',date:'2027-09-19',type:'trail',country:'FR',lat:45.941,lon:4.774,circuit:'Trail',verified:'estimated',sourceUrl:srcAin},[10,21]);
  add({id:'lones',name:'Le Sentier des Lônes',city:'Balan · Ain',date:'2027-09-26',type:'trail',country:'FR',lat:45.835,lon:5.099,circuit:'Trail',verified:'estimated',sourceUrl:srcAin},[8,15]);

  add({id:'ut4m',name:'UT4M',city:'Grenoble · Isère',date:'2027-07-15',type:'trail',country:'FR',lat:45.188,lon:5.724,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/ut4m'},[17,21.5,41,47.6,81.3,96.6,176.8,184.6]);
  add({id:'tour-fiz',name:'Trail du Tour des Fiz',city:'Passy · Haute-Savoie',date:'2027-07-04',type:'trail',country:'FR',lat:45.923,lon:6.687,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-tour-des-fiz'},[14,25,34]);
  add({id:'laudon',name:'Trail du Laudon',city:'Saint-Jorioz · Haute-Savoie',date:'2027-05-02',type:'trail',country:'FR',lat:45.833,lon:6.166,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-laudon'},[11,14,26,42]);
  add({id:'aravis',name:'Aravistrail',city:'Thônes · Haute-Savoie',date:'2027-06-15',type:'trail',country:'FR',lat:45.882,lon:6.326,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/aravis-trail'},[5,11,20,28,48,65]);
  add({id:'brevon',name:'Trails de la Vallée du Brevon',city:'Bellevaux · Haute-Savoie',date:'2027-05-29',type:'trail',country:'FR',lat:46.258,lon:6.531,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-brevon'},[10,20,35,55]);
  add({id:'hauts-forts',name:'Trail des Hauts Forts',city:'Morzine · Haute-Savoie',date:'2027-08-07',type:'trail',country:'FR',lat:46.181,lon:6.706,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-des-hauts-forts-Morzine-Avoriaz'},[23,36,52]);
  add({id:'comblorane',name:'La Comblorane',city:'Combloux · Haute-Savoie',date:'2027-06-06',type:'trail',country:'FR',lat:45.895,lon:6.641,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/la-comblorane'},[[7,250,''],[15,837,''],[25,1600,''],[42,2910,'50K']]);
  add({id:'douze-passy',name:'La Douze Mont-Blanc Passy',city:'Passy · Haute-Savoie',date:'2027-05-22',type:'trail',country:'FR',lat:45.923,lon:6.687,circuit:'Trail',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/la-douze-mont-blanc-passy'},[3.5,7,11.5,18.75,26.75]);
  add({id:'saleve',name:'Trail du Salève',city:'Saint-Blaise · Haute-Savoie',date:'2027-06-15',type:'trail',country:'FR',lat:46.063,lon:6.094,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-saleve'},[17.8,24.8,37.8]);

  add({id:'bauges',name:'Trail des Bauges',city:'Le Châtelard · Savoie',date:'2027-06-27',type:'trail',country:'FR',lat:45.686,lon:6.137,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-des-bauges'},[10,21,48]);
  add({id:'rosiere',name:'Trail de la Rosière',city:'Montvalezan · Savoie',date:'2027-07-15',type:'trail',country:'FR',lat:45.612,lon:6.847,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-de-la-rosiere'},[15,22,40]);
  add({id:'val-cenis',name:'Trail EDF Val Cenis',city:'Val-Cenis · Savoie',date:'2027-07-31',type:'trail',country:'FR',lat:45.279,lon:6.904,circuit:'UTMB Index',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/trail-edf-val-cenis'},[10,15,29,43,58,73]);
  add({id:'aiguilles-arves',name:"Trail des Aiguilles d'Arves",city:'Albiez-Montrond · Savoie',date:'2027-08-15',type:'trail',country:'FR',lat:45.221,lon:6.341,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-des-aiguilles-d-arves'},[4.9,25]);
  add({id:'4-feuilles',name:'Trail à 4 Feuilles',city:'La Toussuire · Savoie',date:'2027-08-22',type:'trail',country:'FR',lat:45.255,lon:6.302,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-a-4-feuilles'},[8.9,19.2,31.5,41.1]);
  add({id:'grande-casse',name:'Trails du Tour de la Grande Casse',city:'Pralognan-la-Vanoise · Savoie',date:'2027-08-15',type:'trail',country:'FR',lat:45.381,lon:6.722,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/weekend-trails-du-tour-de-la-grande-casse'},[[3.5,600,''],21,42,66]);
  add({id:'tignes',name:'Tignes Trail',city:'Tignes · Savoie',date:'2027-08-15',type:'trail',country:'FR',lat:45.469,lon:6.907,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/tignes-trail'},[13.7,25.9,41.9]);

  // SUISSE — Romandie + grands événements alpins
  add({id:'jura-swiss',name:'Jura Swiss Trail',city:'Baulmes · Vaud',date:'2027-05-05',type:'trail',country:'CH',lat:46.791,lon:6.523,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/jura-swiss-trail'},[[11.5,773,''],[19,1310,''],[33.8,2080,''],[54.6,3210,'']]);
  add({id:'course-doubs-ch',name:'La Course du Doubs',city:'Les Brenets · Neuchâtel',date:'2027-06-15',type:'trail',country:'CH',lat:47.067,lon:6.704,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/la-course-du-doubs'},[[11,460,''],[21,846,'']]);
  add({id:'swisspeaks',name:'SwissPeaks Trail',city:'Port-Valais · Valais',date:'2027-08-29',type:'trail',country:'CH',lat:46.371,lon:6.872,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/swisspeaks-trail'},[10,21,46,72.6,101,168,397,643]);
  add({id:'running-valais',name:'Running du Valais',city:'Sion · Valais',date:'2027-07-31',type:'road',country:'CH',lat:46.233,lon:7.360,circuit:'Course sur route',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/valais-running'},[[5,14,''],[10,28,'']]);
  add({id:'wildstrubel',name:'Wildstrubel by UTMB',city:'Crans-Montana · Valais',date:'2027-09-05',type:'trail',country:'CH',lat:46.311,lon:7.481,circuit:'UTMB World Series',verified:'estimated',sourceUrl:'https://www.finishers.com/course/wildstrubel-by-utmb'},[10,26,42,55,72,113]);
  add({id:'tour-canton-geneve',name:'Tour Pédestre du Canton de Genève',city:'Genève',date:'2027-05-26',type:'road',country:'CH',lat:46.204,lon:6.143,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/tour-du-canton'},[8.9,11.5]);
  add({id:'barlatay',name:'SuperTrail du Barlatay',city:"Château-d’Œx · Vaud",date:'2027-08-15',type:'trail',country:'CH',lat:46.473,lon:7.132,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/supertrail-du-barlatay'},[15,25,50,75]);
  add({id:'nocturne-joux',name:'Trail Nocturne Vallée de Joux',city:'Le Chenit · Vaud',date:'2027-02-05',type:'trail',country:'CH',lat:46.603,lon:6.230,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/nocturne-des-loups-winter-trail-vallee-de-joux'},[[10,364,'']]);
  add({id:'fyne-terra',name:'Fyne Terra Semi-Marathon',city:'Yverdon-les-Bains · Vaud',date:'2027-05-29',type:'road',country:'CH',lat:46.779,lon:6.641,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/fyne-terra-semi-marathon'},[8.5,21.0975]);
  add({id:'muverans',name:'Défi des Muverans',city:'Ovronnaz · Valais',date:'2027-09-05',type:'trail',country:'CH',lat:46.203,lon:7.171,circuit:'Trail',verified:'estimated',sourceUrl:'https://www.finishers.com/course/defi-des-muverans'},[9,60]);

  // ITALIE DU NORD — Vallée d'Aoste / Piémont / Lombardie / Trentin / Vénétie
  const srcAosta='https://www.finishers.com/disciplines/trail/trails-en-Italie/trails-dans-la-vallee-d-aoste';
  add({id:'quatrail',name:'Quatrail des Alpages',city:"Quart · Vallée d'Aoste",date:'2027-05-29',type:'trail',country:'IT',lat:45.741,lon:7.416,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/quartrail-des-alpages'},[[26.6,2040,''],[52.4,3880,'50K']]);
  add({id:'pila-aoste',name:'RunThrough Trails Pila-Aoste',city:"Pila · Vallée d'Aoste",date:'2027-06-27',type:'trail',country:'IT',lat:45.718,lon:7.294,circuit:'Trail',verified:'estimated',sourceUrl:srcAosta},[14.5,21,50]);
  add({id:'monte-rosa-walser',name:'Monte Rosa Walserwaeg by UTMB',city:"Aoste · Vallée d'Aoste",date:'2027-07-17',type:'trail',country:'IT',lat:45.737,lon:7.320,circuit:'UTMB World Series',verified:'estimated',sourceUrl:srcAosta},[15,43,82,120]);
  add({id:'la-thuile',name:'La Thuile Trail - Memorial Edo Camardella',city:"La Thuile · Vallée d'Aoste",date:'2027-07-25',type:'trail',country:'IT',lat:45.717,lon:6.949,circuit:'UTMB Index',verified:'estimated',sourceUrl:srcAosta},[4.5,26.3,57.8]);
  add({id:'vtmb',name:'VTMB',city:"Courmayeur · Vallée d'Aoste",date:'2027-07-25',type:'trail',country:'IT',lat:45.792,lon:6.971,circuit:'Trail',verified:'estimated',sourceUrl:srcAosta},[7,11,60,61]);
  add({id:'fallere',name:"Ultramarathon du Fallère",city:"Saint-Oyen · Vallée d'Aoste",date:'2027-08-15',type:'trail',country:'IT',lat:45.823,lon:7.214,circuit:'Trail',verified:'estimated',sourceUrl:srcAosta},[39,61]);

  add({id:'garda-trentino',name:'Garda Trentino Trail',city:'Arco · Trentin-Haut-Adige',date:'2027-05-15',type:'trail',country:'IT',lat:45.918,lon:10.886,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/garda-trentino-trail'},[[11.15,557,''],[27.7,1359,'20K'],[42.14,2259,'50K'],[61.22,3641,''],[98.12,5597,'100K'],[150,8446,'100M']]);
  add({id:'madruk',name:'Madruk Trail',city:'Vittorio Veneto · Vénétie',date:'2027-05-02',type:'trail',country:'IT',lat:45.980,lon:12.300,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/madruk-trail'},[[15.6,970,''],[27,1840,'20K']]);
  add({id:'ultrabericus',name:'Ultrabericus Trail',city:'Vicence · Vénétie',date:'2027-03-15',type:'trail',country:'IT',lat:45.545,lon:11.535,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/ultrabericus-trail'},[[22,750,'20K'],[65,2500,'50K'],[100,4400,'100K']]);
  add({id:'cimbri',name:'Trail dei Cimbri',city:'Vittorio Veneto · Vénétie',date:'2027-07-04',type:'trail',country:'IT',lat:45.980,lon:12.300,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-dei-cimbri'},[[25,1700,'20K'],[53,3000,'50K']]);

  add({id:'lac-majeur',name:'Semi-Marathon du Lac Majeur',city:'Stresa · Piémont',date:'2027-03-07',type:'road',country:'IT',lat:45.884,lon:8.539,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/semi-marathon-du-lac-majeur'},[10,21.0975]);
  add({id:'trail-cro',name:'Trail du CRO - Sur la route des forts',city:'Limone Piemonte · Piémont',date:'2027-06-27',type:'trail',country:'IT',lat:44.201,lon:7.578,circuit:'UTMB Index',verified:'estimated',sourceUrl:'https://www.finishers.com/course/trail-du-cro-sur-la-route-des-forts'},[[25.7,1740,'20K'],[47.4,2980,'50K']]);
  add({id:'quadrortathon',name:'QuadrOrtaThon Marathon',city:'Gozzano · Piémont',date:'2027-06-06',type:'road',country:'IT',lat:45.748,lon:8.436,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/course/quadrortathon-marathon'},[10,21.0975,42.195]);
  add({id:'valle-intrasca',name:'Trail Valle Intrasca',city:'Verbania · Piémont',date:'2027-06-06',type:'trail',country:'IT',lat:45.921,lon:8.551,circuit:'Trail',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/trail-valle-intrasca'},[17.3,33.75]);
  add({id:'turin-semi',name:'Semi-Marathon de Turin',city:'Turin · Piémont',date:'2027-04-15',type:'road',country:'IT',lat:45.070,lon:7.687,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/disciplines/course-a-pied/semi-marathons/semi-marathons-en-italie/semi-marathons-dans-le-piemont'},[10,21.0975]);

  const srcLomb='https://www.finishers.com/disciplines/trail/trails-en-Italie/trails-en-lombardie';
  add({id:'doppiaw',name:'DoppiaW Ultra',city:'Villa di Tirano · Lombardie',date:'2027-06-20',type:'trail',country:'IT',lat:46.201,lon:10.133,circuit:'Trail',verified:'estimated',sourceUrl:srcLomb},[15,30.9,70.8,100]);
  add({id:'valmalenco',name:'Valmalenco UltraDistance Trail',city:'Chiesa in Valmalenco · Lombardie',date:'2027-07-25',type:'trail',country:'IT',lat:46.265,lon:9.848,circuit:'UTMB Index',verified:'estimated',sourceUrl:srcLomb},[35,90]);
  add({id:'kima',name:'Kima Trophy',city:'Val Masino · Lombardie',date:'2027-08-15',type:'trail',country:'IT',lat:46.215,lon:9.637,circuit:'Trail',verified:'estimated',sourceUrl:srcLomb},[6,14,27.5,52]);
  add({id:'grigne-sky',name:'Grigne Skymarathon',city:'Pasturo · Lombardie',date:'2027-09-15',type:'trail',country:'IT',lat:45.951,lon:9.444,circuit:'Trail',verified:'estimated',sourceUrl:srcLomb},[14.9,42]);
  add({id:'stramilano',name:'Stramilano',city:'Milan · Lombardie',date:'2027-03-21',type:'road',country:'IT',lat:45.464,lon:9.190,circuit:'World Athletics',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/semi-marathon-de-milan'},[5,10,21.0975]);
  add({id:'milan-marathon',name:"Wizz' Air Marathon de Milan",city:'Milan · Lombardie',date:'2027-04-04',type:'road',country:'IT',lat:45.464,lon:9.190,circuit:'World Athletics',verified:'confirmed',sourceUrl:'https://www.finishers.com/course/marathon-de-milan'},[42.195]);
  add({id:'bergamo-half',name:'Semi-Marathon de Bergame',city:'Bergame · Lombardie',date:'2027-01-24',type:'road',country:'IT',lat:45.698,lon:9.677,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/disciplines/course-a-pied/10-km/courses-de-10-km-en-italie/courses-de-10-km-en-lombardie'},[10,21.0975]);
  add({id:'brescia',name:'Brescia Art Marathon',city:'Brescia · Lombardie',date:'2027-03-14',type:'road',country:'IT',lat:45.541,lon:10.212,circuit:'Course sur route',verified:'estimated',sourceUrl:'https://www.finishers.com/disciplines/course-a-pied/10-km/courses-de-10-km-en-italie/courses-de-10-km-en-lombardie'},[10,21.0975,42.195]);
})();