
const STAGES = [
  {k:'submission', t:'Request Submission', body:`
    <p>Submit requests in SPO before Sept 30. Include NURE, clinical need, urgency, and any known operating impacts.</p>
    <ul>
      <li>Attach current quotes/specs; use CWBMO naming on uploads.</li>
      <li>Timeline context: planning cadence runs roughly Sept 30 → Mar (+2).</li>
    </ul>`},
  {k:'vendor', t:'Vendor Engagement', body:`
    <p>Gather a complete vendor package: brochure/specs, quotes, warranty/PM, training, installation scope, lead times, and trade‑in options.</p>
    <ul><li>Confirm Health Canada licensing where applicable.</li><li>Align with hospital standards.</li></ul>`},
  {k:'services', t:'Support Services Engagement', body:`
    <p>Route to the seven services as applicable: Biomed, FMO, IPAC, MDRD, PDHIS/Clinical Informatics, etc. Track outcome notes and conditions in SPO.</p>
    <ul><li>Feasibility (power, space, network) and safety (cleanability) validated.</li><li>Document CEP readiness requirements.</li></ul>`},
  {k:'prior', t:'Approval & Prioritization', body:`
    <p>Run CEP with divisions/leadership; finalize scope, priorities, and endorsements. Refresh quotes and update the Season Planner.</p>`},
  {k:'funding', t:'Funding Submission & Approval', body:`
    <p>Prepare submissions to Foundations/AG/MoH/RCI. Notional ≈ Jan; releases ≈ Apr.</p>
    <ul><li>File funding letters; map letters to projects and GL in SPO.</li></ul>`}
];
function renderStages(){
  const chips = document.getElementById('chips');
  const panels = document.getElementById('stagePanels');
  STAGES.forEach((s,idx)=>{
    const c = document.createElement('button'); c.className='stage-chip'; c.textContent = s.t;
    c.addEventListener('click', ()=> activate(idx));
    chips.appendChild(c);
    const p = document.createElement('section'); p.className='card stage-panel'; p.id='p_'+s.k; p.innerHTML = `<h2>${s.t}</h2><div>${s.body}</div>`;
    panels.appendChild(p);
  });
  activate(0);
}
function activate(i){
  document.querySelectorAll('.stage-chip').forEach((el,idx)=> el.classList.toggle('active', idx===i));
  document.querySelectorAll('.stage-panel').forEach((el,idx)=> el.classList.toggle('active', idx===i));
}
renderStages();
