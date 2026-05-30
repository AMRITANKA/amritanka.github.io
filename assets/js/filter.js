// Tag-based filtering for Projects and Blog pages
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-tags]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Toggle active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const tags = card.dataset.tags.split(',');
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });
})();
