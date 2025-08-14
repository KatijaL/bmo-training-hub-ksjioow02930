
(function(){
  const quickData = [
    {q:'Is infusion pump the same as IV pump?', a:'Yes—“infusion pump” is the general term and “IV pump” specifies the intravenous route.'},
    {q:'Is a crash cart the same as a code cart?', a:'Yes—both terms refer to the emergency resuscitation cart.'},
    {q:'What does ACU mean?', a:'Often “Acute Care Unit,” sometimes “Ambulatory Care Unit”—confirm locally.'},
    {q:'When is an RFP required?', a:'At or above competitive thresholds and when best‑value applies.'},
    {q:'What does “not on contract” mean?', a:'No active agreement; compete or justify exemption.'},
    {q:'Where can I see project status?', a:'SPO → Grand View; PO in PeopleSoft; invoices in Basware.'},
    {q:'What is Prior‑Year Contingency?', a:'Unspent Annual Grant carried forward for AG‑aligned needs.'},
    {q:'Do trials require extra steps?', a:'Yes—licensing, loan agreement, Biomed intake, IPAC/MDRD, Privacy/IT.'}
  ];
  let i = 0;
  const panel = document.getElementById('qPanel');
  const meter = document.getElementById('qMeter');
  const render = () => { if(!panel||!meter) return; panel.innerHTML = `<strong>${quickData[i].q}</strong><p>${quickData[i].a}</p>`; meter.textContent = (i+1)+'/'+quickData.length; };
  const prev = document.getElementById('qPrev'), next = document.getElementById('qNext');
  if(prev && next){ prev.addEventListener('click', ()=>{ i=(i-1+quickData.length)%quickData.length; render(); });
                    next.addEventListener('click', ()=>{ i=(i+1)%quickData.length; render(); });
                    render(); }
})();
