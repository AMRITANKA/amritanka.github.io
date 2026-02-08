function toggleDark(){document.body.classList.toggle('dark');}
document.addEventListener('keyup',e=>{
if(e.target.id==='searchInput'){
document.querySelectorAll('.post-list li').forEach(li=>{
li.style.display=li.textContent.toLowerCase().includes(e.target.value.toLowerCase())?'':'none';
});
}});