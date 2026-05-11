let currentPhotoTarget = null;
let currentAvatarTarget = null;

function triggerUpload(id) {
  currentPhotoTarget = id;
  document.getElementById('file-input-photo').click();
}

function triggerAvatarUpload(id) {
  currentAvatarTarget = id;
  document.getElementById('file-input-avatar').click();
}

document.getElementById('file-input-photo').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file || !currentPhotoTarget) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = document.getElementById('img-' + currentPhotoTarget);
    const frame = document.getElementById('frame-' + currentPhotoTarget);
    if (img && frame) {
      img.src = ev.target.result;
      frame.classList.add('has-photo');
      frame.style.border = 'none';
    }
  };
  reader.readAsDataURL(file);
  this.value = '';
});

document.getElementById('file-input-avatar').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file || !currentAvatarTarget) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = document.getElementById('img-' + currentAvatarTarget);
    const avatar = document.getElementById('avatar-' + currentAvatarTarget);
    if (img && avatar) {
      img.src = ev.target.result;
      avatar.classList.add('has-photo');
    }
  };
  reader.readAsDataURL(file);
  this.value = '';
});

document.querySelectorAll('[contenteditable]').forEach(el => {
  el.addEventListener('click', e => e.stopPropagation());
});

document.querySelectorAll('.score-input').forEach(el => {
  el.addEventListener('click', e => e.stopPropagation());
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.dataset.transform || 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.photo-slot, .padrinho-card, .info-card, .timeline-item, .trote-card, .bonfire-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.transform = el.style.transform || 'translateY(0)';
  el.style.transform = 'translateY(20px)';
  observer.observe(el);
});

// Bandeirinhas dinâmicas para São João
function createBunting(selector, count = 24) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(c => {
    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'flag';
      f.style.animationDelay = (i * 0.15) + 's';
      c.appendChild(f);
    }
  });
}
createBunting('.bunting');

// Coraçõezinhos flutuantes na seção padrinhos
function spawnHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;
  const hearts = ['❤️', '💙', '💕', '🍄'];
  setInterval(() => {
    const h = document.createElement('span');
    h.className = 'heart-float';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.bottom = '0';
    h.style.animationDuration = (6 + Math.random() * 5) + 's';
    container.appendChild(h);
    setTimeout(() => h.remove(), 11000);
  }, 800);
}
spawnHearts();
