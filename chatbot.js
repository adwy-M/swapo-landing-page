// Chatbot Logic
const botResponses = {
  'ما هو سوابو؟': 'سوابو هو تطبيق ومنصة إلكترونية متخصصة في بيع وشراء المنتجات الجديدة والمستعملة داخل المملكة العربية السعودية 🇸🇦',
  'كيف أبيع منتج؟': 'بكل سهولة! حمّل التطبيق، سجّل حسابك، ثم اضغط على زر "أضف منتج" وارفع صور المنتج مع الوصف والسعر وسيظهر للمشترين فوراً ✨',
  'هل التطبيق آمن؟': 'نعم! سوابو يوفر بيئة آمنة تماماً مع نظام دفع محمي، وتوثيق المستخدمين، ونظام نزاعات عادل لحماية حقوق البائع والمشتري 🛡️',
  'كيف أتواصل معكم؟': 'تقدر تتواصل معنا عبر البريد info@swapo.sa أو عبر الواتساب، أو من خلال حساباتنا على السوشيال ميديا 📩',
  'ما هي طرق الدفع؟': 'نقبل Apple Pay، مدى، فيزا، ماستركارد، STC Pay، تمارا، وتابي 💳',
  'كيف أحمل التطبيق؟': 'التطبيق متوفر على Google Play و App Store. اضغط على زر التحميل في الأعلى أو الأسفل 📱'
};
const defaultReply = 'شكراً لتواصلك! للمزيد من المساعدة تواصل معنا على info@swapo.sa أو عبر الواتساب 😊';
const quickOptions = Object.keys(botResponses);

function toggleChat() {
  document.getElementById('chatWindow').classList.toggle('open');
}
function addMsg(text, type) {
  const msgs = document.getElementById('chatMsgs');
  const d = document.createElement('div');
  d.className = 'chat-msg ' + type;
  d.innerHTML = '<div class="chat-bubble">' + text + '</div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}
function handleOpt(text) {
  addMsg(text, 'user');
  setTimeout(() => addMsg(botResponses[text] || defaultReply, 'bot'), 500);
}
function sendChat() {
  const inp = document.getElementById('chatInput');
  const v = inp.value.trim();
  if (!v) return;
  addMsg(v, 'user');
  inp.value = '';
  let reply = defaultReply;
  for (const k in botResponses) {
    if (v.includes(k.replace('؟','')) || k.includes(v)) { reply = botResponses[k]; break; }
  }
  setTimeout(() => addMsg(reply, 'bot'), 600);
}
document.addEventListener('DOMContentLoaded', () => {
  const optBox = document.getElementById('chatOpts');
  if(optBox) quickOptions.forEach(q => {
    const b = document.createElement('button');
    b.className = 'chat-opt';
    b.textContent = q;
    b.onclick = () => handleOpt(q);
    optBox.appendChild(b);
  });
  const ci = document.getElementById('chatInput');
  if(ci) ci.addEventListener('keypress', e => { if(e.key==='Enter') sendChat(); });
});

// Scroll reveal
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Modal
function toggleModal() { document.getElementById('storeModal').classList.toggle('active'); }
function showSection(s) {
  if(s==='terms'){document.getElementById('main-content').style.display='none';document.getElementById('terms-content').style.display='block';window.scrollTo(0,0)}
  else{document.getElementById('terms-content').style.display='none';document.getElementById('main-content').style.display='block'}
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString('ar-SA') + suffix;
    }, 30);
  });
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){animateCounters();statsObs.disconnect()} });
});
window.addEventListener('load', () => {
  const s = document.querySelector('.stats');
  if(s) statsObs.observe(s);
});
