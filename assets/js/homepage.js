(() => {
  if (!document.body.classList.contains('home-redesign')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('home-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-title, .service-item, .home-process__steps > div').forEach(element => {
    element.setAttribute('data-home-reveal', '');
    if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('home-pending');
    observer.observe(element);
  });
})();
