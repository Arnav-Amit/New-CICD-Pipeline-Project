// script.js — combined jokes + portfolio behaviors
window.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('script.js loaded — DOM ready');

    // ----- jokes -----
    const jokes = [
      "I told my computer I needed a break, and it said: 'No problem — I'll go to sleep.'",
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "Parallel lines have so much in common. It’s a shame they’ll never meet.",
      "I would tell a UDP joke, but you might not get it.",
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
      "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.'"
    ];

    let idx = 0;
    const jokeEl = document.getElementById('joke');
    const roastBtn = document.getElementById('roastBtn');

    function showJoke() {
      idx = (idx + 1) % jokes.length;
      const text = jokes[idx];
      if(jokeEl){
        jokeEl.classList.remove('emph');
        jokeEl.textContent = text;
        setTimeout(()=> jokeEl.classList.add('emph'), 10);
        try { jokeEl.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:500,iterations:1}); } catch(e){}
      }
      spawnConfetti();
    }

    // spacebar / key handler
    window.addEventListener('keydown', (e)=>{
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if(isSpace){ e.preventDefault(); showJoke(); }
    });

    if(roastBtn){ roastBtn.addEventListener('click', ()=>{ const evt = new KeyboardEvent('keydown',{code:'Space',key:' ',bubbles:true}); window.dispatchEvent(evt); }); }

    // ----- offended toggle (kept minimal) -----
    const offendBtn = document.getElementById('offendBtn');
    if(offendBtn){
      let offended = false;
      offendBtn.addEventListener('click', ()=>{
        offended = !offended;
        if(offended){ document.body.classList.add('offended'); if(jokeEl) jokeEl.textContent = "We're sorry. Please accept this virtual cookie 🍪."; offendBtn.textContent = "Feeling better"; }
        else { document.body.classList.remove('offended'); if(jokeEl) jokeEl.textContent = "Back to joyful nonsense — press the button for more!"; offendBtn.textContent = "I'm offended"; }
      });
    }

    // ----- confetti -----
    function spawnConfetti(){
      const emojis = ['🎉','✨','😂','🍪','🤡','🚀','🌈'];
      const count = 8;
      for(let i=0;i<count;i++){
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        const size = Math.floor(Math.random()*18)+12;
        el.style.fontSize = size+'px';
        const startX = Math.random()*window.innerWidth;
        el.style.left = startX + 'px';
        el.style.top = '-30px';
        el.style.opacity = '1';
        document.body.appendChild(el);
        const duration = 1000 + Math.random()*1200;
        const endX = startX + (Math.random()*200-100);
        try {
          el.animate([
            {transform:`translate3d(0,0,0) rotate(0deg)`, opacity:1},
            {transform:`translate3d(${endX-startX}px,${window.innerHeight+50}px,0) rotate(360deg)`, opacity:0}
          ], {duration, easing:'cubic-bezier(.2,.8,.2,1)'});
        } catch(e) {}
        setTimeout(()=> el.remove(), duration+60);
      }
    }

    // ----- initial friendly hint -----
    if(jokeEl) jokeEl.textContent = 'Ready. Tip: press Space or click Roast for a quick icebreaker.';

    console.log('Giggle Factory is ready');

  } catch(err) {
    console.error('Error in script.js:', err);
  }
});

// Separate DOMContentLoaded handler for portfolio extras (keeps code modular)
document.addEventListener('DOMContentLoaded', ()=>{
  const typedEl = document.getElementById('typed');
  const hireBtn = document.getElementById('hireBtn');
  const demoArea = document.getElementById('demoArea');

  // typing intro
  const lines = [
    'Hello — I build reliable, testable web experiences.',
    'I deploy with care, debug with patience, and joke in the commit messages.'
  ];
  let lineIdx = 0;
  function typeLine(){
    if(!typedEl) return;
    typedEl.textContent = '';
    const text = lines[lineIdx++ % lines.length];
    let i = 0;
    const t = setInterval(()=>{
      typedEl.textContent += text[i++] || '';
      if(i>text.length){ clearInterval(t); setTimeout(typeLine, 1800); }
    }, 28);
  }
  typeLine();

  // Hire/Interview CTA
  if(hireBtn){
    hireBtn.addEventListener('click', ()=>{
      if(!demoArea) return alert('Open DevTools -> Console to see details or enable demoArea.');
      demoArea.innerHTML = `\
        <strong>Interview checklist</strong>\
        <ol>\
          <li>Describe a recent problem and your approach (5-10 min).</li>\
          <li>Walk through a small code example (share screen or paste).</li>\
          <li>Show a deployed demo or repo link.</li>\
        </ol>\
        <p style="margin:0.4rem 0">Tip: ask for one tiny extension — great for live pairing.</p>\
      `;
+      demoArea.scrollIntoView({behavior:'smooth'});
    });
  }

  // project demo buttons
  document.querySelectorAll('[data-demo]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const which = btn.getAttribute('data-demo');
      if(!demoArea) return;
      if(which === 'cli'){
        demoArea.textContent = '';
        let i=0;
        const script = ['> initializing...', '> checking coffee status', '> jokes loaded: 7', '> hello, interviewer!'];
        const iv = setInterval(()=>{
          demoArea.textContent += script[i++] + '\n';
          demoArea.scrollTop = demoArea.scrollHeight;
          if(i>=script.length) clearInterval(iv);
        }, 450);
      } else if(which === 'dash'){
        demoArea.innerHTML = '<div style="display:flex;gap:10px;align-items:center"><div><strong>Uptime:</strong> 99.99%</div><div><strong>Jokes/min:</strong> 0.42</div></div>';
      }
    });
  });
});
