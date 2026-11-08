// URL base de tu túnel o servidor local
const SERVER_URL = 'https://endorsement-mentioned-automated-str.trycloudflare.com';

// Arreglo de películas: aquí agregas tus archivos con sus nombres exactos
const movies = [
  {
    id: 1,
    title: 'Película 1',
    filename: 'LosJuegosdelHambre1.mp4',
    desc: 'Primera entrega lista en tu servidor multimedia.'
  }
  /*
  // Ejemplo para cuando agregues las otras 4:
  ,
  {
    id: 2,
    title: 'Película 2',
    filename: 'pelicula2.mp4',
    desc: 'Segunda entrega de la colección.'
  }
  */
];

// Elementos del DOM
const player = document.getElementById('mainPlayer');
const videoSource = document.getElementById('videoSource');
const currentTitle = document.getElementById('currentTitle');
const currentDesc = document.getElementById('currentDesc');
const moviesList = document.getElementById('moviesList');

// Cambiar la película en reproducción
function loadMovie(movie, cardElement) {
  currentTitle.textContent = movie.title;
  currentDesc.textContent = movie.desc;

  videoSource.src = `${SERVER_URL}/video/${movie.filename}`;
  player.load();
  player.play().catch(() => {
    // Evita advertencias de bloqueo de autoplay en navegadores
  });

  document.querySelectorAll('.movie-card').forEach(card => card.classList.remove('active'));
  if (cardElement) {
    cardElement.classList.add('active');
  }
}

// Renderizar las opciones en el catálogo
function renderMovies() {
  moviesList.innerHTML = '';

  movies.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <span class="badge">MP4 HD</span>
      <span class="title">${movie.title}</span>
    `;

    card.addEventListener('click', () => loadMovie(movie, card));
    moviesList.appendChild(card);

    // Carga la primera película automáticamente al iniciar
    if (index === 0) {
      loadMovie(movie, card);
    }
  });
}

// Inicializar la interfaz
renderMovies();