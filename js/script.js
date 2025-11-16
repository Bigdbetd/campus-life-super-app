/* js/script.js - Campus Life App MVP (by Drew Newman)
   - Very small demo dataset
   - Simple functions
*/

// Demo events and dining (placeholders)
const demoEvents = [
  { id: 1, title: 'Campus Welcome Party', type: 'social', time: 'Fri 7pm' },
  { id: 2, title: 'Robotics Club Meeting', type: 'club', time: 'Wed 6pm' },
  { id: 3, title: 'Intramural Soccer', type: 'sports', time: 'Sat 10am' },
];

const demoDining = [
  { id: 1, name: 'Dining Hall 1', hours: '7:00 AM - 9:00 PM' },
  { id: 2, name: 'Dining Hall 2', hours: '8:00 AM - 8:00 PM' },
];

// Render events into events.html
function renderEvents(filter = 'all', query = '') {
  const row = document.getElementById('events-row');
  if (!row) return; // only on events.html

  row.innerHTML = '';

  const filtered = demoEvents.filter(e => {
    const matchesFilter = filter === 'all' || e.type === filter;
    const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  if (filtered.length === 0) {
    row.innerHTML = `<div class="col-12"><p class="text-muted">No events found.</p></div>`;
    return;
  }

  filtered.forEach(e => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div style="height:120px;background:#efefef;display:flex;align-items:center;justify-content:center;">
            [Image Placeholder]
          </div>
          <h5 class="card-title mt-2">${e.title}</h5>
          <p class="card-text">${e.time} • ${e.type}</p>
          <button class="btn btn-sm btn-primary" onclick="saveFavorite(${e.id})" aria-label="Save ${e.title}">Save</button>
        </div>
      </div>`;
    row.appendChild(col);
  });
}

// Render dining halls into dining.html
function renderDining() {
  const container = document.getElementById('dining-list');
  if (!container) return;
  container.innerHTML = '';
  demoDining.forEach(d => {
    const div = document.createElement('div');
    div.className = 'card mb-3';
    div.innerHTML = `
      <div class="card-body">
        <div style="height:90px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">[Image Placeholder]</div>
        <h5 class="mt-2">${d.name}</h5>
        <p>Hours: ${d.hours}</p>
        <button class="btn btn-sm btn-outline-primary" onclick="viewMenu(${d.id})" aria-label="View menu for ${d.name}">View Menu</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// Save favorites to localStorage (demo)
function saveFavorite(id) {
  const key = 'campus_favorites';
  const raw = localStorage.getItem(key);
  const favs = raw ? JSON.parse(raw) : [];
  if (!favs.includes(id)) favs.push(id);
  localStorage.setItem(key, JSON.stringify(favs));
  alert('Saved to favorites (demo).');
}

function viewMenu(id) {
  alert('Menu (demo) for dining hall id: ' + id);
}

// Small API demo (shows you attempted to use a fetch)
function apiDemo() {
  const el = document.getElementById('api-demo');
  if (!el) return;
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(r => r.json())
    .then(data => { el.textContent = 'API demo title: ' + data.title; })
    .catch(() => { el.textContent = 'API demo failed (CORS/offline).'; });
}

// Wire up page behaviors when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Events page setup
  const search = document.getElementById('event-search');
  const filter = document.getElementById('event-filter');
  if (search || filter) {
    renderEvents('all', '');
    search?.addEventListener('input', (e) => renderEvents(filter.value, e.target.value));
    filter?.addEventListener('change', () => renderEvents(filter.value, search.value));
  }

  // Dining page
  if (document.getElementById('dining-list')) {
    renderDining();
  }

  // API demo: try to show data on any page with #api-demo
  apiDemo();
});
