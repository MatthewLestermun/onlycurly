// Меню на телефоне
const nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', function () {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { nav.classList.remove('open'); });
});

// Ползунок «до и после»
const box = document.getElementById('ba');
const range = document.getElementById('ba-range');
function setPos() { box.style.setProperty('--pos', range.value + '%'); }
range.addEventListener('input', setPos);
setPos();
