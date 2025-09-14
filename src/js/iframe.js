(() => {
  function loadYT(el) {
    if (el.dataset.loaded) return;
    el.dataset.loaded = '1';
    const id = el.dataset.ytid;
    const iframe = document.createElement('iframe');
    iframe.src =
      'https://www.youtube-nocookie.com/embed/' +
      id +
      '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = 'YouTube video';
    iframe.loading = 'eager'; // після кліку — можна eager
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    el.innerHTML = ''; // прибрати прев'ю
    el.appendChild(iframe);
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('.yt-lite');
    if (el) loadYT(el);
  });
  document.addEventListener('keydown', e => {
    if (!['Enter', ' '].includes(e.key)) return;
    const el = document.activeElement.closest?.('.yt-lite');
    if (el) {
      e.preventDefault();
      loadYT(el);
    }
  });

  // Опційно: lazy-ініціалізація превю, якщо їх багато (відтермінувати завантаження тумбів)
  const lites = document.querySelectorAll('.yt-lite');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          const img = ent.target.querySelector('.yt-thumb');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
          }
          io.unobserve(ent.target);
        }
      }
    });
    lites.forEach(el => io.observe(el));
  }
})();
