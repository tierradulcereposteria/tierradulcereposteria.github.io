document.addEventListener('DOMContentLoaded', function() {
  const btnTop = document.getElementById('btn-top');
  if (!btnTop) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  });
  btnTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}); 