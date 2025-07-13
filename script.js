// Set birthday date (July 20)
const birthday = new Date("2025-07-20T00:00:00").getTime();

// Initialize Swiper
const swiper = new Swiper('.banner-swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Create confetti
function createConfetti() {
  const colors = ['#8a2be2', '#4169e1', '#ff4da6', '#9932cc', '#9370db'];
  const container = document.getElementById('confetti');
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);
  }
}

// Create balloons
function createBalloons() {
  const colors = ['#8a2be2', '#4169e1', '#ff4da6', '#9932cc', '#9370db', '#ffccdd'];
  const container = document.getElementById('balloons');
  
  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = Math.random() * 10 + 5 + 's';
    balloon.style.animationDelay = Math.random() * 5 + 's';
    
    balloon.addEventListener('click', function() {
      document.getElementById('popSound').play();
      balloon.style.animation = 'none';
      balloon.style.transform = 'scale(0)';
      setTimeout(() => balloon.remove(), 300);
      createFirework(parseInt(balloon.style.left), parseInt(balloon.style.bottom));
    });
    
    container.appendChild(balloon);
  }
}

// Create fireworks
function createFirework(x, y) {
  const colors = ['#8a2be2', '#4169e1', '#ff4da6', '#9932cc', '#9370db', '#ffccdd', '#ffffff'];
  
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(firework);
    
    setTimeout(() => firework.remove(), 1000);
  }
}

// Click fireworks
document.addEventListener('click', function(e) {
  createFirework(e.clientX, e.clientY);
});

// Countdown timer
function updateCountdown() {
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById('countdown').innerHTML = "🎉 Happy Birthday, Prathesha! 🎉";
    createConfetti();
    createBalloons();
    document.getElementById('birthdayMusic').play();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${mins}m ${secs}s remaining`;
}

// Form submission
document.getElementById('wishForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  
  if (name && message) {
    addWishToWall(name, message);
    alert('Thank you for your wishes! They have been added to the wish wall.');
    this.reset();
  }
});

// Add wish to wall
function addWishToWall(name, message) {
  const wishWall = document.getElementById('wishWall');
  if (!wishWall) return;
  
  const wishCard = document.createElement('div');
  wishCard.className = 'wish-card';
  wishCard.innerHTML = `
    <h3>${name}</h3>
    <p>${message}</p>
  `;
  wishWall.appendChild(wishCard);
}

// Music toggle
const musicToggle = document.getElementById('musicToggle');
const birthdayMusic = document.getElementById('birthdayMusic');
let musicPlaying = false;

musicToggle.addEventListener('click', function() {
  if (musicPlaying) {
    birthdayMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    document.getElementById('nowPlaying').textContent = 'Music Paused';
  } else {
    birthdayMusic.play();
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    document.getElementById('nowPlaying').textContent = 'Birthday Song';
  }
  musicPlaying = !musicPlaying;
});

// Surprise button
// document.getElementById('surpriseBtn').addEventListener('click', function() {
//   const surprises = [
//     () => { createConfetti(); alert('Surprise! Confetti for you! 🎊'); },
//     () => { createBalloons(); alert('Balloons for you! 🎈 Click them to pop!'); },
//     () => { 
//       document.body.style.background = 'linear-gradient(45deg, #8a2be2, #4169e1, #9932cc)';
//       setTimeout(() => {
//         document.body.style.background = 'linear-gradient(135deg, #f8f9fa, #e6e6fa)';
//       }, 2000);
//       alert('Color surprise! 🌈');
//     },
//     () => {
//       const header = document.querySelector('header h1');
//       header.innerHTML = 'PRATHESHA IS THE BEST! 💖🎂';
//       setTimeout(() => {
//         header.innerHTML = 'Happy Birthday, Prathesha! 🎂';
//       }, 3000);
//     }
//   ];
  
//   const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
//   randomSurprise();
// });

// Image modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Birthday modal
const birthdayModal = document.getElementById('birthdayModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Show birthday modal on load
window.addEventListener('load', function() {
  setTimeout(() => {
    birthdayModal.style.display = 'block';
  }, 1000);
});

modalCloseBtn.addEventListener('click', function() {
  birthdayModal.style.display = 'none';
});

// Initialize everything
window.onload = function() {
  createConfetti();
  createBalloons();
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
  
  // Add some sample wishes
  addWishToWall('Ritika', 'Wishing you the happiest of birthdays! May all your dreams come true.');
  addWishToWall('Friend', 'Happy Birthday! Hope your day is as amazing as you are!');
};