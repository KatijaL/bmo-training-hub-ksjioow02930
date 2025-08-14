
window.SeeMore = {
  toggleCard(el){
    const card = el.closest('.card');
    const isOpen = card.classList.toggle('expanded');
    el.textContent = isOpen ? 'See less ▴' : 'See more ▾';
    return false;
  }
};

// Quick Q&A carousel (home)
(function(){
  const qa = [
    {q:'Is an infusion pump the same as an IV pump?', a:'Yes—“infusion pump” is the general term and “IV pump” specifies the intravenous route.'},
    {q:'Is a crash cart the same as a code cart?', a:'Yes—both terms refer to the emergency resuscitation cart.'},
    {q:'What does ACU mean?', a:'Often “Acute Care Unit,” sometimes “Ambulatory Care Unit”—confirm locally.'},
    {q:'When is an RFP required?', a:'At or above competitive thresholds and when best-value evaluation applies.'},
    {q:'What does “not on contract” mean?', a:'No active agreement; compete or justify exemption.'},
    {q:'Where can I see project status?', a:'SPO → Grand View; PO in PeopleSoft; invoices in Basware.'},
    {q:'What is Prior-Year Contingency?', a:'Unspent Annual Grant carried forward for AG-aligned needs.'},
    {q:'Do trials require extra steps?', a:'Yes—licensing, loan agreement, Biomed intake, IPAC/MDRD, Privacy/IT.'}
  ];
  let i=0;
  const qn = document.getElementById('qaQuestion');
  const meter = document.getElementById('qaMeter');
  function render(){ qn.innerHTML = `<strong>${qa[i].q}</strong><p>${qa[i].a}</p>`; meter.textContent = (i+1)+"/"+qa.length; }
  document.getElementById('qaPrev').addEventListener('click', ()=>{ i=(i-1+qa.length)%qa.length; render(); });
  document.getElementById('qaNext').addEventListener('click', ()=>{ i=(i+1)%qa.length; render(); });
  render();
})();