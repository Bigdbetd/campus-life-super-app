// Basic JS for campus-life-super-app
document.addEventListener('DOMContentLoaded',()=>{
  // small helper to toggle mobile nav (if added later)
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click',()=>nav.classList.toggle('open'))
  }
  console.log('campus-life script loaded')
})
