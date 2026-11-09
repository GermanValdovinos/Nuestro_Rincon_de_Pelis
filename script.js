// =========================================================================
// 1. CONFIGURACIÓN DEL SERVIDOR MULTIMEDIA
// =========================================================================
const DEFAULT_SERVER_URL = 'https://practical-comply-pump-dating.trycloudflare.com';

function getServerUrl() {
  const saved = localStorage.getItem('rincón_server_url');
  return (saved ? saved : DEFAULT_SERVER_URL).replace(/\/+$/, '');
}

// =========================================================================
// 2. CATÁLOGO DE LAS 5 PELÍCULAS
// =========================================================================
const movies = [
  {
    id: 1,
    title: 'Los Juegos del Hambre',
    filename: 'LosJuegosdelHambre1.mp4',
    year: '2012',
    duration: '142 min',
    genre: 'Ciencia Ficción · Acción',
    quality: 'FULL HD',
    glowColor: 'rgba(229, 9, 20, 0.22)',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    desc: 'Katniss Everdeen se ofrece como voluntaria para ocupar el lugar de su hermana menor en los Juegos del Hambre.'
  },
  {
    id: 2,
    title: 'Los Juegos del Hambre: En Llamas',
    filename: 'LosJuegosdelHambre2.mp4',
    year: '2023',
    duration: '128 min',
    genre: 'Romance · Drama',
    quality: 'FULL HD',
    glowColor: 'rgba(236, 72, 153, 0.20)',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80',
    desc: 'Segunda entrega de nuestra colección especial lista para disfrutar juntos.'
  },
  {
    id: 3,
    title: 'Los Juegos del Hambre: Sinsajo - Parte 1',
    filename: 'LosJuegosdelHambre3.mp4',
    year: '2024',
    duration: '115 min',
    genre: 'Aventura · Fantasía',
    quality: 'FULL HD',
    glowColor: 'rgba(59, 130, 246, 0.20)',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    desc: 'Tercera película de nuestra cartelera privada.'
  },
  {
    id: 4,
    title: 'Los Juegos del Hambre: Sinsajo - Parte 2',
    filename: 'LosJuegosdelHambre4.mp4',
    year: '2024',
    duration: '136 min',
    genre: 'Suspenso · Misterio',
    quality: '4K HDR',
    glowColor: 'rgba(168, 85, 247, 0.20)',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    desc: 'Cuarta película disponible en nuestro rincón de cine.'
  },
  {
    id: 5,
    title: 'Los Juegos del Hambre: Balada de Pájaros Cantores y Serpientes',
    filename: 'LosJuegosdelHambre5.mp4',
    year: '2024',
    duration: '120 min',
    genre: 'Comedia · Noche de Cine',
    quality: 'FULL HD',
    glowColor: 'rgba(245, 158, 11, 0.20)',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    desc: 'Quinta película preparada para nuestra próxima función.'
  }
];

// =========================================================================
// 3. ELEMENTOS DEL DOM
// =========================================================================
const videoWrapper = document.getElementById('videoWrapper');
const player = document.getElementById('mainPlayer');
const videoSource = document.getElementById('videoSource');
const currentTitle = document.getElementById('currentTitle');
const fullscreenTitle = document.getElementById('fullscreenTitle');
const currentDesc = document.getElementById('currentDesc');
const currentYear = document.getElementById('currentYear');
const currentDuration = document.getElementById('currentDuration');
const currentGenre = document.getElementById('currentGenre');
const currentQuality = document.getElementById('currentQuality');
const moviesList = document.getElementById('moviesList');
const catalogCount = document.getElementById('catalogCount');
const ambientGlow = document.getElementById('ambientGlow');

// Controles propios y gestos
const gestureLayer = document.getElementById('gestureLayer');
const rippleLeft = document.getElementById('rippleLeft');
const rippleRight = document.getElementById('rippleRight');
const skipLeftText = document.getElementById('skipLeftText');
const skipRightText = document.getElementById('skipRightText');
const touchPlayBtn = document.getElementById('touchPlayBtn');
const touchRewindBtn = document.getElementById('touchRewindBtn');
const touchForwardBtn = document.getElementById('touchForwardBtn');
const centerPlayIcon = document.getElementById('centerPlayIcon');
const bottomPlayIcon = document.getElementById('bottomPlayIcon');
const playPauseBtn = document.getElementById('playPauseBtn');
const skipBackBtn = document.getElementById('skipBackBtn');
const skipFwdBtn = document.getElementById('skipFwdBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeIcon = document.getElementById('volumeIcon');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeEl = document.getElementById('currentTimeEl');
const durationEl = document.getElementById('durationEl');
const timelineContainer = document.getElementById('timelineContainer');
const timelineFill = document.getElementById('timelineFill');
const timelineThumb = document.getElementById('timelineThumb');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenIcon = document.getElementById('fullscreenIcon');

// Estado del servidor y menú superior
const offlineOverlay = document.getElementById('offlineOverlay');
const retryBtn = document.getElementById('retryBtn');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const restartMovieBtn = document.getElementById('restartMovieBtn');
const cinemaModeBtn = document.getElementById('cinemaModeBtn');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const settingsDropdown = document.getElementById('settingsDropdown');
const serverUrlInput = document.getElementById('serverUrlInput');
const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');
const saveServerBtn = document.getElementById('saveServerBtn');
const resetServerBtn = document.getElementById('resetServerBtn');
const saveFeedback = document.getElementById('saveFeedback');

let activeMovie = null;
let controlsTimeout = null;

// =========================================================================
// 4. PROTECCIÓN CONTRA DESCARGAS
// =========================================================================
// Bloquear clic derecho o pulsación larga sobre el reproductor
videoWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

// Bloquear atajo Ctrl+S / Cmd+S para evitar guardar página o video
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
  }
});

// =========================================================================
// 5. REPRODUCCIÓN Y ESTADO DEL SERVIDOR
// =========================================================================
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function setServerStatus(state) {
  statusDot.className = 'status-dot';
  if (state === 'online') {
    statusDot.classList.add('online');
    statusText.textContent = 'Servidor en línea';
    offlineOverlay.classList.remove('visible');
  } else if (state === 'offline') {
    statusDot.classList.add('offline');
    statusText.textContent = 'Servidor en espera';
    offlineOverlay.classList.add('visible');
  } else {
    statusText.textContent = 'Conectando...';
  }
}

function showControlsTemporarily() {
  videoWrapper.classList.add('show-controls');
  clearTimeout(controlsTimeout);
  if (!player.paused) {
    controlsTimeout = setTimeout(() => {
      videoWrapper.classList.remove('show-controls');
    }, 3000);
  }
}

function togglePlay() {
  if (offlineOverlay.classList.contains('visible')) return;
  if (player.paused) {
    player.play().catch(() => { });
  } else {
    player.pause();
  }
  showControlsTemporarily();
}

function updatePlayIcons() {
  const iconClass = player.paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
  centerPlayIcon.className = iconClass;
  bottomPlayIcon.className = iconClass;
  if (player.paused) {
    videoWrapper.classList.add('show-controls');
  } else {
    showControlsTemporarily();
  }
}

player.addEventListener('play', updatePlayIcons);
player.addEventListener('pause', updatePlayIcons);

function loadMovie(movie, cardElement, autoPlay = false) {
  activeMovie = movie;

  currentTitle.textContent = movie.title;
  fullscreenTitle.textContent = movie.title;
  currentDesc.textContent = movie.desc;
  currentYear.textContent = movie.year;
  currentDuration.textContent = movie.duration;
  currentGenre.textContent = movie.genre;
  currentQuality.textContent = movie.quality;

  ambientGlow.style.background = `radial-gradient(circle, ${movie.glowColor} 0%, rgba(9, 11, 16, 0) 70%)`;

  setServerStatus('connecting');
  offlineOverlay.classList.remove('visible');
  timelineFill.style.width = '0%';
  timelineThumb.style.left = '0%';
  currentTimeEl.textContent = '00:00';
  durationEl.textContent = '00:00';

  videoSource.src = `${getServerUrl()}/video/${movie.filename}`;
  player.load();

  const savedTime = parseFloat(localStorage.getItem(`movie_time_${movie.id}`)) || 0;
  player.onloadedmetadata = () => {
    setServerStatus('online');
    durationEl.textContent = formatTime(player.duration);
    if (savedTime > 5 && savedTime < player.duration - 15) {
      player.currentTime = savedTime;
    }
    if (autoPlay) {
      player.play().catch(() => { });
    }
  };

  document.querySelectorAll('.movie-card').forEach(card => {
    card.classList.remove('active');
    const badge = card.querySelector('.card-badge');
    if (badge) badge.textContent = card.dataset.quality;
  });

  if (cardElement) {
    cardElement.classList.add('active');
    const activeBadge = cardElement.querySelector('.card-badge');
    if (activeBadge) activeBadge.textContent = 'REPRODUCIENDO';
  }
}

player.addEventListener('error', () => setServerStatus('offline'));
videoSource.addEventListener('error', () => setServerStatus('offline'));
player.addEventListener('canplay', () => setServerStatus('online'));

retryBtn.addEventListener('click', () => {
  if (activeMovie) {
    const activeCard = document.querySelector(`.movie-card[data-id="${activeMovie.id}"]`);
    loadMovie(activeMovie, activeCard, true);
  }
});

// =========================================================================
// 6. GESTOS TÁCTILES Y DOBLE TOQUE (ADELANTAR / RETROCEDER)
// =========================================================================
let lastTapTime = 0;
let singleTapTimer = null;
let accumulatedSkip = 0;
let skipResetTimer = null;

function skipSeconds(seconds) {
  if (!player.duration) return;
  player.currentTime = Math.max(0, Math.min(player.duration, player.currentTime + seconds));

  accumulatedSkip += seconds;
  clearTimeout(skipResetTimer);

  if (seconds < 0) {
    skipLeftText.textContent = `${accumulatedSkip} seg`;
    rippleLeft.classList.add('active');
    rippleRight.classList.remove('active');
  } else {
    skipRightText.textContent = `+${accumulatedSkip} seg`;
    rippleRight.classList.add('active');
    rippleLeft.classList.remove('active');
  }

  skipResetTimer = setTimeout(() => {
    rippleLeft.classList.remove('active');
    rippleRight.classList.remove('active');
    accumulatedSkip = 0;
  }, 650);
}

// Detectar un toque (mostrar/ocultar controles) o doble toque (saltar ±10s)
gestureLayer.addEventListener('pointerup', (e) => {
  const now = Date.now();
  const rect = gestureLayer.getBoundingClientRect();
  const posX = e.clientX - rect.left;
  const width = rect.width;

  if (now - lastTapTime < 300) {
    // Es un doble toque
    clearTimeout(singleTapTimer);
    if (posX < width * 0.4) {
      skipSeconds(-10);
    } else if (posX > width * 0.6) {
      skipSeconds(10);
    } else {
      toggleFullscreen();
    }
  } else {
    // Es un toque simple: alternar visibilidad de controles
    singleTapTimer = setTimeout(() => {
      if (videoWrapper.classList.contains('show-controls') && !player.paused) {
        videoWrapper.classList.remove('show-controls');
      } else {
        showControlsTemporarily();
      }
    }, 260);
  }

  lastTapTime = now;
});

videoWrapper.addEventListener('mousemove', () => {
  showControlsTemporarily();
});

// Botones táctiles centrales y de la barra inferior
touchPlayBtn.addEventListener('click', togglePlay);
playPauseBtn.addEventListener('click', togglePlay);
touchRewindBtn.addEventListener('click', () => { skipSeconds(-10); showControlsTemporarily(); });
touchForwardBtn.addEventListener('click', () => { skipSeconds(10); showControlsTemporarily(); });
skipBackBtn.addEventListener('click', () => { skipSeconds(-10); showControlsTemporarily(); });
skipFwdBtn.addEventListener('click', () => { skipSeconds(10); showControlsTemporarily(); });

// =========================================================================
// 7. LÍNEA DE TIEMPO, VOLUMEN Y PANTALLA COMPLETA
// =========================================================================
player.addEventListener('timeupdate', () => {
  if (!activeMovie || !player.duration) return;

  const pct = (player.currentTime / player.duration) * 100;
  timelineFill.style.width = `${pct}%`;
  timelineThumb.style.left = `${pct}%`;
  currentTimeEl.textContent = formatTime(player.currentTime);

  localStorage.setItem(`movie_time_${activeMovie.id}`, player.currentTime);
  const roundedPct = Math.min(100, Math.round(pct));
  localStorage.setItem(`movie_pct_${activeMovie.id}`, roundedPct);

  const bar = document.querySelector(`.movie-card[data-id="${activeMovie.id}"] .progress-fill`);
  if (bar) bar.style.width = `${roundedPct}%`;
});

function scrubToPosition(clientX) {
  if (!player.duration) return;
  const rect = timelineContainer.getBoundingClientRect();
  const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  player.currentTime = pos * player.duration;
}

let isScrubbing = false;
timelineContainer.addEventListener('pointerdown', (e) => {
  isScrubbing = true;
  scrubToPosition(e.clientX);
  showControlsTemporarily();
});

window.addEventListener('pointermove', (e) => {
  if (isScrubbing) scrubToPosition(e.clientX);
});

window.addEventListener('pointerup', () => {
  isScrubbing = false;
});

// Volumen
muteBtn.addEventListener('click', () => {
  player.muted = !player.muted;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
});

volumeSlider.addEventListener('input', (e) => {
  player.volume = parseFloat(e.target.value);
  player.muted = player.volume === 0;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
});

// Pantalla Completa sobre el contenedor (mantiene los gestos activos)
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (videoWrapper.requestFullscreen) {
      videoWrapper.requestFullscreen();
    } else if (videoWrapper.webkitRequestFullscreen) {
      videoWrapper.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
  const isFull = !!document.fullscreenElement;
  fullscreenIcon.className = isFull ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
});

// Reiniciar película desde cero
restartMovieBtn.addEventListener('click', () => {
  if (!activeMovie) return;
  localStorage.removeItem(`movie_time_${activeMovie.id}`);
  localStorage.removeItem(`movie_pct_${activeMovie.id}`);
  player.currentTime = 0;
  player.play().catch(() => { });
});

// =========================================================================
// 8. RENDERIZADO DEL CATÁLOGO Y MENÚ SUPERIOR
// =========================================================================
function renderMovies() {
  moviesList.innerHTML = '';
  catalogCount.textContent = `${movies.length} películas`;

  movies.forEach((movie, index) => {
    const savedPct = localStorage.getItem(`movie_pct_${movie.id}`) || 0;

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;
    card.dataset.quality = movie.quality;

    card.innerHTML = `
      <div class="card-poster" style="background-image: url('${movie.poster}')">
        <span class="card-badge">${movie.quality}</span>
        <div class="play-overlay">
          <div class="play-circle"><i class="fa-solid fa-play"></i></div>
        </div>
      </div>
      <div class="card-body">
        <span class="title">${movie.title}</span>
        <span class="meta">${movie.year} · ${movie.duration}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${savedPct}%"></div>
      </div>
    `;

    card.addEventListener('click', () => {
      loadMovie(movie, card, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    moviesList.appendChild(card);

    if (index === 0) {
      loadMovie(movie, card, false);
    }
  });
}

menuToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  serverUrlInput.value = getServerUrl();
  saveFeedback.textContent = '';
  settingsDropdown.classList.toggle('open');
  menuToggleBtn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!settingsDropdown.contains(e.target) && e.target !== menuToggleBtn) {
    settingsDropdown.classList.remove('open');
    menuToggleBtn.classList.remove('active');
  }
});

toggleVisibilityBtn.addEventListener('click', () => {
  const isPassword = serverUrlInput.type === 'password';
  serverUrlInput.type = isPassword ? 'text' : 'password';
  toggleVisibilityBtn.innerHTML = isPassword
    ? '<i class="fa-regular fa-eye-slash"></i>'
    : '<i class="fa-regular fa-eye"></i>';
});

saveServerBtn.addEventListener('click', () => {
  const rawUrl = serverUrlInput.value.trim().replace(/\/+$/, '');
  if (!rawUrl) return;

  localStorage.setItem('rincón_server_url', rawUrl);
  saveFeedback.textContent = '✓ Enlace actualizado. Reconectando...';

  setTimeout(() => {
    settingsDropdown.classList.remove('open');
    menuToggleBtn.classList.remove('active');
    if (activeMovie) {
      const activeCard = document.querySelector(`.movie-card[data-id="${activeMovie.id}"]`);
      loadMovie(activeMovie, activeCard, true);
    }
  }, 600);
});

resetServerBtn.addEventListener('click', () => {
  localStorage.removeItem('rincón_server_url');
  serverUrlInput.value = DEFAULT_SERVER_URL;
  saveFeedback.textContent = '✓ Restaurado al valor por defecto.';
});

cinemaModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('cinema-mode');
  cinemaModeBtn.classList.toggle('active');
});

renderMovies();