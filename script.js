// =========================================================================
// 1. CONFIGURACIÓN DEL SERVIDOR MULTIMEDIA
// =========================================================================
const DEFAULT_SERVER_URL = 'https://practical-comply-pump-dating.trycloudflare.com';

function getServerUrl() {
  const saved = localStorage.getItem('rincón_server_url');
  return (saved ? saved : DEFAULT_SERVER_URL).replace(/\/+$/, '');
}

// =========================================================================
// 2. CATÁLOGO DE LAS 5 PELÍCULAS (CON CARPETA img/ Y RESPALDO)
// =========================================================================
const movies = [
  {
    id: 1,
    title: 'Los Juegos del Hambre',
    filename: 'LosJuegosdelHambre1.mp4',
    year: '2012',
    duration: '142 min',
    genre: 'Ciencia Ficción · Acción · Aventura',
    quality: 'FULL HD',
    glowColor: 'rgba(229, 9, 20, 0.22)',
    poster: 'img/imgpelicula1.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    previewStart: 180,
    desc: 'Lo que en el pasado fueron los Estados Unidos, ahora es una nación llamada Panem: un fastuoso Capitolio ejerce un control riguroso sobre los doce distritos que lo rodean y que están aislados entre sí. Cada distrito se ve obligado a enviar anualmente un chico y una chica entre los doce y los dieciocho años para que participen en los Hunger Games, que son transmitidos en directo por la televisión. Se trata de una lucha a muerte, en la que sólo puede haber un superviviente. Katniss Everdeen, una joven de dieciséis años, decide sustituir a su hermana en los juegos; pero para ella, que ya ha visto la muerte de cerca, la lucha por la supervivencia es su segunda naturaleza.'
  },
  {
    id: 2,
    title: 'Los Juegos del Hambre: En Llamas',
    filename: 'LosJuegosdelHambre2.mp4',
    year: '2013',
    duration: '146 min',
    genre: 'Ciencia Ficción · Acción · Aventura',
    quality: 'FULL HD',
    glowColor: 'rgba(236, 72, 153, 0.20)',
    poster: 'img/imgpelicula2.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=900&q=80',
    previewStart: 210,
    desc: 'Cuando Katniss Everdeen regresa sana y salva a casa tras ganar la 74ª edición anual de los Juegos del Hambre, junto a su compañero tributo Peeta Mellark. Ganar significa tener que dejar atrás a su familia y amigos, para emprender una "Gira de la Victoria" por los diferentes distritos. Por el camino, Katniss se da cuenta de que está comenzando a gestarse una rebelión, pero el Capitolio sigue manteniéndolo todo perfectamente bajo control, mientras el presidente Snow prepara la 75ª edición anual de los Juegos del Hambre, una competición que podría cambiar Panem para siempre...'
  },
  {
    id: 3,
    title: 'Los Juegos del Hambre: Sinsajo - Parte 1',
    filename: 'LosJuegosdelHambre3.mp4',
    year: '2014',
    duration: '122 min',
    genre: 'Ciencia Ficción · Aventura · Suspenso',
    quality: 'FULL HD',
    glowColor: 'rgba(59, 130, 246, 0.20)',
    poster: 'img/imgpelicula3.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    previewStart: 190,
    desc: 'Katniss Everdeen en el Distrito 13 tras, literalmente, destrozar los juegos para siempre. Bajo el liderazgo de la Presidenta Coin y contando con las advertencias de los amigos en quien confía, Katniss expande sus alas al tiempo que lucha por salvar a Peeta y a una nación conmovida por su coraje...'
  },
  {
    id: 4,
    title: 'Los Juegos del Hambre: Sinsajo - Parte 2',
    filename: 'LosJuegosdelHambre4.mp4',
    year: '2015',
    duration: '136 min',
    genre: 'Ciencia Ficción · Acción · Aventura',
    quality: 'FULL HD',
    glowColor: 'rgba(168, 85, 247, 0.20)',
    poster: 'img/imgpelicula4.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80',
    previewStart: 240,
    desc: 'Katniss Everdeen se da cuenta de que ya no sólo está en juego su supervivencia, sino también el futuro. Con Panem sumida en una guerra a gran escala, Katniss tendrá que plantar cara al presidente Snow en el enfrentamiento final. Katniss, acompañada por un grupo de sus mejores amigos, que incluye a Gale, Finnick y Peeta, emprende una misión con la unidad del Distrito 13, en la que arriesgan sus vidas para liberar a los ciudadanos de Panem y orquestan un intento de asesinato del presidente Snow, cada vez más obsesionado con destruirla. Las trampas mortales, los enemigos y las decisiones morales que aguardan a Katniss la pondrán en mayores aprietos que ninguna arena de Los Juegos del Hambre.'
  },
  {
    id: 5,
    title: 'Los Juegos del Hambre: Balada de Pájaros Cantores y Serpientes',
    filename: 'LosJuegosdelHambre5.mp4',
    year: '2023',
    duration: '157 min',
    genre: 'Drama · Acción · Aventura',
    quality: 'FULL HD',
    glowColor: 'rgba(245, 158, 11, 0.20)',
    poster: 'img/imgpelicula5.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80',
    previewStart: 200,
    desc: 'Años antes de convertirse en el tiránico Presidente de Panem, el Coriolanus Snow de 18 años es la última esperanza de su desvaneciente linaje, la una vez orgullosa familia que había caído en desgracia en un Capitolio post-guerra. Con los décimos Juegos del Hambre aproximándose rápidamente, el joven Snow se sorprende cuando es asignado como mentor de Lucy Gray Baird, la niña tributo del empobrecido Distrito 12. Pero luego de que Lucy Gray consigue toda la atención de Panem al cantar desafiante durante la ceremonia de la cosecha, Snow piensa que podría dar vuelta su suerte. Uniendo sus instintos de espectáculo y de encontrada astucia política, la carrera de Snow y Lucy Gray para sobrevivir revelerá quién es un pájaro cantor, y quién es una víbora.'
  }
];

// =========================================================================
// 3. ELEMENTOS DEL DOM
// =========================================================================
const ambientGlow = document.getElementById('ambientGlow');
const heroStage = document.getElementById('heroStage');
const playerStage = document.getElementById('playerStage');

// Elementos de la Portada Hero
const heroBackdrop = document.getElementById('heroBackdrop');
const heroQuality = document.getElementById('heroQuality');
const heroYear = document.getElementById('heroYear');
const heroDuration = document.getElementById('heroDuration');
const heroGenre = document.getElementById('heroGenre');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroPlayBtn = document.getElementById('heroPlayBtn');
const heroPlayText = document.getElementById('heroPlayText');
const heroInfoBtn = document.getElementById('heroInfoBtn');
const heroResumeBar = document.getElementById('heroResumeBar');
const heroResumeFill = document.getElementById('heroResumeFill');
const heroResumeText = document.getElementById('heroResumeText');

// Elementos del Reproductor
const videoWrapper = document.getElementById('videoWrapper');
const player = document.getElementById('mainPlayer');
const videoSource = document.getElementById('videoSource');
const backToHeroBtn = document.getElementById('backToHeroBtn');
const playerTopTitle = document.getElementById('playerTopTitle');

// Controles y Gestos
const gestureLayer = document.getElementById('gestureLayer');
const rippleLeft = document.getElementById('rippleLeft');
const rippleRight = document.getElementById('rippleRight');
const skipLeftText = document.getElementById('skipLeftText');
const skipRightText = document.getElementById('skipRightText');
const touchPlayBtn = document.getElementById('touchPlayBtn');
const touchRewindBtn = document.getElementById('touchRewindBtn');
const touchForwardBtn = document.getElementById('touchForwardBtn');
const centerPlayIcon = document.getElementById('centerPlayIcon');

// Barra Inferior
const bottomPlayBtn = document.getElementById('bottomPlayBtn');
const bottomPlayIcon = document.getElementById('bottomPlayIcon');
const bottomRewindBtn = document.getElementById('bottomRewindBtn');
const bottomForwardBtn = document.getElementById('bottomForwardBtn');
const volumeDrawer = document.getElementById('volumeDrawer');
const muteBtn = document.getElementById('muteBtn');
const volumeIcon = document.getElementById('volumeIcon');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeEl = document.getElementById('currentTimeEl');
const durationEl = document.getElementById('durationEl');
const restartPlayerBtn = document.getElementById('restartPlayerBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenIcon = document.getElementById('fullscreenIcon');

// Línea de Tiempo y Miniatura de Escena
const timelineContainer = document.getElementById('timelineContainer');
const timelineFill = document.getElementById('timelineFill');
const timelineThumb = document.getElementById('timelineThumb');
const scenePreviewBox = document.getElementById('scenePreviewBox');
const scrubPreviewVideo = document.getElementById('scrubPreviewVideo');
const sceneTimeBadge = document.getElementById('sceneTimeBadge');

// Estado del Servidor y Nodo Discreto
const signalBadge = document.getElementById('signalBadge');
const statusPing = document.getElementById('statusPing');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const offlineOverlay = document.getElementById('offlineOverlay');
const retryBtn = document.getElementById('retryBtn');
const offlineBackBtn = document.getElementById('offlineBackBtn');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const settingsDropdown = document.getElementById('settingsDropdown');
const serverUrlInput = document.getElementById('serverUrlInput');
const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');
const saveServerBtn = document.getElementById('saveServerBtn');
const resetServerBtn = document.getElementById('resetServerBtn');
const saveFeedback = document.getElementById('saveFeedback');

// Catálogo y Modal de Sinopsis
const moviesList = document.getElementById('moviesList');
const catalogCount = document.getElementById('catalogCount');
const synopsisModal = document.getElementById('synopsisModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalPoster = document.getElementById('modalPoster');
const modalQuality = document.getElementById('modalQuality');
const modalYear = document.getElementById('modalYear');
const modalDuration = document.getElementById('modalDuration');
const modalGenre = document.getElementById('modalGenre');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalProgressFill = document.getElementById('modalProgressFill');
const modalProgressText = document.getElementById('modalProgressText');
const modalPlayBtn = document.getElementById('modalPlayBtn');
const modalRestartBtn = document.getElementById('modalRestartBtn');

let activeMovie = movies[0];
let modalMovie = null;
let controlsTimeout = null;
let isForcedLandscape = false;
let lastPreviewSeek = 0;

// =========================================================================
// 4. DETECCIÓN DE DISPOSITIVO Y PROTECCIÓN CONTRA DESCARGAS
// =========================================================================
function isMobileDevice() {
  return window.matchMedia('(pointer: coarse)').matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

videoWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
  }
});

// =========================================================================
// 5. ESTADO DEL SERVIDOR Y VERIFICACIÓN SILENCIOSA DE SEÑAL
// =========================================================================
function setServerStatus(state) {
  signalBadge.className = 'signal-pill';
  statusDot.className = 'signal-dot';
  statusPing.className = 'signal-ping';

  if (state === 'online') {
    signalBadge.classList.add('online');
    statusDot.classList.add('online');
    statusPing.classList.add('online');
    statusText.textContent = 'Servidor en línea';
    offlineOverlay.classList.remove('visible');
  } else if (state === 'offline') {
    signalBadge.classList.add('offline');
    statusDot.classList.add('offline');
    statusPing.classList.add('offline');
    statusText.textContent = 'Servidor fuera de línea';
  } else {
    statusText.textContent = 'Verificando señal...';
  }
}

// Prueba silenciosa al abrir la página para mostrar si el servidor está en línea
function checkServerPulse(movie) {
  setServerStatus('connecting');
  const probe = document.createElement('video');
  probe.preload = 'metadata';
  probe.muted = true;
  probe.src = `${getServerUrl()}/video/${movie.filename}`;
  probe.onloadedmetadata = () => {
    setServerStatus('online');
    probe.src = '';
  };
  probe.onerror = () => {
    setServerStatus('offline');
  };
}

// =========================================================================
// 6. PORTADA HERO PRINCIPAL Y LANZAMIENTO AUTOMÁTICO DEL REPRODUCTOR
// =========================================================================
function resolvePosterWithFallback(movie, callback) {
  const img = new Image();
  img.onload = () => callback(movie.poster);
  img.onerror = () => callback(movie.fallbackPoster);
  img.src = movie.poster;
}

function selectMovieForHero(movie, cardElement) {
  stopAllCardPreviews();
  activeMovie = movie;

  heroQuality.textContent = movie.quality;
  heroYear.textContent = movie.year;
  heroDuration.textContent = movie.duration;
  heroGenre.textContent = movie.genre;
  heroTitle.textContent = movie.title;
  heroDesc.textContent = movie.desc;

  ambientGlow.style.background = `radial-gradient(circle, ${movie.glowColor} 0%, rgba(7, 9, 14, 0) 70%)`;

  resolvePosterWithFallback(movie, (validUrl) => {
    heroBackdrop.style.backgroundImage = `url('${validUrl}')`;
  });

  const savedPct = parseInt(localStorage.getItem(`movie_pct_${movie.id}`), 10) || 0;
  if (savedPct > 2 && savedPct < 96) {
    heroResumeBar.classList.add('visible');
    heroResumeFill.style.width = `${savedPct}%`;
    heroResumeText.textContent = `Continuar viendo (${savedPct}% visto)`;
    heroPlayText.textContent = 'Continuar película';
  } else {
    heroResumeBar.classList.remove('visible');
    heroPlayText.textContent = 'Reproducir película';
  }

  document.querySelectorAll('.movie-card').forEach(card => {
    card.classList.remove('active');
    const badge = card.querySelector('.card-badge');
    if (badge) badge.textContent = card.dataset.quality;
  });

  if (cardElement) {
    cardElement.classList.add('active');
    const activeBadge = cardElement.querySelector('.card-badge');
    if (activeBadge) activeBadge.textContent = 'SELECCIONADA';
  }
}

async function startPlaybackExperience(movie, startFromZero = false) {
  stopAllCardPreviews();
  activeMovie = movie;

  if (startFromZero) {
    localStorage.removeItem(`movie_time_${movie.id}`);
    localStorage.removeItem(`movie_pct_${movie.id}`);
  }

  // Cambiar de la Portada Hero a la Sala de Reproducción
  heroStage.classList.add('hidden');
  playerStage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  playerTopTitle.textContent = movie.title;
  offlineOverlay.classList.remove('visible');
  timelineFill.style.width = '0%';
  timelineThumb.style.left = '0%';
  currentTimeEl.textContent = '00:00';
  durationEl.textContent = '00:00';

  const streamUrl = `${getServerUrl()}/video/${movie.filename}`;
  videoSource.src = streamUrl;
  scrubPreviewVideo.src = streamUrl;
  player.load();

  // En móvil, entrar a pantalla completa y rotar automáticamente al iniciar
  if (isMobileDevice()) {
    await enterFullscreenAndRotate();
  }

  const savedTime = parseFloat(localStorage.getItem(`movie_time_${movie.id}`)) || 0;
  player.onloadedmetadata = () => {
    setServerStatus('online');
    durationEl.textContent = formatTime(player.duration);
    if (!startFromZero && savedTime > 5 && savedTime < player.duration - 15) {
      player.currentTime = savedTime;
    }
    player.play().catch(() => { });
  };

  showControlsTemporarily();
}

async function closePlayerToHero() {
  player.pause();

  if (isForcedLandscape) {
    disableForcedLandscape();
  }
  if (document.fullscreenElement && document.exitFullscreen) {
    await document.exitFullscreen().catch(() => { });
  } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  if (screen.orientation && screen.orientation.unlock) {
    try { screen.orientation.unlock(); } catch (_) { }
  }

  playerStage.classList.add('hidden');
  heroStage.classList.remove('hidden');

  const activeCard = document.querySelector(`.movie-card[data-id="${activeMovie.id}"]`);
  selectMovieForHero(activeMovie, activeCard);
}

heroPlayBtn.addEventListener('click', () => startPlaybackExperience(activeMovie, false));
heroInfoBtn.addEventListener('click', () => openSynopsisModal(activeMovie));
backToHeroBtn.addEventListener('click', closePlayerToHero);
offlineBackBtn.addEventListener('click', closePlayerToHero);

// =========================================================================
// 7. CONTROLES DE REPRODUCCIÓN, TIEMPO DE VISIBILIDAD Y GESTOS
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

// En móvil dura 5.5 segundos en pantalla; en laptop 3.2 segundos
function showControlsTemporarily() {
  videoWrapper.classList.add('show-controls');
  clearTimeout(controlsTimeout);
  const hideDelay = isMobileDevice() ? 5500 : 3200;

  if (!player.paused) {
    controlsTimeout = setTimeout(() => {
      videoWrapper.classList.remove('show-controls');
      volumeDrawer.classList.remove('expanded');
    }, hideDelay);
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
player.addEventListener('error', () => {
  setServerStatus('offline');
  offlineOverlay.classList.add('visible');
});
videoSource.addEventListener('error', () => {
  setServerStatus('offline');
  offlineOverlay.classList.add('visible');
});
player.addEventListener('canplay', () => setServerStatus('online'));

retryBtn.addEventListener('click', () => {
  startPlaybackExperience(activeMovie, false);
});

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
    skipLeftText.textContent = `${accumulatedSkip}s`;
    rippleLeft.classList.add('active');
    rippleRight.classList.remove('active');
  } else {
    skipRightText.textContent = `+${accumulatedSkip}s`;
    rippleRight.classList.add('active');
    rippleLeft.classList.remove('active');
  }

  skipResetTimer = setTimeout(() => {
    rippleLeft.classList.remove('active');
    rippleRight.classList.remove('active');
    accumulatedSkip = 0;
  }, 650);
}

function getRelativeTapRatio(e, element) {
  const rect = element.getBoundingClientRect();
  if (videoWrapper.classList.contains('forced-landscape')) {
    return (e.clientY - rect.top) / rect.height;
  }
  return (e.clientX - rect.left) / rect.width;
}

// Comportamiento diferenciado entre Laptop (Clic pausa / Doble clic salta) y Móvil (Tap muestra controles / Doble tap salta)
gestureLayer.addEventListener('pointerup', (e) => {
  const now = Date.now();
  const ratioX = getRelativeTapRatio(e, gestureLayer);
  const isTouch = e.pointerType === 'touch' || isMobileDevice();

  if (now - lastTapTime < 300) {
    // Doble toque o Doble clic
    clearTimeout(singleTapTimer);
    if (ratioX < 0.42) {
      skipSeconds(-10);
    } else if (ratioX > 0.58) {
      skipSeconds(10);
    } else {
      toggleFullscreen();
    }
    showControlsTemporarily();
  } else {
    singleTapTimer = setTimeout(() => {
      if (isTouch) {
        // En móvil: un tap muestra los controles (o los oculta si ya estaban y está reproduciendo)
        if (!videoWrapper.classList.contains('show-controls')) {
          showControlsTemporarily();
        } else if (!player.paused) {
          videoWrapper.classList.remove('show-controls');
        }
      } else {
        // En Laptop/Web: un clic sobre cualquier parte de la pantalla pausa o despausa
        togglePlay();
      }
    }, 250);
  }

  lastTapTime = now;
});

// En Laptop: mover el cursor sobre la pantalla muestra los controles
videoWrapper.addEventListener('mousemove', () => {
  showControlsTemporarily();
});

touchPlayBtn.addEventListener('click', togglePlay);
bottomPlayBtn.addEventListener('click', togglePlay);
touchRewindBtn.addEventListener('click', () => { skipSeconds(-10); showControlsTemporarily(); });
touchForwardBtn.addEventListener('click', () => { skipSeconds(10); showControlsTemporarily(); });
bottomRewindBtn.addEventListener('click', () => { skipSeconds(-10); showControlsTemporarily(); });
bottomForwardBtn.addEventListener('click', () => { skipSeconds(10); showControlsTemporarily(); });

restartPlayerBtn.addEventListener('click', () => {
  player.currentTime = 0;
  player.play().catch(() => { });
  showControlsTemporarily();
});

// =========================================================================
// 8. MINIATURA DE ESCENA EN BARRA DE PROGRESO, VOLUMEN Y ROTACIÓN MÓVIL
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

function getTimelineRatio(e) {
  const rect = timelineContainer.getBoundingClientRect();
  let pos = 0;
  if (videoWrapper.classList.contains('forced-landscape')) {
    pos = (e.clientY - rect.top) / rect.height;
  } else {
    pos = (e.clientX - rect.left) / rect.width;
  }
  return Math.max(0, Math.min(1, pos));
}

function updateSceneThumbnailPreview(e) {
  if (!player.duration) return;
  const ratio = getTimelineRatio(e);
  const targetTime = ratio * player.duration;

  scenePreviewBox.classList.add('visible');
  const clampedPct = Math.max(8, Math.min(92, ratio * 100));
  scenePreviewBox.style.left = `${clampedPct}%`;
  sceneTimeBadge.textContent = formatTime(targetTime);

  const now = Date.now();
  if (now - lastPreviewSeek > 180 && scrubPreviewVideo.readyState >= 1) {
    lastPreviewSeek = now;
    scrubPreviewVideo.currentTime = targetTime;
  }
}

let isScrubbing = false;

timelineContainer.addEventListener('pointermove', (e) => {
  updateSceneThumbnailPreview(e);
  if (isScrubbing && player.duration) {
    player.currentTime = getTimelineRatio(e) * player.duration;
  }
});

timelineContainer.addEventListener('pointerleave', () => {
  if (!isScrubbing) {
    scenePreviewBox.classList.remove('visible');
  }
});

timelineContainer.addEventListener('pointerdown', (e) => {
  isScrubbing = true;
  updateSceneThumbnailPreview(e);
  if (player.duration) {
    player.currentTime = getTimelineRatio(e) * player.duration;
  }
  showControlsTemporarily();
});

window.addEventListener('pointerup', () => {
  if (isScrubbing) {
    isScrubbing = false;
    scenePreviewBox.classList.remove('visible');
  }
});

// Volumen desplegable al pasar el mouse o al dar tap
muteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isMobileDevice() && !volumeDrawer.classList.contains('expanded')) {
    volumeDrawer.classList.add('expanded');
    showControlsTemporarily();
    return;
  }
  player.muted = !player.muted;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  showControlsTemporarily();
});

volumeSlider.addEventListener('input', (e) => {
  player.volume = parseFloat(e.target.value);
  player.muted = player.volume === 0;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  showControlsTemporarily();
});

// Pantalla completa y rotación automática
async function enterFullscreenAndRotate() {
  try {
    if (videoWrapper.requestFullscreen) {
      await videoWrapper.requestFullscreen();
    } else if (videoWrapper.webkitRequestFullscreen) {
      await videoWrapper.webkitRequestFullscreen();
    }

    if (isMobileDevice()) {
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape');
        } catch (_) {
          setTimeout(() => {
            if (window.innerHeight > window.innerWidth) enableForcedLandscape();
          }, 250);
        }
      } else if (window.innerHeight > window.innerWidth) {
        enableForcedLandscape();
      }
    }
  } catch (_) {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
      enableForcedLandscape();
    }
  }
}

async function toggleFullscreen() {
  const isNativeFull = !!(document.fullscreenElement || document.webkitFullscreenElement);

  if (!isNativeFull && !isForcedLandscape) {
    await enterFullscreenAndRotate();
  } else {
    if (isForcedLandscape) disableForcedLandscape();
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen().catch(() => { });
    } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    if (screen.orientation && screen.orientation.unlock) {
      try { screen.orientation.unlock(); } catch (_) { }
    }
  }
}

function enableForcedLandscape() {
  isForcedLandscape = true;
  videoWrapper.classList.add('forced-landscape');
  document.body.classList.add('landscape-locked');
  fullscreenIcon.className = 'fa-solid fa-compress';
}

function disableForcedLandscape() {
  isForcedLandscape = false;
  videoWrapper.classList.remove('forced-landscape');
  document.body.classList.remove('landscape-locked');
  fullscreenIcon.className = 'fa-solid fa-expand';
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
  const isFull = !!document.fullscreenElement;
  fullscreenIcon.className = (isFull || isForcedLandscape) ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
});

// =========================================================================
// 9. MODAL ANIMADO DE SINOPSIS Y DETALLES
// =========================================================================
function openSynopsisModal(movie) {
  modalMovie = movie;
  modalQuality.textContent = movie.quality;
  modalYear.textContent = movie.year;
  modalDuration.textContent = movie.duration;
  modalGenre.textContent = movie.genre;
  modalTitle.textContent = movie.title;
  modalDesc.textContent = movie.desc;

  resolvePosterWithFallback(movie, (validUrl) => {
    modalPoster.src = validUrl;
  });

  const savedPct = parseInt(localStorage.getItem(`movie_pct_${movie.id}`), 10) || 0;
  modalProgressFill.style.width = `${savedPct}%`;
  modalProgressText.textContent = savedPct > 0
    ? `Progreso guardado en tu navegador: ${savedPct}%`
    : 'Aún no has comenzado esta película';

  synopsisModal.classList.add('open');
}

function closeSynopsisModal() {
  synopsisModal.classList.remove('open');
}

closeModalBtn.addEventListener('click', closeSynopsisModal);
synopsisModal.addEventListener('click', (e) => {
  if (e.target === synopsisModal) closeSynopsisModal();
});

modalPlayBtn.addEventListener('click', () => {
  if (!modalMovie) return;
  closeSynopsisModal();
  startPlaybackExperience(modalMovie, false);
});

modalRestartBtn.addEventListener('click', () => {
  if (!modalMovie) return;
  closeSynopsisModal();
  startPlaybackExperience(modalMovie, true);
});

// =========================================================================
// 10. RENDERIZADO DE LA CARTELERA G&V ❤️
// =========================================================================
let hoverPreviewTimer = null;

function startCardPreview(card, movie) {
  stopAllCardPreviews(card);
  card.classList.add('previewing');

  const previewVideo = card.querySelector('.card-preview-video');
  if (!previewVideo) return;

  const startSec = movie.previewStart || 180;
  const endSec = startSec + 15;

  if (!previewVideo.src) {
    previewVideo.src = `${getServerUrl()}/video/${movie.filename}#t=${startSec},${endSec}`;
  }

  previewVideo.onloadedmetadata = () => {
    previewVideo.currentTime = startSec;
    previewVideo.play().catch(() => { });
  };

  if (previewVideo.readyState >= 1) {
    previewVideo.currentTime = startSec;
    previewVideo.play().catch(() => { });
  }
}

function stopCardPreview(card) {
  clearTimeout(hoverPreviewTimer);
  card.classList.remove('previewing');
  const previewVideo = card.querySelector('.card-preview-video');
  if (previewVideo) previewVideo.pause();
}

function stopAllCardPreviews(exceptCard = null) {
  document.querySelectorAll('.movie-card.previewing').forEach(c => {
    if (c !== exceptCard) stopCardPreview(c);
  });
}

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
      <div class="card-poster">
        <img 
          class="poster-img" 
          src="${movie.poster}" 
          alt="${movie.title}" 
          onerror="this.onerror=null; this.src='${movie.fallbackPoster}';">
        <video class="card-preview-video" muted playsinline preload="none"></video>
        <span class="card-badge">${movie.quality}</span>
        <div class="card-hover-overlay">
          <p class="hover-synopsis-snippet">${movie.desc}</p>
          <button type="button" class="hover-play-btn">
            <i class="fa-solid fa-play"></i> Ver Película
          </button>
        </div>
      </div>
      <div class="card-body">
        <span class="title">${movie.title}</span>
        <div class="card-footer-row">
          <span class="meta">${movie.year} · ${movie.duration}</span>
          <button type="button" class="btn-card-synopsis" title="Ver sinopsis y detalles">
            <i class="fa-solid fa-book-open"></i> Sinopsis
          </button>
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${savedPct}%"></div>
      </div>
    `;

    // En Laptop: avance silencioso al pasar el cursor
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      hoverPreviewTimer = setTimeout(() => startCardPreview(card, movie), 340);
    });

    card.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      stopCardPreview(card);
    });

    // Botón Sinopsis: abre el modal animado con todos los detalles
    const synopsisBtn = card.querySelector('.btn-card-synopsis');
    synopsisBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSynopsisModal(movie);
    });

    // Botón Ver Película directo desde el hover
    const hoverPlayBtn = card.querySelector('.hover-play-btn');
    hoverPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectMovieForHero(movie, card);
      startPlaybackExperience(movie, false);
    });

    // Al tocar el póster: actualiza la Gran Portada Hero arriba (o si ya está en reproducción, cambia la película)
    card.addEventListener('click', () => {
      selectMovieForHero(movie, card);
      if (!playerStage.classList.contains('hidden')) {
        startPlaybackExperience(movie, false);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    moviesList.appendChild(card);

    if (index === 0) {
      selectMovieForHero(movie, card);
      checkServerPulse(movie);
    }
  });
}

// =========================================================================
// 11. AJUSTE ULTRA DISCRETO DE NODO BACKEND
// =========================================================================
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
  saveFeedback.textContent = '✓ Nodo actualizado.';
  checkServerPulse(activeMovie);

  setTimeout(() => {
    settingsDropdown.classList.remove('open');
    menuToggleBtn.classList.remove('active');
    if (!playerStage.classList.contains('hidden')) {
      startPlaybackExperience(activeMovie, false);
    }
  }, 500);
});

resetServerBtn.addEventListener('click', () => {
  localStorage.removeItem('rincón_server_url');
  serverUrlInput.value = DEFAULT_SERVER_URL;
  saveFeedback.textContent = '✓ Restaurado al nodo original.';
  checkServerPulse(activeMovie);
});

renderMovies();