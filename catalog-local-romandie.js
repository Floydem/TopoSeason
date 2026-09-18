// Run&Da — maillage ultra-local Neuchâtel / Jura suisse / Vaud / Fribourg / Bienne
// Sources: organisateurs officiels, Finishers, Swiss Running, Running.life, HDsports.
// Dates marquées "estimated" restent à confirmer avant inscription.
(()=>{
  const add=(base,formats)=>{
    formats.forEach((f,i)=>{
      const v=Array.isArray(f)?f:[f,null,''];
      const distance=Number(v[0]), elev=v[1]==null?null:Number(v[1]), index=v[2]||'';
      regionalCatalog.push({
        id:'local-'+base.id+'-'+String(distance).replace('.','_')+(i?'-'+i:''),
        name:base.name+(formats.length>1?' '+distance+'K':''),
        city:base.city,date:base.date,type:base.type,distance,elev,index,
        lat:base.lat,lon:base.lon,open:base.open||'',country:'CH',
        circuit:base.circuit||'Course locale',verified:base.verified||'estimated',
        url:base.url||'',source:base.source||'Calendrier régional',sourceUrl:base.sourceUrl||'',
        geoPrecision:'city',img:base.img||IMG[base.type==='road'?3:0]
      });
    });
  };

  // Canton de Neuchâtel
  add({
    id:'cep-cortaillod',name:'Semi du CEP Cortaillod',city:'Colombier / Cortaillod · Neuchâtel',
    date:'2027-03-14',type:'road',lat:46.966,lon:6.862,open:'2026-10-01',
    circuit:'Course sur route',verified:'confirmed',url:'https://semiducep.ch/',
    source:'Site officiel',sourceUrl:'https://semiducep.ch/'
  },[[10,null,''],[21.0975,null,'']]);

  add({
    id:'5k-charity',name:'5K Charity Race',city:'Le Landeron · Neuchâtel',
    date:'2027-02-14',type:'road',lat:47.050,lon:7.067,
    circuit:'Course solidaire',verified:'event',url:'https://www.5kcharityrace.ch/',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/5k-charity-race'
  },[5]);

  add({
    id:'bcn-tour',name:'BCN Tour 2027',city:'Canton de Neuchâtel · 6 étapes du 21 avr. au 26 mai',
    date:'2027-04-21',type:'road',lat:46.990,lon:6.930,
    circuit:'6 étapes de 10 km',verified:'confirmed',url:'https://bcn-tour.ch/',
    source:'Site officiel',sourceUrl:'https://bcn-tour.ch/'
  },[10]);

  add({
    id:'vignoble-jan',name:'Coupe du Vignoble · manche janvier',city:'Cortaillod · Neuchâtel',
    date:'2027-01-10',type:'road',lat:46.944,lon:6.846,
    circuit:'Coupe du Vignoble',verified:'estimated',url:'https://cepcortaillod.ch/coupe-du-vignoble/',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[[8.2,70,'']]);

  add({
    id:'vignoble-fev',name:'Coupe du Vignoble · finale',city:'Cortaillod · Neuchâtel',
    date:'2027-02-06',type:'road',lat:46.944,lon:6.846,
    circuit:'Coupe du Vignoble',verified:'estimated',url:'https://cepcortaillod.ch/coupe-du-vignoble/',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[[8.2,70,'']]);

  add({
    id:'tablettes',name:'Trophée des Rochers de Tablettes',city:'Rochefort · Neuchâtel',
    date:'2027-07-10',type:'trail',lat:46.977,lon:6.810,
    circuit:'Championnat Neuchâtel région',verified:'estimated',url:'https://www.tropheetablettes.ch/',
    source:'Swiss Running / calendrier régional',sourceUrl:'https://guide.swiss-running.ch/fr/events/5436'
  },[[16.4,818,'']]);

  add({
    id:'wake-up-ne',name:'Wake Up and Run Neuchâtel',city:'Neuchâtel',
    date:'2027-05-28',type:'road',lat:46.990,lon:6.929,
    circuit:'Course locale',verified:'estimated',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[5.4]);

  add({
    id:'vendangeuse',name:'La Vendangeuse',city:'Auvernier · Neuchâtel',
    date:'2027-09-04',type:'road',lat:46.976,lon:6.878,
    circuit:'Course locale',verified:'estimated',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[10]);

  add({
    id:'swiss-womens-trail',name:"Swiss Women's Trail",city:'Couvet · Val-de-Travers',
    date:'2027-09-11',type:'trail',lat:46.925,lon:6.634,
    circuit:'Trail',verified:'estimated',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[19,38]);

  add({
    id:'verticale-hauterive',name:'Verticale Hauterive',city:'Hauterive · Neuchâtel',
    date:'2027-11-07',type:'trail',lat:47.015,lon:6.971,
    circuit:'Course verticale',verified:'estimated',
    source:'Calendrier régional',sourceUrl:'https://www.hdsports.de/running/neuchatel-calendrier-courses'
  },[[3.8,659,'']]);

  add({
    id:'trotteuse',name:'La Trotteuse-Tissot',city:'La Chaux-de-Fonds · Neuchâtel',
    date:'2027-12-11',type:'road',lat:47.103,lon:6.832,
    circuit:'Championnat Neuchâtel région',verified:'estimated',url:'https://www.latrotteusetissot.ch/',
    source:'Swiss Running / calendrier régional',sourceUrl:'https://guide.swiss-running.ch/fr/events/5726'
  },[[6.8,60,'']]);

  // Bienne / Jura bernois / Jura
  add({
    id:'cross-tilleuls',name:'Cross des Tilleuls',city:'Bienne · Berne',
    date:'2027-03-13',type:'trail',lat:47.137,lon:7.247,
    circuit:'Cross',verified:'confirmed',url:'https://www.ccnidau.ch/new-new-cross-des-tilleul',
    source:'Site officiel',sourceUrl:'https://www.ccnidau.ch/new-new-cross-des-tilleul'
  },[[5,null,''],[10.7,170,'']]);

  add({
    id:'bieler',name:'Bieler Lauftage · Courses de Bienne',city:'Bienne · Berne',
    date:'2027-06-11',type:'road',lat:47.137,lon:7.247,open:'2026-11-01',
    circuit:'Courses de Bienne',verified:'confirmed',url:'https://100km.ch/fr/',
    source:'Site officiel',sourceUrl:'https://100km.ch/fr/'
  },[10,21.0975,100]);

  add({
    id:'mont-terrible-road',name:'Les Courses du Mont-Terrible',city:'Porrentruy · Jura',
    date:'2027-04-17',type:'road',lat:47.417,lon:7.075,
    circuit:'Mont-Terrible',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/les-courses-du-mont-terrible'
  },[[5,133,''],[9,290,''],[15,540,''],[23,850,'']]);

  add({
    id:'mont-terrible-trail',name:'Les Courses du Mont-Terrible',city:'Porrentruy · Jura',
    date:'2027-04-17',type:'trail',lat:47.417,lon:7.075,
    circuit:'Mont-Terrible',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/les-courses-du-mont-terrible'
  },[[36,1360,''],[50,2490,''],[70,3630,''],[106,4990,'']]);

  add({
    id:'bruntrutaine',name:'La Bruntrutaine BCJ',city:'Porrentruy · Jura',
    date:'2027-02-27',type:'road',lat:47.417,lon:7.075,
    circuit:'Corrida',verified:'event',
    source:'Calendrier régional',sourceUrl:'https://running.life/calendrier-course-a-pied/suisse/jura/les-breuleux?page=2'
  },[5,8]);

  add({
    id:'popup-moutier',name:"Pop'Up Run",city:'Moutier · Jura bernois',
    date:'2027-05-01',type:'trail',lat:47.278,lon:7.370,
    circuit:'Course locale',verified:'event',
    source:'Calendrier régional',sourceUrl:'https://running.life/calendrier-course-a-pied/suisse/jura/les-breuleux?page=2'
  },[3,10]);

  add({
    id:'moutier-graitery',name:'Moutier-Graitery',city:'Moutier · Jura bernois',
    date:'2027-06-19',type:'trail',lat:47.278,lon:7.370,
    circuit:'Course de montagne',verified:'event',
    source:'Calendrier régional',sourceUrl:'https://running.life/calendrier-course-a-pied/suisse/jura/les-breuleux?page=2'
  },[5,10]);

  // Vaud / Broye proches
  add({
    id:'payerne',name:'10 km de Payerne',city:'Payerne · Vaud',
    date:'2027-03-07',type:'road',lat:46.821,lon:6.939,
    circuit:'Course sur route',verified:'confirmed',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/10-km-de-payerne'
  },[[5,null,''],[10,28,'']]);

  add({
    id:'urban-lausanne',name:'Urban Trail Lausanne',city:'Lausanne · Vaud',
    date:'2027-03-14',type:'trail',lat:46.520,lon:6.633,
    circuit:'Urban Trail',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/urban-trail-lausanne'
  },[[10,200,''],[19,500,''],[31,900,'']]);

  add({
    id:'cotes-orbe',name:"Semi-marathon des Côtes de l'Orbe",city:'Orbe · Vaud',
    date:'2027-09-05',type:'road',lat:46.725,lon:6.532,
    circuit:'Course sur route',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/semi-marathon-des-cotes-de-l-orbe'
  },[11,21.0975]);

  // Fribourg
  add({
    id:'burgerwald',name:'Burgerwald Survival Trail',city:'Le Mouret · Fribourg',
    date:'2027-02-28',type:'trail',lat:46.748,lon:7.169,
    circuit:'Backyard / survival trail',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/burgerwald-survival-trail'
  },[[7,500,'']]);

  add({
    id:'gruyere-charmey',name:'Gruyère Trail Charmey',city:'Charmey · Fribourg',
    date:'2027-07-17',type:'trail',lat:46.619,lon:7.164,
    circuit:'UTMB Index',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/gruyere-trail-charmey-gtc'
  },[[11,800,''],[24,1500,'20K'],[54,3800,'50K']]);

  add({
    id:'dent-broc',name:'Trail de la Dent de Broc',city:'Broc · Fribourg',
    date:'2027-08-29',type:'trail',lat:46.605,lon:7.099,
    circuit:'Trail',verified:'estimated',
    source:'Finishers',sourceUrl:'https://www.finishers.com/course/trail-de-la-dent-de-broc'
  },[[14,600,''],[23.5,1540,'']]);
})();