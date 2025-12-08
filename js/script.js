/* js/script.js - Campus Life App MVP (by Drew Newman) */

/* ==========================
   Dining halls demo data
========================== */
const demoDining = [
  {
    id: 1,
    name: 'Ray Dining Hall',
    image: 'images/dininghall.jpeg',
    hours: [
      { day: 'Monday-Friday', breakfast: '7:00-8:30am', lunch: '11:00-1:00pm', dinner: '5:00-7:00pm' },
      { day: 'Saturday', lunch: '11:00-1:00pm', dinner: '5:00-7:00pm' },
      { day: 'Sunday', lunch: '11:00-1:00pm', dinner: '5:00-7:00pm' }
    ],
    menuLink: 'https://www.bmc.edu/dining'
  },
  {
    id: 2,
    name: 'Topper Market (Week Only)',
    image: 'images/market.jpeg',
    hours: [
      { day: 'Monday-Friday', lunch: '11:00-2:00pm', dinner: '5:00-9:00pm' }
    ],
    menuLink: 'https://www.bmc.edu/dining'
  }
];

/* ==========================
   Render dining page
========================== */
function renderDining() {
  const container = document.getElementById('dining-list');
  if (!container) return;

  container.innerHTML = '';
  demoDining.forEach(d => {
    const div = document.createElement('div');
    div.className = 'col-md-6';
    let hoursHTML = '<ul class="mb-0">';
    d.hours.forEach(h => {
      hoursHTML += `<li><strong>${h.day}:</strong> `;
      if (h.breakfast) hoursHTML += `Breakfast: ${h.breakfast}, `;
      if (h.lunch) hoursHTML += `Lunch: ${h.lunch}, `;
      if (h.dinner) hoursHTML += `Dinner: ${h.dinner}`;
      hoursHTML += '</li>';
    });
    hoursHTML += '</ul>';

    div.innerHTML = `
      <div class="card mb-3">
        <img src="${d.image}" class="card-img-top" alt="${d.name}" style="height:200px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${d.name}</h5>
          <h6>Hours:</h6>
          ${hoursHTML}
          <a href="${d.menuLink}" target="_blank" class="btn btn-sm btn-outline-primary mt-2">View Menu</a>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

/* ==========================
   Weather API
========================== */
function renderWeather() {
  const el = document.getElementById('weather');
  if (!el) return;

  const apiKey = '42d60a0260d8539a2242ca9f91143891';
  const city = 'Blue Mountain,MS,US';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      el.innerHTML = `
        <p><strong>Current Weather:</strong> ${data.weather[0].description}, ${data.main.temp}°F</p>
      `;
    })
    .catch(err => {
      el.textContent = 'Weather info unavailable.';
      console.error(err);
    });
}

/* ==========================
   Initialize page behaviors
========================== */
document.addEventListener('DOMContentLoaded', () => {
  // Dining page
  if (document.getElementById('dining-list')) {
    renderDining();
  }

  // Weather (if you add <div id="weather"></div> to any page)
  renderWeather();
});
