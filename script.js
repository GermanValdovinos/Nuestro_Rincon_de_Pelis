// =========================================================================
// 1. CONFIGURACIÓN DEL SERVIDOR MULTIMEDIA
// =========================================================================
const DEFAULT_SERVER_URL = 'https://practical-comply-pump-dating.trycloudflare.com';

function getServerUrl() {
  const saved = localStorage.getItem('rincón_server_url');
  return (saved ? saved : DEFAULT_SERVER_URL).replace(/\/+$/, '');
}

// =========================================================================
// 2. CATÁLOGO DE LAS 5 PELÍCULAS (CON CARPETA img/ Y MINI-TRAILER)
// =========================================================================
// Coloca tus portadas en la carpeta "img/" con los nombres juegos1.jpg ... juegos5.jpg
// Si aún no existe la imagen en tu carpeta, se usará fallbackPoster automáticamente.
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
    fallbackPoster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    previewStart: 180, // Segundo donde inicia el fragmento de avance (minuto 3:00)
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
    fallbackPoster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80',
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
    fallbackPoster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
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
    fallbackPoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    previewStart: 240,
    desc: 'Katniss Everdeen se da cuenta de que ya no sólo está en juego su supervivencia, sino también el futuro. Con Panem sumida en una guerra a gran escala, Katniss tendrá que plantar cara al presidente Snow en el enfrentamiento final. Katniss, acompañada por un grupo de sus mejores amigos, que incluye a Gale, Finnick y Peeta, emprende una misión con la unidad del Distrito 13, en la que arriesgan sus vidas para liberar a los ciudadanos de Panem y orquestan un intento de asesinato del presidente Snow, cada vez más obsesionado con destruirla. Las trampas mortales, los enemigos y las decisiones morales que aguardan a Katniss la pondrán en mayores aprietos que ninguna arena de Los Juegos del Hambre.'
  },
  {
    id: 5,
    title: 'Los Juegos del Hambre: Balada de Pájaros Cantores y Serpientes',
    filename: 'LosJuegosdelHambre5.mp4',
    year: '2023',
    duration: '157 min',
    genre: 'Comedia · Noche de Cine',
    quality: 'FULL HD',
    glowColor: 'rgba(245, 158, 11, 0.20)',
    poster: 'img/imgpelicula5.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    previewStart: 200,
    desc: 'Años antes de convertirse en el tiránico Presidente de Panem, el Coriolanus Snow de 18 años es la última esperanza de su desvaneciente linaje, la una vez orgullosa familia que había caído en desgracia en un Capitolio post-guerra. Con los décimos Juegos del Hambre aproximándose rápidamente, el joven Snow se sorprende cuando es asignado como mentor de Lucy Gray Baird, la niña tributo del empobrecido Distrito 12. Pero luego de que Lucy Gray consigue toda la atención de Panem al cantar desafiante durante la ceremonia de la cosecha, Snow piensa que podría dar vuelta su suerte. Uniendo sus instintos de espectáculo y de encontrada astucia política, la carrera de Snow y Lucy Gray para sobrevivir revelerá quién es un pájaro cantor, y quién es una víbora.'
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

// Controles propios y gestos (Sin botones duplicados)
const gestureLayer = document.getElementById('gestureLayer');
const rippleLeft = document.getElementById('rippleLeft');
const rippleRight = document.getElementById('rippleRight');
const skipLeftText = document.getElementById('skipLeftText');
const skipRightText = document.getElementById('skipRightText');
const touchPlayBtn = document.getElementById('touchPlayBtn');
const touchRewindBtn = document.getElementById('touchRewindBtn');
const touchForwardBtn = document.getElementById('touchForwardBtn');
const centerPlayIcon = document.getElementById('centerPlayIcon');
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
let isForcedLandscape = false;

// =========================================================================
// 4. DETECCIÓN DE MÓVIL Y PROTECCIÓN CONTRA DESCARGAS
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
  centerPlayIcon.className = player.paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
  if (player.paused) {
    videoWrapper.classList.add('show-controls');
  } else {
    showControlsTemporarily();
  }
}

player.addEventListener('play', updatePlayIcons);
player.addEventListener('pause', updatePlayIcons);

function loadMovie(movie, cardElement, autoPlay = false) {
  stopAllCardPreviews();
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
// 6. GESTOS TÁCTILES Y CONTROLES CENTRALES
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

// Detectar coordenadas incluso cuando el reproductor está rotado 90° en móvil
function getRelativeTapRatio(e, element) {
  const rect = element.getBoundingClientRect();
  if (videoWrapper.classList.contains('forced-landscape')) {
    return (e.clientY - rect.top) / rect.height;
  }
  return (e.clientX - rect.left) / rect.width;
}

gestureLayer.addEventListener('pointerup', (e) => {
  const now = Date.now();
  const ratioX = getRelativeTapRatio(e, gestureLayer);

  if (now - lastTapTime < 300) {
    clearTimeout(singleTapTimer);
    if (ratioX < 0.4) {
      skipSeconds(-10);
    } else if (ratioX > 0.6) {
      skipSeconds(10);
    } else {
      toggleFullscreen();
    }
  } else {
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

touchPlayBtn.addEventListener('click', togglePlay);
touchRewindBtn.addEventListener('click', () => { skipSeconds(-10); showControlsTemporarily(); });
touchForwardBtn.addEventListener('click', () => { skipSeconds(10); showControlsTemporarily(); });

// =========================================================================
// 7. LÍNEA DE TIEMPO, VOLUMEN Y PANTALLA COMPLETA CON GIRO AUTOMÁTICO
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

function scrubToPosition(e) {
  if (!player.duration) return;
  const rect = timelineContainer.getBoundingClientRect();
  let pos = 0;

  if (videoWrapper.classList.contains('forced-landscape')) {
    pos = (e.clientY - rect.top) / rect.height;
  } else {
    pos = (e.clientX - rect.left) / rect.width;
  }

  pos = Math.max(0, Math.min(1, pos));
  player.currentTime = pos * player.duration;
}

let isScrubbing = false;
timelineContainer.addEventListener('pointerdown', (e) => {
  isScrubbing = true;
  scrubToPosition(e);
  showControlsTemporarily();
});

window.addEventListener('pointermove', (e) => {
  if (isScrubbing) scrubToPosition(e);
});

window.addEventListener('pointerup', () => {
  isScrubbing = false;
});

muteBtn.addEventListener('click', () => {
  player.muted = !player.muted;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
});

volumeSlider.addEventListener('input', (e) => {
  player.volume = parseFloat(e.target.value);
  player.muted = player.volume === 0;
  volumeIcon.className = player.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
});

// Pantalla Completa inteligente con rotación automática en móvil
async function toggleFullscreen() {
  const isNativeFull = !!(document.fullscreenElement || document.webkitFullscreenElement);

  if (!isNativeFull && !isForcedLandscape) {
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
            // Si el sistema bloquea el giro nativo, aplicamos giro horizontal por CSS
            setTimeout(() => {
              if (window.innerHeight > window.innerWidth) {
                enableForcedLandscape();
              }
            }, 250);
          }
        } else if (window.innerHeight > window.innerWidth) {
          enableForcedLandscape();
        }
      }
    } catch (_) {
      // Respaldo directo para navegadores móviles como iOS Safari
      if (isMobileDevice()) {
        enableForcedLandscape();
      }
    }
  } else {
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
  if (!isFull && !isForcedLandscape) {
    fullscreenIcon.className = 'fa-solid fa-expand';
    if (screen.orientation && screen.orientation.unlock) {
      try { screen.orientation.unlock(); } catch (_) { }
    }
  } else {
    fullscreenIcon.className = 'fa-solid fa-compress';
  }
});

// Si el usuario gira físicamente el teléfono a horizontal, quitar el giro CSS redundante
window.addEventListener('resize', () => {
  if (isForcedLandscape && window.innerWidth > window.innerHeight) {
    videoWrapper.classList.remove('forced-landscape');
  }
});

restartMovieBtn.addEventListener('click', () => {
  if (!activeMovie) return;
  localStorage.removeItem(`movie_time_${activeMovie.id}`);
  localStorage.removeItem(`movie_pct_${activeMovie.id}`);
  player.currentTime = 0;
  player.play().catch(() => { });
});

// =========================================================================
// 8. MINI-TRAILERS EN VIVO Y RENDERIZADO DEL CATÁLOGO
// =========================================================================
let hoverPreviewTimer = null;

function startCardPreview(card, movie) {
  stopAllCardPreviews(card);
  card.classList.add('previewing');

  const previewBtn = card.querySelector('.btn-mobile-preview');
  if (previewBtn) previewBtn.classList.add('active');

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

  previewVideo.ontimeupdate = () => {
    if (previewVideo.currentTime >= endSec) {
      previewVideo.currentTime = startSec;
    }
  };
}

function stopCardPreview(card) {
  clearTimeout(hoverPreviewTimer);
  card.classList.remove('previewing');

  const previewBtn = card.querySelector('.btn-mobile-preview');
  if (previewBtn) previewBtn.classList.remove('active');

  const previewVideo = card.querySelector('.card-preview-video');
  if (previewVideo) {
    previewVideo.pause();
  }
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
        <span class="preview-indicator"><i class="fa-solid fa-film"></i> AVANCE</span>
        <div class="card-hover-info">
          <p class="hover-synopsis">${movie.desc}</p>
          <div class="hover-play-cta">
            <i class="fa-solid fa-play"></i> Ver Película
          </div>
        </div>
      </div>
      <div class="card-body">
        <span class="title">${movie.title}</span>
        <div class="card-meta-row">
          <span class="meta">${movie.year} · ${movie.duration}</span>
          <button type="button" class="btn-mobile-preview" title="Ver avance y sinopsis">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Trailer
          </button>
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${savedPct}%"></div>
      </div>
    `;

    // En Laptop/PC: al pasar el cursor se expande, muestra sinopsis y reproduce el fragmento
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      hoverPreviewTimer = setTimeout(() => {
        startCardPreview(card, movie);
      }, 320);
    });

    card.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      stopCardPreview(card);
    });

    // En Móvil: botón "Trailer" en la tarjeta para ver el avance y la sinopsis sin cambiar la película actual
    const mobilePreviewBtn = card.querySelector('.btn-mobile-preview');
    mobilePreviewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (card.classList.contains('previewing')) {
        stopCardPreview(card);
      } else {
        startCardPreview(card, movie);
      }
    });

    // Clic general en la tarjeta carga la película arriba
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

// =========================================================================
// 9. MENÚ SUPERIOR DISCRETO Y MODO CINE
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