// TopoSeason pack pre-test loader
['pretest-a.css','pretest-b.css'].forEach(href=>{const l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l)});
['pretest-base.js','pretest-views.js','pretest-final.js'].forEach(src=>{const s=document.createElement('script');s.src=src;s.async=false;document.body.appendChild(s)});
