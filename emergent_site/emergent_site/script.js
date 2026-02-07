// Script para Come en León: mapa interactivo y búsqueda de cartas

// Datos de los locales con coordenadas aproximadas y slug para enlaces
const restaurants = [
  { name: 'Cocinandos', slug: 'cocinandos.html', lat: 42.5995, lng: -5.5685 },
  { name: 'Casa Mando', slug: 'casa-mando.html', lat: 42.5982, lng: -5.5695 },
  { name: 'NiMÚ Azotea', slug: 'nimu-azotea.html', lat: 42.5978, lng: -5.5701 },
  { name: 'Restaurante Pablo', slug: 'restaurante-pablo.html', lat: 42.6001, lng: -5.5711 },
  { name: 'Mesón Jabugo', slug: 'meson-jabugo.html', lat: 42.5984, lng: -5.5708 },
  { name: 'Bar Flechazo', slug: 'bar-flechazo.html', lat: 42.5980, lng: -5.5709 },
  { name: 'El Rebote', slug: 'bar-el-rebote.html', lat: 42.5980, lng: -5.5710 },
  { name: 'Los Cazurros', slug: 'tabierna-los-cazurros.html', lat: 42.5989, lng: -5.5714 },
  { name: 'La Trébede', slug: 'bar-la-trebede.html', lat: 42.6010, lng: -5.5710 },
  { name: 'Entrecalles', slug: 'bar-entrecalles.html', lat: 42.6012, lng: -5.5721 },
  { name: 'Jamón Jamón', slug: 'bar-jamon-jamon.html', lat: 42.5985, lng: -5.5712 },
  { name: 'La Bicha', slug: 'bar-la-bicha.html', lat: 42.5985, lng: -5.5715 },
  { name: 'Restaurante Ezequiel', slug: 'restaurante-ezequiel.html', lat: 42.6015, lng: -5.5723 },
  { name: 'Four Lions Brewery', slug: 'four-lions-brewery.html', lat: 42.5987, lng: -5.5720 }
];

// Inicialización del mapa usando Leaflet
function initMap() {
  // Centro aproximado en León
  const map = L.map('map').setView([42.5985, -5.5705], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  
  // Añadir marcadores a partir de la lista
  restaurants.forEach((r) => {
    const marker = L.marker([r.lat, r.lng]).addTo(map);
    marker.bindPopup(`<strong>${r.name}</strong><br><a href="${r.slug}">Ver guía</a>`);
  });
}

// Función para filtrar tarjetas según el texto de búsqueda
function applySearch(query) {
  const cards = document.querySelectorAll('.card');
  const lowered = query.toLowerCase();
  cards.forEach((card) => {
    // Unir textos relevantes de la tarjeta
    const name = card.getAttribute('data-name').toLowerCase();
    const category = card.getAttribute('data-category');
    const price = card.getAttribute('data-price');
    const textContent = card.innerText.toLowerCase();
    // Mostrar si alguno de los campos coincide con la búsqueda
    if (name.includes(lowered) || textContent.includes(lowered) || category.includes(lowered) || price.includes(lowered)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar mapa
  initMap();
  
  // Evento de búsqueda
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  searchBtn.addEventListener('click', () => {
    applySearch(searchInput.value);
  });
  // Permitir buscar al pulsar Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      applySearch(searchInput.value);
    }
  });
});