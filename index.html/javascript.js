const jokes = [
  "Why did the teacher wear sunglasses to school? Because her students were too bright! 😎",
  "Ma'am, aap toh syllabus se bhi zyada thorough ho — aapki care kabhi khatam hi nahi hoti!",
  "Teachers don't retire, they just become legendary — especially Ritu Ma'am! ✨",
  "Why was the math book sad on its birthday? Too many problems. Unlike you, Ma'am — only solutions!",
  "Behind every successful student is a teacher who checked every 'assignment kal kar dunga' excuse — and still smiled.",
  "Ma'am, you're proof that 'strict but sweet' is a real combo, like chai with extra sugar. ☕",
  "What is a teacher's favourite birthday song? 'All the grades are yours!' — today, no marking required.",
  "Ritu Ma'am ke bina classroom aisa hai jaise notebook bina pen — kuch bhi complete nahi hota! 📚",
  "Why did the student bring a ladder to class? To reach the high standards set by their favourite teacher!",
  "Ma'am, aapki smile attendance se bhi zyada powerful hai — poori class instantly present! 💗",
  "What did the chalk say to the board? 'Together, we make every lesson brighter.' Just like you, Ma'am.",
  "Birthday rule: cake first, homework later. Aaj ke liye this rule is officially teacher-approved! 🎂",
];

const memories = [
  ["📘", "Thank you for making even the hardest chapter feel simple."],
  ["🌱", "Thank you for believing in us before we believed in ourselves."],
  ["🕰️", "Thank you for the extra minutes you always gave, and never counted."],
  ["🎯", "Thank you for pushing us gently toward our best work."],
  ["🤍", "Thank you for simply being you — patient, kind, unforgettable."],
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function setupPhotos() {
  $$('.photo-frame').forEach((frame) => {
    const image = frame.querySelector('.photo-image');
    const fallback = frame.querySelector('.photo-fallback');
    const showFallback = () => { image.style.display = 'none'; fallback.style.display = 'flex'; };
    fallback.style.display = 'none';
    image.addEventListener('error', showFallback);
    if (image.complete && image.naturalWidth === 0) showFallback();
  });
}

function setupNavigation() {
  const toggle = $('.mobile-menu-button');
  const links = $('.nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  $$('.nav-links a, .logo, .nav-button').forEach((link) => link.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function setupJokes() {
  let index = 0;
  const text = $('#joke-text');
  const number = $('#joke-number');
  const render = () => { text.textContent = jokes[index]; number.textContent = index + 1; };
  $('#next-joke-button').addEventListener('click', () => { index = (index + 1) % jokes.length; render(); });
  $('#previous-joke-button').addEventListener('click', () => { index = (index - 1 + jokes.length) % jokes.length; render(); });
  render();
}

function setupMemories() {
  const book = $('#memory-book');
  memories.forEach(([emoji, message], index) => {
    const card = document.createElement('button');
    card.className = 'memory-card';
    card.type = 'button';
    card.setAttribute('aria-label', `Open memory ${index + 1}`);
    card.innerHTML = `<span class="memory-inner"><span class="memory-face memory-front"><span class="memory-number">0${index + 1}</span><span class="memory-emoji">${emoji}</span><span class="memory-tap">Tap to open</span></span><span class="memory-face memory-back">${message}</span></span>`;
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    book.appendChild(card);
  });
}

function setupWishModal() {
  const modal = $('#wish-modal');
  const close = $('#modal-close-button');
  let previousFocus;
  const open = () => { previousFocus = document.activeElement; modal.hidden = false; close.focus(); spawnConfetti(); };
  const hide = () => { modal.hidden = true; previousFocus?.focus(); };
  $('#hero-wish-button').addEventListener('click', open);
  $('#celebration-wish-button').addEventListener('click', open);
  close.addEventListener('click', hide);
  modal.addEventListener('click', (event) => { if (event.target === modal) hide(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) hide(); });
}

function spawnConfetti() {
  const layer = $('#confetti-layer');
  layer.innerHTML = '';
  for (let index = 0; index < 34; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${index * 2.94}%`;
    piece.style.animationDelay = `${index * -0.07}s`;
    piece.style.transform = `rotate(${index * 31}deg)`;
    layer.appendChild(piece);
  }
  window.setTimeout(() => { layer.innerHTML = ''; }, 4300);
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach((element) => observer.observe(element));
}

function setupBalloons() {
  const field = $('.balloon-field');
  const colors = ['#e86b88', '#f7b6c5', '#d9ae6b', '#8fae7c'];
  const addBalloon = () => {
    const balloon = document.createElement('span');
    const size = 34 + Math.random() * 26;
    balloon.className = 'balloon'; balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.width = `${size}px`; balloon.style.height = `${size * 1.25}px`;
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = `${14 + Math.random() * 10}s`;
    field.appendChild(balloon); window.setTimeout(() => balloon.remove(), 24000);
  };
  for (let index = 0; index < 5; index += 1) window.setTimeout(addBalloon, index * 1500);
  window.setInterval(addBalloon, 3200);
}

setupPhotos(); setupNavigation(); setupJokes(); setupMemories(); setupWishModal(); setu
