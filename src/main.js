import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Rosslyn Central Park Hotel Sofia - бул. Витоша 106
const HOTEL = { 
  lat: 42.68550, 
  lng: 23.31870,
  address: 'бул. Витоша 106, София'
};

// Цветове на хотела
const HOTEL_COLORS = {
  primary: '#1a237e',
  secondary: '#0d47a1',
  white: '#ffffff'
};

// Език
let currentLanguage = 'bg';

// ТОЧНИ МАРШРУТИ с реални GPS координати
const RUNNING_ROUTES = [
  {
    id: 1,
    name_bg: '🟢 Южен парк - 5 км',
    name_en: '🟢 South Park - 5 km',
    description_bg: '✅ Приятно бягане в Южен парк - идеално за начинаещи',
    description_en: '✅ Pleasant run in South Park - perfect for beginners',
    distance: 5.0,
    duration: 30,
    difficulty_bg: 'Лесен',
    difficulty_en: 'Easy',
    calories: 320,
    color: '#4CAF50',
    points: [
      [42.68550, 23.31870],
      [42.68480, 23.31750],
      [42.68390, 23.31580],
      [42.68270, 23.31350],
      [42.68120, 23.31100],
      [42.67950, 23.30850],
      [42.67780, 23.30700],
      [42.67600, 23.30600],
      [42.67450, 23.30550],
      [42.67300, 23.30520],
      [42.67150, 23.30500],
      [42.67000, 23.30520],
      [42.66850, 23.30550],
      [42.66700, 23.30570],
      [42.66550, 23.30580],
      [42.66500, 23.30630],
      [42.66450, 23.30670],
      [42.66400, 23.30710],
      [42.66390, 23.30790],
      [42.66400, 23.30850],
      [42.66450, 23.30830],
      [42.66500, 23.30790],
      [42.66550, 23.30750],
      [42.66700, 23.30750],
      [42.66850, 23.30770],
      [42.67000, 23.30780],
      [42.67150, 23.30790],
      [42.67300, 23.30800],
      [42.67450, 23.30820],
      [42.67600, 23.30850],
      [42.67780, 23.30900],
      [42.67950, 23.31000],
      [42.68120, 23.31150],
      [42.68270, 23.31300],
      [42.68390, 23.31450],
      [42.68480, 23.31600],
      [42.68550, 23.31870]
    ],
    streets_bg: [
      'бул. Витоша',
      'ул. Христо Смирненски',
      'алея Южен парк',
      'централна алея'
    ],
    streets_en: [
      'Vitoshka Blvd',
      'Hristo Smirnenski St',
      'South Park Alley',
      'Central Alley'
    ],
    warnings_bg: [
      { lat: 42.68270, lng: 23.31350, message: '⚠️ Внимавай! Пресичаш бул. "Витоша" на пешеходна пътека' },
      { lat: 42.66550, lng: 23.30580, message: '⚠️ Внимавай за велосипедисти на входа на парка' }
    ],
    warnings_en: [
      { lat: 42.68270, lng: 23.31350, message: '⚠️ Caution! Crossing "Vitoshka" Blvd on pedestrian crossing' },
      { lat: 42.66550, lng: 23.30580, message: '⚠️ Watch for cyclists at the park entrance' }
    ]
  },
  {
    id: 2,
    name_bg: '🔵 Борисова градина - 8 км',
    name_en: '🔵 Borisova Garden - 8 km',
    description_bg: '✅ Живописен маршрут до Борисова градина и обратно',
    description_en: '✅ Scenic route to Borisova Garden and back',
    distance: 8.0,
    duration: 50,
    difficulty_bg: 'Среден',
    difficulty_en: 'Moderate',
    calories: 520,
    color: '#2196F3',
    points: [
      [42.68550, 23.31870],
      [42.68560, 23.31900],
      [42.68570, 23.31930],
      [42.68560, 23.31960],
      [42.68546, 23.31992],
      [42.68540, 23.32020],
      [42.68530, 23.32050],
      [42.68520, 23.32080],
      [42.68550, 23.32150],
      [42.68600, 23.32250],
      [42.68650, 23.32350],
      [42.68700, 23.32450],
      [42.68750, 23.32550],
      [42.68800, 23.32650],
      [42.68850, 23.32750],
      [42.68900, 23.32850],
      [42.68950, 23.32950],
      [42.69000, 23.33050],
      [42.69050, 23.33150],
      [42.69080, 23.33250],
      [42.69090, 23.33350],
      [42.69090, 23.33450],
      [42.69090, 23.33550],
      [42.69090, 23.33630],
      [42.69120, 23.33700],
      [42.69150, 23.33780],
      [42.69170, 23.33850],
      [42.69180, 23.33920],
      [42.69190, 23.34000],
      [42.69190, 23.34080],
      [42.69190, 23.34180],
      [42.69180, 23.34100],
      [42.69170, 23.34020],
      [42.69150, 23.33940],
      [42.69130, 23.33860],
      [42.69100, 23.33780],
      [42.69090, 23.33700],
      [42.69090, 23.33630],
      [42.69090, 23.33550],
      [42.69090, 23.33450],
      [42.69080, 23.33350],
      [42.69050, 23.33250],
      [42.69000, 23.33150],
      [42.68950, 23.33050],
      [42.68900, 23.32950],
      [42.68850, 23.32850],
      [42.68800, 23.32750],
      [42.68750, 23.32650],
      [42.68700, 23.32550],
      [42.68650, 23.32450],
      [42.68600, 23.32350],
      [42.68550, 23.32250],
      [42.68520, 23.32150],
      [42.68530, 23.32080],
      [42.68540, 23.32020],
      [42.68546, 23.31992],
      [42.68560, 23.31960],
      [42.68570, 23.31930],
      [42.68560, 23.31900],
      [42.68550, 23.31870]
    ],
    streets_bg: [
      'бул. Витоша',
      'НДК',
      'бул. Евлоги Георгиев',
      'алея Борисова градина',
      'езеро Ариана'
    ],
    streets_en: [
      'Vitoshka Blvd',
      'NDK',
      'Evlogi Georgiev Blvd',
      'Borisova Garden Alley',
      'Ariana Lake'
    ],
    warnings_bg: [
      { lat: 42.68546, lng: 23.31992, message: '⚠️ Внимавай! Голямо движение пред НДК' },
      { lat: 42.69090, lng: 23.33630, message: '⚠️ Внимавай! Около езерото Ариана е хлъзгаво' },
      { lat: 42.69190, lng: 23.34180, message: '⚠️ Внимавай! Това е краят на парка - обърни се' }
    ],
    warnings_en: [
      { lat: 42.68546, lng: 23.31992, message: '⚠️ Caution! Heavy traffic near NDK' },
      { lat: 42.69090, lng: 23.33630, message: '⚠️ Caution! Around Ariana Lake is slippery' },
      { lat: 42.69190, lng: 23.34180, message: '⚠️ Caution! This is the end of the park - turn around' }
    ]
  },
  {
    id: 3,
    name_bg: '🔴 Южен парк → Ловен парк → Борисова градина - 13 км',
    name_en: '🔴 South Park → Lozen Park → Borisova Garden - 13 km',
    description_bg: '✅ Дълъг маршрут през три парка - за напреднали бегачи',
    description_en: '✅ Long route through three parks - for advanced runners',
    distance: 13.0,
    duration: 90,
    difficulty_bg: 'Труден',
    difficulty_en: 'Hard',
    calories: 840,
    color: '#FF5722',
    points: [
      [42.68550, 23.31870],
      [42.68480, 23.31750],
      [42.68390, 23.31580],
      [42.68270, 23.31350],
      [42.68120, 23.31100],
      [42.67950, 23.30850],
      [42.67780, 23.30700],
      [42.67600, 23.30600],
      [42.67450, 23.30550],
      [42.67300, 23.30520],
      [42.67150, 23.30500],
      [42.67000, 23.30520],
      [42.66850, 23.30550],
      [42.66700, 23.30570],
      [42.66550, 23.30580],
      [42.66500, 23.30630],
      [42.66450, 23.30670],
      [42.66400, 23.30710],
      [42.66390, 23.30790],
      [42.66400, 23.30850],
      [42.66450, 23.30830],
      [42.66500, 23.30790],
      [42.66550, 23.30750],
      [42.66600, 23.30850],
      [42.66650, 23.31000],
      [42.66700, 23.31200],
      [42.66720, 23.31400],
      [42.66740, 23.31600],
      [42.66750, 23.31800],
      [42.66760, 23.32000],
      [42.66770, 23.32200],
      [42.66780, 23.32400],
      [42.66790, 23.32600],
      [42.66790, 23.32800],
      [42.66790, 23.33000],
      [42.66790, 23.33200],
      [42.66790, 23.33370],
      [42.66850, 23.33400],
      [42.66900, 23.33450],
      [42.66950, 23.33500],
      [42.67000, 23.33550],
      [42.67050, 23.33600],
      [42.67100, 23.33650],
      [42.67200, 23.33700],
      [42.67300, 23.33750],
      [42.67400, 23.33800],
      [42.67500, 23.33850],
      [42.67600, 23.33900],
      [42.67700, 23.33950],
      [42.67800, 23.34000],
      [42.67900, 23.34050],
      [42.68000, 23.34100],
      [42.68100, 23.34150],
      [42.68200, 23.34200],
      [42.68300, 23.34250],
      [42.68400, 23.34300],
      [42.68500, 23.34350],
      [42.68600, 23.34400],
      [42.68700, 23.34450],
      [42.68800, 23.34500],
      [42.68900, 23.34550],
      [42.69000, 23.34600],
      [42.69050, 23.34650],
      [42.69100, 23.34700],
      [42.69150, 23.34750],
      [42.69200, 23.34800],
      [42.69250, 23.34850],
      [42.69300, 23.34900],
      [42.69350, 23.34950],
      [42.69400, 23.35000],
      [42.69450, 23.35050],
      [42.69500, 23.35100],
      [42.69550, 23.35150],
      [42.69600, 23.35200],
      [42.69650, 23.35250],
      [42.69700, 23.35300],
      [42.69750, 23.35350],
      [42.69800, 23.35400],
      [42.69850, 23.35450],
      [42.69800, 23.35400],
      [42.69750, 23.35350],
      [42.69700, 23.35300],
      [42.69650, 23.35250],
      [42.69600, 23.35200],
      [42.69550, 23.35150],
      [42.69500, 23.35100],
      [42.69450, 23.35050],
      [42.69400, 23.35000],
      [42.69350, 23.34950],
      [42.69300, 23.34900],
      [42.69250, 23.34850],
      [42.69200, 23.34800],
      [42.69150, 23.34750],
      [42.69100, 23.34700],
      [42.69050, 23.34650],
      [42.69000, 23.34600],
      [42.68900, 23.34550],
      [42.68800, 23.34500],
      [42.68700, 23.34450],
      [42.68600, 23.34400],
      [42.68500, 23.34350],
      [42.68400, 23.34300],
      [42.68300, 23.34250],
      [42.68200, 23.34200],
      [42.68100, 23.34150],
      [42.68000, 23.34100],
      [42.67900, 23.34050],
      [42.67800, 23.34000],
      [42.67700, 23.33950],
      [42.67600, 23.33900],
      [42.67500, 23.33850],
      [42.67400, 23.33800],
      [42.67300, 23.33750],
      [42.67200, 23.33700],
      [42.67100, 23.33650],
      [42.67050, 23.33600],
      [42.67000, 23.33550],
      [42.66950, 23.33500],
      [42.66900, 23.33450],
      [42.66850, 23.33400],
      [42.66790, 23.33370],
      [42.66790, 23.33200],
      [42.66790, 23.33000],
      [42.66790, 23.32800],
      [42.66790, 23.32600],
      [42.66780, 23.32400],
      [42.66770, 23.32200],
      [42.66760, 23.32000],
      [42.66750, 23.31800],
      [42.66740, 23.31600],
      [42.66720, 23.31400],
      [42.66700, 23.31200],
      [42.66650, 23.31000],
      [42.66600, 23.30850],
      [42.66550, 23.30750],
      [42.66700, 23.30750],
      [42.66850, 23.30770],
      [42.67000, 23.30780],
      [42.67150, 23.30790],
      [42.67300, 23.30800],
      [42.67450, 23.30820],
      [42.67600, 23.30850],
      [42.67780, 23.30900],
      [42.67950, 23.31000],
      [42.68120, 23.31150],
      [42.68270, 23.31300],
      [42.68390, 23.31450],
      [42.68480, 23.31600],
      [42.68550, 23.31870]
    ],
    streets_bg: [
      'бул. Витоша',
      'Южен парк',
      'бул. Никола Габровски',
      'Ловен парк',
      'алея Борисова градина'
    ],
    streets_en: [
      'Vitoshka Blvd',
      'South Park',
      'Nikola Gabrovski Blvd',
      'Lozen Park',
      'Borisova Garden Alley'
    ],
    warnings_bg: [
      { lat: 42.68270, lng: 23.31350, message: '⚠️ Внимавай! Пресичаш бул. "Витоша" на пешеходна пътека' },
      { lat: 42.66550, lng: 23.30580, message: '⚠️ Внимавай за велосипедисти на входа на Южен парк' },
      { lat: 42.66790, lng: 23.33370, message: '⚠️ Внимавай! Влизаш в Ловен парк' },
      { lat: 42.69850, lng: 23.35450, message: '⚠️ Това е най-далечната точка - обърни се!' }
    ],
    warnings_en: [
      { lat: 42.68270, lng: 23.31350, message: '⚠️ Caution! Crossing "Vitoshka" Blvd on pedestrian crossing' },
      { lat: 42.66550, lng: 23.30580, message: '⚠️ Watch for cyclists at South Park entrance' },
      { lat: 42.66790, lng: 23.33370, message: '⚠️ Caution! Entering Lozen Park' },
      { lat: 42.69850, lng: 23.35450, message: '⚠️ This is the farthest point - turn around!' }
    ]
  }
];

// Функция за получаване на текстове
function getTexts(lang) {
  return {
    title: 'Rosslyn Central Park Hotel',
    stars: '⭐⭐⭐⭐ Sofia',
    address: lang === 'bg' ? '📍 бул. Витоша 106' : '📍 106 Vitoshka Blvd',
    routes: lang === 'bg' ? '🏃 Избери маршрут' : '🏃 Choose route',
    stats_routes: lang === 'bg' ? 'Маршрута' : 'Routes',
    stats_total: lang === 'bg' ? 'Общо' : 'Total',
    stats_time: lang === 'bg' ? 'Общо време' : 'Total time',
    navigation: lang === 'bg' ? '🧭 Навигация' : '🧭 Navigation',
    distance: lang === 'bg' ? 'Разстояние' : 'Distance',
    time: lang === 'bg' ? 'Време' : 'Time',
    calories: lang === 'bg' ? 'Калории' : 'Calories',
    start_route: lang === 'bg' ? '🏃 Стартирай' : '🏃 Start',
    close: lang === 'bg' ? '✖ Затвори' : '✖ Close',
    language: lang === 'bg' ? '🇬🇧 English' : '🇧🇬 Български',
    safe: lang === 'bg' ? '✅ Безопасен маршрут' : '✅ Safe route'
  };
}

// Функция за получаване на времето
function getWeather() {
  const now = new Date();
  const hour = now.getHours();
  let weather_bg = '', weather_en = '', temp = '', icon = '';
  
  if (hour >= 6 && hour < 10) {
    weather_bg = 'Слънчево утро';
    weather_en = 'Sunny morning';
    temp = '18°C';
    icon = '🌅';
  } else if (hour >= 10 && hour < 14) {
    weather_bg = 'Слънчево';
    weather_en = 'Sunny';
    temp = '24°C';
    icon = '☀️';
  } else if (hour >= 14 && hour < 18) {
    weather_bg = 'Частично облачно';
    weather_en = 'Partly cloudy';
    temp = '26°C';
    icon = '⛅';
  } else if (hour >= 18 && hour < 21) {
    weather_bg = 'Залез';
    weather_en = 'Sunset';
    temp = '21°C';
    icon = '🌅';
  } else if (hour >= 21 && hour < 24) {
    weather_bg = 'Вечер';
    weather_en = 'Evening';
    temp = '17°C';
    icon = '🌙';
  } else {
    weather_bg = 'Нощ';
    weather_en = 'Night';
    temp = '14°C';
    icon = '🌙';
  }
  
  return { weather_bg, weather_en, temp, icon, hour };
}

// Функция за навигация с имена на улици
function getTurnByTurnDirections(routePoints, routeName, lang, streets) {
  const directions = [];
  let streetIndex = 0;
  
  for (let i = 0; i < routePoints.length - 1; i++) {
    const current = routePoints[i];
    const next = routePoints[i + 1];
    const latDiff = next[0] - current[0];
    const lngDiff = next[1] - current[1];
    let direction = '';
    let distance = '';
    
    if (Math.abs(latDiff) > Math.abs(lngDiff)) {
      direction = latDiff > 0 ? '⬇️' : '⬆️';
    } else {
      direction = lngDiff > 0 ? '➡️' : '⬅️';
    }
    
    const distMeters = Math.round(Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111000);
    distance = distMeters < 1000 ? distMeters + 'м' : (distMeters / 1000).toFixed(1) + 'км';
    
    let streetName = '';
    if (streets && streetIndex < streets.length) {
      streetName = streets[streetIndex];
    }
    
    if (i > 0 && i % 5 === 0 && streetIndex < streets.length - 1) {
      streetIndex++;
      streetName = streets[streetIndex];
    }
    
    if (i === 0) {
      if (lang === 'bg') {
        directions.push(`🚀 Старт - ${streets[0] || 'бул. Витоша 106'}`);
      } else {
        directions.push(`🚀 Start - ${streets[0] || 'Vitoshka Blvd 106'}`);
      }
    } else {
      const dirText = lang === 'bg' ? 
        `${direction} ${distance} ${streetName || ''}` :
        `${direction} ${distance} ${streetName || ''}`;
      directions.push(dirText);
    }
  }
  
  if (lang === 'bg') {
    directions.push(`🏁 Финал - ${streets[0] || 'бул. Витоша 106'}`);
  } else {
    directions.push(`🏁 Finish - ${streets[0] || 'Vitoshka Blvd 106'}`);
  }
  
  return directions;
}

// Функция за смяна на езика
function toggleLanguage() {
  const currentLang = currentLanguage;
  const newLang = currentLang === 'bg' ? 'en' : 'bg';
  currentLanguage = newLang;
  localStorage.setItem('preferredLanguage', newLang);
  location.reload();
}

// Изчакай DOM да се зареди
document.addEventListener('DOMContentLoaded', function() {
  // Вземи езика от localStorage
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    currentLanguage = savedLang;
  }
  
  const app = document.getElementById('app');
  const lang = currentLanguage;
  const texts = getTexts(lang);
  
  // Създай контейнер за картата
  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.cssText = `
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  `;
  app.appendChild(mapContainer);

  // Инициализирай картата
  const map = L.map('map', {
    center: [HOTEL.lat, HOTEL.lng],
    zoom: 14,
    zoomControl: false,
    scrollWheelZoom: true,
    dragging: true,
    tap: true
  });

  // Добави Google Maps Tiles
  L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy; Google Maps',
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(map);

  // Добави контрол за смяна на типа карта (опростен за мобилни)
  const baseLayers = {
    "🗺️": L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps'
    }),
    "🛰️": L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps'
    })
  };

  L.control.layers(baseLayers, null, { position: 'bottomright' }).addTo(map);

  // Добави zoom контрол
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Създай маркер за хотела (по-малък за мобилни)
  const hotelIconHtml = `
    <div style="
      background: ${HOTEL_COLORS.primary};
      border-radius: 50%;
      border: 2px solid ${HOTEL_COLORS.white};
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
      text-align: center;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <img src="/hotel-logo.svg" style="width: 34px; height: 34px; border-radius: 50%;" />
    </div>
  `;

  const hotelIcon = L.divIcon({
    className: 'hotel-marker-custom',
    html: hotelIconHtml,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });

  L.marker([HOTEL.lat, HOTEL.lng], { icon: hotelIcon })
    .addTo(map)
    .bindPopup(`
      <div style="text-align: center; font-size: 12px;">
        <strong>Rosslyn Central Park Hotel</strong><br>
        📍 бул. Витоша 106
      </div>
    `);

  // Създай главния панел - мобилно оптимизиран
  const panel = document.createElement('div');
  panel.id = 'main-panel';
  panel.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
    max-height: 65vh;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 0;
    transition: max-height 0.3s ease;
    border-top: 3px solid ${HOTEL_COLORS.primary};
  `;
  
  // Header - опростен за мобилни
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 14px 16px 10px 16px;
    background: linear-gradient(135deg, ${HOTEL_COLORS.primary}, ${HOTEL_COLORS.secondary});
    border-radius: 20px 20px 0 0;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
  `;
  header.innerHTML = `
    <div style="display: flex; justify-content: flex-end; gap: 6px; margin-bottom: 4px;">
      <button id="lang-toggle" style="
        background: rgba(255,255,255,0.15);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 16px;
        padding: 2px 10px;
        font-size: 10px;
        cursor: pointer;
        font-weight: 600;
      ">${texts.language}</button>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
      <span style="font-size: 20px;">🏨</span>
      <div>
        <div style="color: ${HOTEL_COLORS.white}; font-size: 15px; font-weight: 700; font-family: Georgia, serif; letter-spacing: 0.5px;">
          Rosslyn Central Park Hotel
        </div>
        <div style="color: rgba(255,255,255,0.7); font-size: 9px;">
          ⭐⭐⭐⭐ Sofia - бул. Витоша 106
        </div>
      </div>
    </div>
  `;
  panel.appendChild(header);

  // Време - опростено
  const weather = getWeather();
  const weatherDiv = document.createElement('div');
  weatherDiv.style.cssText = `
    padding: 8px 16px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  `;
  weatherDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 20px;">${weather.icon}</span>
      <span style="font-weight: 700; color: ${HOTEL_COLORS.primary}; font-size: 14px;">${weather.temp}</span>
      <span style="color: #7f8c8d; font-size: 11px;">${lang === 'bg' ? weather.weather_bg : weather.weather_en}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px; background: ${HOTEL_COLORS.primary}; padding: 2px 10px; border-radius: 14px;">
      <span style="font-size: 12px;">🕐</span>
      <span style="font-weight: 600; color: white; font-size: 12px;">${new Date().toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `;
  panel.appendChild(weatherDiv);

  // Статистики - опростени
  const totalDistance = RUNNING_ROUTES.reduce((sum, r) => sum + r.distance, 0);
  
  const statsBar = document.createElement('div');
  statsBar.style.cssText = `
    padding: 6px 16px;
    background: ${HOTEL_COLORS.primary};
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-size: 10px;
  `;
  statsBar.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 14px;">🗺️</div>
      <div style="font-weight: 700; font-size: 12px;">${RUNNING_ROUTES.length}</div>
      <div style="font-size: 8px; opacity: 0.8;">${texts.stats_routes}</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 14px;">📏</div>
      <div style="font-weight: 700; font-size: 12px;">${totalDistance}км</div>
      <div style="font-size: 8px; opacity: 0.8;">${texts.stats_total}</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 14px;">⏱️</div>
      <div style="font-weight: 700; font-size: 12px;">${RUNNING_ROUTES.reduce((sum, r) => sum + r.duration, 0)}мин</div>
      <div style="font-size: 8px; opacity: 0.8;">${texts.stats_time}</div>
    </div>
  `;
  panel.appendChild(statsBar);

  // Списък с маршрути - скролващ
  const routeSection = document.createElement('div');
  routeSection.style.cssText = 'padding: 10px 14px; max-height: 35vh; overflow-y: auto;';
  routeSection.innerHTML = `
    <p style="margin: 0 0 8px 0; color: ${HOTEL_COLORS.primary}; font-size: 12px; font-weight: 700; border-bottom: 2px solid ${HOTEL_COLORS.primary}; padding-bottom: 4px;">
      ${texts.routes}
    </p>
  `;
  
  const list = document.createElement('div');
  RUNNING_ROUTES.forEach(function(route) {
    const item = document.createElement('div');
    const borderColor = route.color;
    const name = lang === 'bg' ? route.name_bg : route.name_en;
    const description = lang === 'bg' ? route.description_bg : route.description_en;
    const difficulty = lang === 'bg' ? route.difficulty_bg : route.difficulty_en;
    
    item.style.cssText = `
      padding: 10px 12px;
      margin-bottom: 8px;
      border-left: 4px solid ${borderColor};
      background: #f8f9fa;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    `;
    item.ontouchend = function() {
      showRouteDetails(route);
    };
    item.onclick = function() {
      showRouteDetails(route);
    };
    
    const difficultyStars = difficulty === 'Лесен' || difficulty === 'Easy' ? '⭐' : 
                           difficulty === 'Среден' || difficulty === 'Moderate' ? '⭐⭐' : '⭐⭐⭐';
    
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <div style="font-weight: 700; color: #2c3e50; font-size: 14px;">${name}</div>
          <div style="font-size: 10px; color: #7f8c8d; margin: 2px 0;">${description}</div>
          <div style="display: flex; gap: 8px; font-size: 10px; color: #7f8c8d; flex-wrap: wrap;">
            <span>📏 ${route.distance}км</span>
            <span>⏱️ ${route.duration}мин</span>
            <span>🔥 ${route.calories}кал</span>
            <span>${difficultyStars}</span>
          </div>
        </div>
        <div style="margin-left: 8px;">
          <span style="background: ${borderColor}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 8px; font-weight: 600;">${difficulty}</span>
        </div>
      </div>
    `;
    list.appendChild(item);
  });
  routeSection.appendChild(list);
  panel.appendChild(routeSection);

  // Детайли за маршрута
  const detailsDiv = document.createElement('div');
  detailsDiv.id = 'route-details';
  detailsDiv.style.cssText = 'padding: 0 14px 14px 14px; display: none; border-top: 2px solid ' + HOTEL_COLORS.primary + '; max-height: 45vh; overflow-y: auto;';
  panel.appendChild(detailsDiv);

  app.appendChild(panel);

  // Бутон за смяна на езика
  document.getElementById('lang-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    toggleLanguage();
  });

  // Функция за показване на детайли
  function showRouteDetails(route) {
    const lang = currentLanguage;
    const texts = getTexts(lang);
    const detailsDiv = document.getElementById('route-details');
    detailsDiv.style.display = 'block';
    detailsDiv.innerHTML = '';
    
    const name = lang === 'bg' ? route.name_bg : route.name_en;
    const warnings = lang === 'bg' ? route.warnings_bg : route.warnings_en;
    const streets = lang === 'bg' ? route.streets_bg : route.streets_en;
    const directions = getTurnByTurnDirections(route.points, name, lang, streets);
    
    let warningsHtml = '';
    if (warnings && warnings.length > 0) {
      warningsHtml = `
        <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px;">
          ${warnings.map(function(w) {
            return '<div style="font-size: 11px; color: #856404; padding: 1px 0;">⚠️ ' + w.message + '</div>';
          }).join('')}
        </div>
      `;
    }
    
    const navHtml = `
      <div style="margin-top: 10px;">
        <div style="background: #d4edda; border: 1px solid #28a745; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px;">
          <span style="font-size: 12px;">🛡️</span>
          <span style="font-size: 11px; color: #155724; font-weight: 600;">${texts.safe}</span>
        </div>
        ${warningsHtml}
        <h4 style="margin: 0 0 4px 0; color: ${HOTEL_COLORS.primary}; font-size: 13px;">${texts.navigation}</h4>
        <div style="background: #f8f9fa; border-radius: 6px; padding: 6px 10px; max-height: 100px; overflow-y: auto; font-size: 11px; line-height: 1.6; border-left: 3px solid ${HOTEL_COLORS.primary};">
          ${directions.map(function(d) { return '<div style="padding: 1px 0;">' + d + '</div>'; }).join('')}
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; margin-top: 8px; text-align: center; background: #f8f9fa; border-radius: 6px; padding: 8px;">
        <div>
          <span style="display: block; font-size: 16px;">📏</span>
          <span style="display: block; font-weight: 700; color: ${HOTEL_COLORS.primary}; font-size: 13px;">${route.distance}км</span>
          <span style="display: block; font-size: 8px; color: #7f8c8d;">${texts.distance}</span>
        </div>
        <div>
          <span style="display: block; font-size: 16px;">⏱️</span>
          <span style="display: block; font-weight: 700; color: ${HOTEL_COLORS.primary}; font-size: 13px;">${route.duration}мин</span>
          <span style="display: block; font-size: 8px; color: #7f8c8d;">${texts.time}</span>
        </div>
        <div>
          <span style="display: block; font-size: 16px;">🔥</span>
          <span style="display: block; font-weight: 700; color: ${HOTEL_COLORS.primary}; font-size: 13px;">${route.calories}кал</span>
          <span style="display: block; font-size: 8px; color: #7f8c8d;">${texts.calories}</span>
        </div>
      </div>
      <div style="display: flex; gap: 6px; margin-top: 8px;">
        <button id="start-route-btn" style="flex: 2; padding: 10px; background: linear-gradient(135deg, ${route.color}, ${route.color}dd); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">
          ${texts.start_route}
        </button>
        <button id="close-details-btn" style="flex: 1; padding: 10px; background: #e9ecef; color: ${HOTEL_COLORS.primary}; border: none; border-radius: 8px; font-size: 13px; cursor: pointer;">
          ${texts.close}
        </button>
      </div>
    `;
    
    detailsDiv.innerHTML = navHtml;
    
    showRouteOnMap(route);
    
    document.getElementById('start-route-btn').addEventListener('click', function() {
      startRoute(route);
    });
    
    document.getElementById('close-details-btn').addEventListener('click', function() {
      detailsDiv.style.display = 'none';
      map.eachLayer(function(layer) {
        if (layer instanceof L.Polyline) {
          layer.setStyle({ opacity: 0.8 });
        }
      });
      map.setView([HOTEL.lat, HOTEL.lng], 14);
    });
    
    detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showRouteOnMap(route) {
    const lang = currentLanguage;
    const warnings = lang === 'bg' ? route.warnings_bg : route.warnings_en;
    
    const polylines = [];
    map.eachLayer(function(layer) {
      if (layer instanceof L.Polyline) {
        polylines.push(layer);
      }
    });
    polylines.forEach(function(layer) {
      map.removeLayer(layer);
    });
    
    const polyline = L.polyline(route.points, {
      color: route.color,
      weight: 4,
      opacity: 0.9,
      smoothFactor: 1,
      lineJoin: 'round'
    }).addTo(map);
    
    if (warnings) {
      warnings.forEach(function(warning) {
        const warningIcon = L.divIcon({
          className: 'warning-marker',
          html: '⚠️',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        L.marker([warning.lat, warning.lng], { icon: warningIcon })
          .addTo(map)
          .bindPopup(warning.message);
      });
    }
    
    const startPoint = route.points[0];
    const endPoint = route.points[route.points.length - 1];
    
    const startIcon = L.divIcon({
      className: 'start-marker',
      html: '🏁',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    const endIcon = L.divIcon({
      className: 'end-marker',
      html: '🏁',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    const startLabel = lang === 'bg' ? '🏁 Старт' : '🏁 Start';
    const endLabel = lang === 'bg' ? '🏁 Финал' : '🏁 Finish';
    
    L.marker(startPoint, { icon: startIcon })
      .addTo(map)
      .bindPopup(startLabel);
    
    L.marker(endPoint, { icon: endIcon })
      .addTo(map)
      .bindPopup(endLabel);
    
    const bounds = L.latLngBounds(route.points);
    map.fitBounds(bounds, { padding: [40, 40] });
    
    const name = lang === 'bg' ? route.name_bg : route.name_en;
    polyline.bindPopup('<strong>' + name + '</strong>');
    polyline.openPopup();
  }

  function startRoute(route) {
    const lang = currentLanguage;
    const startBtn = document.getElementById('start-route-btn');
    const startLabel = lang === 'bg' ? '⏳ Навигация...' : '⏳ Navigating...';
    const finishLabel = lang === 'bg' ? '✅ Завършен!' : '✅ Finished!';
    const restartLabel = lang === 'bg' ? '🏃 Стартирай отново' : '🏃 Start again';
    const warnings = lang === 'bg' ? route.warnings_bg : route.warnings_en;
    
    startBtn.textContent = startLabel;
    startBtn.style.background = '#28a745';
    startBtn.disabled = true;
    
    const points = route.points;
    let index = 0;
    
    const polylines = [];
    map.eachLayer(function(layer) {
      if (layer instanceof L.Polyline) {
        polylines.push(layer);
      }
    });
    polylines.forEach(function(layer) {
      map.removeLayer(layer);
    });
    
    const animatedPolyline = L.polyline([], {
      color: route.color,
      weight: 5,
      opacity: 0.9,
      smoothFactor: 1,
      lineJoin: 'round'
    }).addTo(map);
    
    const interval = setInterval(function() {
      if (index < points.length) {
        const currentPoints = animatedPolyline.getLatLngs();
        const newPoint = L.latLng(points[index][0], points[index][1]);
        currentPoints.push(newPoint);
        animatedPolyline.setLatLngs(currentPoints);
        
        if (index > 0 && index % 4 === 0 && index < points.length - 1) {
          const pulseIcon = L.divIcon({
            className: 'pulse-marker',
            html: '🔵',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });
          L.marker(points[index], { icon: pulseIcon }).addTo(map);
        }
        
        index++;
      } else {
        clearInterval(interval);
        startBtn.textContent = finishLabel;
        startBtn.style.background = '#28a745';
        
        if (warnings) {
          warnings.forEach(function(warning) {
            const warningIcon = L.divIcon({
              className: 'warning-marker',
              html: '⚠️',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            L.marker([warning.lat, warning.lng], { icon: warningIcon })
              .addTo(map)
              .bindPopup(warning.message);
          });
        }
        
        const startIcon = L.divIcon({
          className: 'start-marker',
          html: '🏁',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        const endIcon = L.divIcon({
          className: 'end-marker',
          html: '🏁',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        const startLabel = lang === 'bg' ? '🏁 Старт' : '🏁 Start';
        const endLabel = lang === 'bg' ? '🏁 Финал' : '🏁 Finish';
        
        L.marker(points[0], { icon: startIcon })
          .addTo(map)
          .bindPopup(startLabel);
        
        L.marker(points[points.length - 1], { icon: endIcon })
          .addTo(map)
          .bindPopup(endLabel);
        
        setTimeout(function() {
          startBtn.textContent = restartLabel;
          startBtn.style.background = 'linear-gradient(135deg, ' + route.color + ', ' + route.color + 'dd)';
          startBtn.disabled = false;
          startBtn.onclick = function() {
            showRouteDetails(route);
          };
        }, 2000);
      }
    }, 300);
    
    const bounds = L.latLngBounds(route.points);
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  // CSS - мобилно оптимизиран
  const style = document.createElement('style');
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; overflow: hidden; height: 100vh; }
    
    .hotel-marker-custom { background: transparent !important; border: none !important; }
    .start-marker, .end-marker { background: transparent !important; border: none !important; font-size: 20px !important; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
    .warning-marker { background: transparent !important; border: none !important; font-size: 18px !important; text-shadow: 0 0 8px rgba(255,0,0,0.4); animation: pulse-warning 1s infinite; }
    .pulse-marker { background: transparent !important; border: none !important; font-size: 12px !important; }
    
    @keyframes pulse-warning {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    #main-panel::-webkit-scrollbar { width: 3px; }
    #main-panel::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
    #main-panel::-webkit-scrollbar-thumb { background: ${HOTEL_COLORS.primary}; border-radius: 3px; }
    
    .leaflet-popup-content-wrapper { border-radius: 10px !important; border: 2px solid ${HOTEL_COLORS.primary} !important; }
    .leaflet-popup-tip { background: ${HOTEL_COLORS.primary} !important; }
    .leaflet-control-layers { border-radius: 8px !important; border: 2px solid ${HOTEL_COLORS.primary} !important; }
    .leaflet-control-zoom a { background: white !important; color: #333 !important; border: none !important; border-radius: 4px !important; }
    .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important; }
    
    #lang-toggle:hover { background: rgba(255,255,255,0.25) !important; }
    
    @media (max-width: 768px) {
      #main-panel { max-height: 60vh; border-radius: 16px 16px 0 0; }
      #main-panel .route-item { padding: 8px 10px; }
      .leaflet-control-zoom a { width: 30px !important; height: 30px !important; line-height: 30px !important; font-size: 14px !important; }
    }
    
    @media (max-width: 480px) {
      #main-panel { max-height: 55vh; border-radius: 12px 12px 0 0; }
      #main-panel .route-item { padding: 6px 8px; margin-bottom: 4px; }
      .leaflet-control-zoom a { width: 26px !important; height: 26px !important; line-height: 26px !important; font-size: 12px !important; }
    }
  `;
  document.head.appendChild(style);
});
