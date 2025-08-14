window.Forms = {submitQuestion:(msg)=>{fetch('/api/training-question',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,source:'search'})}).catch(()=>{}); alert('Thanks! We\'ll get back to you.');}};

// Simple fuzzy
function score(text, q){
  text = text.toLowerCase(); q = (q||'').toLowerCase();
  if(!q) return 0;
  let s = 0, i=0;
  for(const c of text){
    if(i<q.length && c===q[i]){ s+=2; i++; }
  }
  if(text.includes(q)) s+=10;
  return s;
}
const INDEX = [
  // Training topics
  {title:'Capital Training — Overview of the Season', body:'end-to-end capital process, stages, quality gates', href:'training/capital-overview.html'},
  {title:'Systems Training — SPO Vetting Workflow', body:'status flow, automations, naming standards', href:'training/spo-workflow.html'},
  {title:'Privacy & IT Implementation', body:'PIA/STRA, infra readiness, go-live conditions', href:'training/privacy-it.html'},
  {title:'Funding: KDZ/COZ, Funding Letters & Annual Grant', body:'codes, letters, PYC, reconciliation', href:'training/funding.html'},
  {title:'Procurement Basics in BC (RFP/RFQ)', body:'thresholds, methods, exceptions', href:'training/procurement.html'},
  {title:'From Funding to PO Issuance (Pre-PO)', body:'quotes, Cap Req, approvals, coding', href:'training/prepo.html'},
  {title:'Post-PO (Delivery, Install, In-Service)', body:'receiving, inspection, in-service, defects', href:'training/postpo.html'},
  {title:'Basware Invoicing & Match Exceptions', body:'routing, 3/4-way match, exceptions', href:'training/basware.html'},
  {title:'Payment & Reconciliation', body:'reconcile PO→voucher→GL, letters', href:'training/recon.html'},
  // Site
  {title:'Capital Season — Key Stages', body:'Submission, Support Services, Vendor, Checklist, Funding, Procurement', href:'capital.html'},
  {title:'Projects — Current', body:'Slocan, ROTEM, Phenotips, 3D Mammography...', href:'projects.html'},
  {title:'FAQ', body:'Thresholds, contracts, status, PYC', href:'faq.html'}
];
window.BMOsearch = {
  run(q){
    const host = document.getElementById('results'); host.innerHTML='';
    const ranked = INDEX.map(x=>({x, s: score(x.title+' '+x.body, q)})).filter(y=>y.s>0).sort((a,b)=>b.s-a.s);
    if(ranked.length===0){ host.innerHTML='<div class="item">No results. Try different keywords.</div>'; return; }
    ranked.forEach(({x})=>{
      const div = document.createElement('div'); div.className='item';
      div.innerHTML = `<div class="hit-title"><a href="${x.href}">${x.title}</a></div><div class="muted">${x.body}</div>`;
      host.appendChild(div);
    });
  }
};
(function init(){
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  document.getElementById('searchInput').value = q;
  window.BMOsearch.run(q);
})();
