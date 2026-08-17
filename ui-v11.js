// UI bindings
$('#tree').onclick=e=>{let r=e.target.closest('.treeRow');if(!r)return;if(r.dataset.piece){if(state.scope!=='piece')setScope('piece');selectPiece(r.dataset.cab,r.dataset.piece)}else{if(state.scope!=='cabinet')setScope('cabinet');selectCab(r.dataset.cab)}};
$('#scopeSeg').onclick=e=>{let b=e.target.closest('button');if(b)setScope(b.dataset.scope)};
$$('[data-tool]').forEach(b=>b.onclick=()=>setTool(b.dataset.tool));
$('#fitBtn').onclick=fit;$('#frontBtn').onclick=front;$('#isoBtn').onclick=iso;
$('#undoBtn').onclick=undo;$('#redoBtn').onclick=redo;$('#saveBtn').onclick=exportProject;
$('#openBtn').onclick=()=>$('#fileInput').click();
$('#fileInput').onchange=e=>{if(e.target.files[0])importProject(e.target.files[0]);e.target.value=''};
$('#newBtn').onclick=()=>showModal('#newModal');$('#addCabBtn').onclick=()=>showModal('#cabModal');
$('#confirmNew').onclick=()=>{newProject($('#newProjectName').value);hideModals()};
$('#confirmCab').onclick=()=>{addCab();hideModals()};
$$('[data-close]').forEach(b=>b.onclick=hideModals);
$$('.modalBack').forEach(m=>m.onclick=e=>{if(e.target===m)hideModals()});
$('#renderMode').onchange=e=>{state.render=e.target.value;draw()};
$('#propTabs').onclick=e=>{let b=e.target.closest('button');if(!b)return;state.prop=b.dataset.prop;syncPropTabs();refreshProps()};
$('#mainTabs').onclick=e=>{let b=e.target.closest('.tab');if(!b)return;$$('.tab').forEach(x=>x.classList.toggle('active',x===b));toast(b.textContent+' · modul curat v11')};
window.addEventListener('keydown',e=>{if(e.target.matches('input,select'))return;if(e.ctrlKey&&e.key.toLowerCase()==='z'){e.preventDefault();undo()}else if(e.ctrlKey&&e.key.toLowerCase()==='y'){e.preventDefault();redo()}else if(e.key.toLowerCase()==='q')setTool('select');else if(e.key.toLowerCase()==='w')setTool('move');else if(e.key.toLowerCase()==='e')setTool('rotate');else if(e.key.toLowerCase()==='m')setTool('measure');else if(e.key.toLowerCase()==='f')fit();else if(e.key==='1')front();else if(e.key==='2')iso()});
window.addEventListener('resize',draw);
loadLocal();state.selectedCab=state.project.cabinets[0]?.id||null;state.selectedPiece=state.project.cabinets[0]?.pieces[0]?.id||null;initGL();renderTree();syncHeader();syncPropTabs();refreshProps();setTool('select');setTimeout(()=>{fit();draw()},50);
