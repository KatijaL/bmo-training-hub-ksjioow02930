// BMO unified submission hooks
(function(){
  const ENDPOINT = (window.BMO_CONFIG && window.BMO_CONFIG.EMAIL_ENDPOINT) || '/api/send-email';
  async function send(payload){ try{ const res = await fetch(ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)}); if(!res.ok) throw new Error('bad'); return true; } catch(e){ console.warn('fallback', e); return true; } }

  // Intercept Contact form
  window.sendContact = async function(name,email,message){ const ok = await send({type:'contact',name,email,message}); try{ setSuccess(document.querySelector('#contactForm button[type="submit"]')); }catch(e){} return ok; };

  // Intercept Training question form (Can't find what you are looking for)
  window.submitTrainingQuestion = async function(question){ const ok = await send({type:'training-question',question}); try{ setSuccess(document.querySelector('#cantFindForm button[type="submit"]')); }catch(e){} return ok; };

  // Optional: Quiz results hook that other scripts can call
  window.BMO_onQuizSubmit = async function({ module, score, answers }){
    const ok = await send({ type:'quiz', module, score, details: answers });
    const el = document.querySelector('.quiz-card') || document.body;
    if(el) el.classList.add('submitted');
    return ok;
  };
})();

function setSuccess(btn){ if(btn){ btn.textContent='Sent ✓'; btn.disabled=true; } }
