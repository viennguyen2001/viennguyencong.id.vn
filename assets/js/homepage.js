(() => {
  if (!document.body.classList.contains('home-redesign')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('home-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.section-title, .service-item, .home-process__steps > div, .home-project-intro__inner').forEach(element => {
    element.setAttribute('data-home-reveal', '');
    if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('home-pending');
    observer.observe(element);
  });
  const grid = document.querySelector('#portfolio [data-project-card-grid]');
  if (!grid) return;
  const cards = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('project-enter');
      cards.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  const observeCards = () => {
    cards.disconnect();
    grid.querySelectorAll('.project-card').forEach(card => {
      if (card.getBoundingClientRect().top > innerHeight) card.classList.add('project-enter');
      cards.observe(card);
    });
  };
  new MutationObserver(observeCards).observe(grid, { childList: true });
  observeCards();
})();
