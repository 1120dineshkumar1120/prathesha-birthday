// Set birthday date
const birthday = new Date("2025-07-01T00:00:00").getTime();
const encoded = encodeURI('dinesh')


const countdownEl = document.getElementById("countdown");

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance < 0) {
    clearInterval(timer);
    countdownEl.innerHTML = "🎉 Happy Birthday, Prathesha! 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s remaining`;
}, 1000);
