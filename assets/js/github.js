// Fetch live GitHub data for project cards (public API, no key needed)
(function () {
  const projectCards = document.querySelectorAll('[data-github-repo]');
  if (!projectCards.length) return;

  projectCards.forEach(async (card) => {
    const repo = card.dataset.githubRepo;
    if (!repo) return;

    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) return;
      const data = await res.json();

      const starsEl = card.querySelector('.github-stars');
      const langEl = card.querySelector('.github-lang');

      if (starsEl) starsEl.textContent = `★ ${data.stargazers_count}`;
      if (langEl) langEl.textContent = data.language || '';
    } catch (e) {
      // Silently fail — GitHub data is optional
    }
  });
})();
