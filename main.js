// =====================================================
// main.js — тест «Какой у меня тип кудрей?»
// =====================================================

const $ = (s) => document.querySelector(s);
const DIKIDI = 'https://dikidi.app/onlycurly';

// ---------- Окно ----------
const quiz = $('#quiz');
function openModal() { quiz.classList.add('open'); quiz.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal() { quiz.classList.remove('open'); quiz.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
quiz.addEventListener('click', (e) => { if (e.target === quiz || e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ---------- Вопросы: каждый ответ даёт балл одному типу ----------
const QUESTIONS = [
  { q: 'Как выглядят волосы, если высушить их без фена и укладки?', opts: [
    ['Лёгкие волны, местами почти прямые', 'буква S, у корней прямые', 'wavy'],
    ['Упругие спирали размером с палец', 'чёткие локоны по всей длине', 'curly'],
    ['Мелкие плотные завитки', 'пружинки размером с карандаш', 'coily']
  ] },
  { q: 'Что больше всего беспокоит?', opts: [
    ['Волосы быстро распрямляются', 'объём держится полдня', 'wavy'],
    ['Пушатся и путаются', 'особенно во влажную погоду', 'curly'],
    ['Сухость и ломкость', 'волосы как будто «пьют» любой уход', 'coily']
  ] },
  { q: 'Как волосы реагируют на расчёску?', opts: [
    ['Почти не меняются', 'просто становятся пышнее', 'wavy'],
    ['Превращаются в облако', 'локоны пропадают', 'curly'],
    ['Расчёсываю только мокрыми и с кондиционером', 'иначе больно', 'coily']
  ] }
];

const RESULTS = {
  wavy: { title: 'Волнистые', img: 'img/client/b-after.jpg', text: 'Волна легко теряет форму под тяжёлым уходом. Правильная сухая стрижка и лёгкие средства вернут ей объём.', service: 'стрижку + обучение кудрявому методу' },
  curly: { title: 'Кудрявые', img: 'img/client/f-after.jpg', text: 'Пух — признак сухости, а не «плохих» волос. Его убирают стрижка по сухим кудрям и СПА-уход.', service: 'стрижку + СПА-уход' },
  coily: { title: 'Мелкие кольца', img: 'img/client/a-after.jpg', text: 'Самый плотный и сухой тип. Ему нужно глубокое питание — с этим справится СПА-курс восстановления.', service: 'СПА-восстановление' }
};

const body = $('#quiz-body');
let step = 0;
let score = {};

function renderStep() {
  $('#quiz-bar').style.width = (step / QUESTIONS.length) * 100 + '%';
  const item = QUESTIONS[step];
  body.innerHTML = `<p class="kicker">Вопрос ${step + 1} из ${QUESTIONS.length}</p><h3>${item.q}</h3><div class="q-opts"></div>${step ? '<button class="q-back" type="button">← Назад</button>' : ''}`;
  item.opts.forEach(([title, note, type]) => {
    const b = document.createElement('button');
    b.className = 'q-opt';
    b.type = 'button';
    b.innerHTML = `${title}<small>${note}</small>`;
    b.addEventListener('click', () => {
      score[type] = (score[type] || 0) + 1;
      step++;
      step < QUESTIONS.length ? renderStep() : renderResult();
    });
    body.querySelector('.q-opts').append(b);
  });
  const back = body.querySelector('.q-back');
  if (back) back.addEventListener('click', () => { step = 0; score = {}; renderStep(); });
}

function renderResult() {
  $('#quiz-bar').style.width = '100%';
  // при равенстве баллов — «кудрявые», самый частый случай
  const type = ['curly', 'wavy', 'coily'].sort((a, b) => (score[b] || 0) - (score[a] || 0))[0];
  const r = RESULTS[type];
  body.innerHTML = `<p class="kicker">Ваш тип</p>
    <div class="result"><img src="${r.img}" alt=""><div><b>${r.title}</b><p>${r.text}</p></div></div>
    <a class="btn btn--dark btn--wide" href="${DIKIDI}" target="_blank" rel="noopener">Записаться на ${r.service} →</a>
    <button class="q-back" type="button" id="again">Пройти заново</button>`;
  $('#again').addEventListener('click', start);
}

function start() { step = 0; score = {}; renderStep(); openModal(); }
document.querySelectorAll('[data-quiz]').forEach((b) => b.addEventListener('click', start));
