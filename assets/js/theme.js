// Dark / Light mode toggle — stored in localStorage
(function () {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();
