document.getElementById('year')?.append(String(new Date().getFullYear()));

// Search and category filters for the AI tools directory.
(() => {
  const grid = document.getElementById('toolGrid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.tool-item')];
  const search = document.getElementById('toolSearch');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('resultsCount');
  const empty = document.getElementById('noResults');
  let activeFilter = 'all';

  function update() {
    const term = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchText = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const searchMatch = !term || searchText.includes(term);
      const show = categoryMatch && searchMatch;
      card.classList.toggle('d-none', !show);
      if (show) visible++;
    });
    if (count) count.textContent = `Showing ${visible} of ${cards.length} tools`;
    empty?.classList.toggle('d-none', visible !== 0);
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    update();
  }));
  search?.addEventListener('input', update);
  update();
})();
