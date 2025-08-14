const modules = [{"id": "zes \u2014 all necessary topi", "title": "zes \u2014 All Necessary Topics", "questions": []}, {"id": ".", "title": ".", "questions": [{"type": "tf", "q": "SPO System Training \u2014 20\u2011Question Quiz"}, {"type": "tf", "q": "Pre\u2011PO Process Training \u2014 20\u2011Question Quiz"}, {"type": "tf", "q": "Post\u2011PO Process Training \u2014 20\u2011Question Quiz"}, {"type": "tf", "q": "Payment & Reconciliation \u2014 20\u2011Question Quiz"}, {"type": "tf", "q": "Funding Guide (KDZ/COZ/LDZ) \u2014 20\u2011Question Quiz"}]}, {"id": "capital process training", "title": "Capital Process Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}, {"id": "spo system training", "title": "SPO System Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}, {"id": "pre-po process training", "title": "Pre-PO Process Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}, {"id": "post-po process training", "title": "Post-PO Process Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}, {"id": "basware training", "title": "Basware Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}, {"id": "funding & codes training", "title": "Funding & Codes Training", "questions": [{"type": "sa", "q": "Short answer placeholder."}, {"type": "mc", "q": "Multiple choice placeholder.", "opts": ["Option A", "Option B", "Option C", "Option D"], "answer": 1}, {"type": "tf", "q": "True or false placeholder.", "answer": true}]}];

const cards = document.getElementById('moduleCards'); cards.innerHTML='';
modules.forEach(m=>{
  const c = document.createElement('div'); c.className='card';
  c.innerHTML = `<h3>${m.title}</h3><p class="muted">${m.questions.length} questions</p><a class="btn primary" href="quiz/${m.id}.html">Start</a>`;
  cards.appendChild(c);
});

// Inject quiz title updater (safe fallback)
(function(){
  try{
    const titleEl = document.getElementById('quizTitle');
    if(!titleEl) return;
    function updateTitle(){
      // Try a few common variables used in this file
      var name = (window.currentQuiz && (currentQuiz.name || currentQuiz.title)) ||
                 (window.QUIZ && (QUIZ.name || QUIZ.title)) ||
                 (window.module && (module.name || module.title)) ||
                 (window.quizMeta && (quizMeta.name || quizMeta.title));
      if(!name && window.location.hash){
        // Recover from URL like #module=prepo ; prettify
        var m = decodeURIComponent(window.location.hash.replace(/^#?/,'')).match(/module=([^&]+)/);
        if(m) name = (m[1]+'').replace(/-/g,' ').replace(/\w/g, s=>s.toUpperCase()) + " Training";
      }
      if(name) titleEl.textContent = name;
    }
    updateTitle();
    setTimeout(updateTitle, 100);
    document.addEventListener('quiz:change', updateTitle);
  }catch(e){}
})();

// Add "Sent ✓" feedback on quiz submit
(function(){
  function sentTick(btn){
    if(btn){ btn.textContent = 'Sent ✓'; btn.disabled = true; }
  }
  document.addEventListener('click', function(e){
    var t = e.target;
    if(t && t.matches && t.matches('button, .btn') && /submit/i.test(t.textContent)){
      // defer to allow grading to complete
      setTimeout(function(){ sentTick(t); }, 50);
    }
  }, true);
})();


// === UI Enhancements: quiz title + Sent ✓ on submit ===
(function(){
  try{
    var titleEl = document.getElementById('quizTitle');
    if(titleEl){
      function findModuleName(){
        // 1) Try to parse visible "Module: NAME • Question" label in the question card
        var modLabel = Array.from(document.querySelectorAll('main .card')).map(n=>n.textContent||'')
          .find(t=>/Module\s*:/i.test(t));
        if(modLabel){
          var m = modLabel.match(/Module\s*:\s*([^•\n]+)/i);
          if(m) return m[1].trim();
        }
        // 2) Try URL hash/query like #module=prepo or ?module=prepo
        var src = window.location.hash + '&' + window.location.search;
        var m2 = src.match(/module=([^&]+)/i);
        if(m2){ return decodeURIComponent(m2[1]).replace(/-/g,' ').replace(/\b\w/g, s=>s.toUpperCase()) + ' Training'; }
        return null;
      }
      function updateTitle(){
        var name = findModuleName();
        if(name){ titleEl.textContent = name; }
      }
      updateTitle();
      // Observe DOM changes during quiz navigation
      var obs = new MutationObserver(()=>setTimeout(updateTitle, 50));
      obs.observe(document.body, {subtree:true, childList:true, characterData:true});
      document.addEventListener('quiz:change', updateTitle);
    }

    // Sent ✓ after submit (when results render)
    function markSentIfSubmitted(){
      var res = document.querySelector('.results, #results, .quiz-results');
      var submitBtn = Array.from(document.querySelectorAll('button,.btn')).find(b=>/submit/i.test(b.textContent||''));
      if(res && submitBtn){
        submitBtn.textContent = 'Sent ✓';
        submitBtn.disabled = true;
      }
    }
    document.addEventListener('click', function(e){
      var t = e.target;
      if(t && /submit/i.test((t.textContent||''))){
        setTimeout(markSentIfSubmitted, 150);
      }
    }, true);
  }catch(e){}
})();
