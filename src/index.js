document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    const movieListContainer = document.getElementById("movie-list");

    
    const moviesPerPage = 9; // Cantidad de películas por página
    let currentPage = 1; // Página actual

    const addedMovies = new Set();

    // Función para obtener películas populares
    async function fetchPopularMovies() {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
  
        // Mostrar las películas populares
        data.results.forEach(async (movie) => {
          const movieContainer = document.getElementById("btn-open-modal");

  
          const image = document.createElement("img");
          image.src = IMAGE_BASE_URL + movie.poster_path;
          image.alt = movie.title;
  
          const title = document.createElement("h2");
          title.textContent = movie.title;
  
          const genre = document.createElement("p");
          const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
          const genresData = await genresResponse.json();
          const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
          genre.textContent = `${genreNames}`;
  
          movieContainer.appendChild(image);
          movieContainer.appendChild(title);
          movieContainer.appendChild(genre);
          movieListContainer.appendChild(movieContainer);
          

          //hacer que no se repitan las peliculas.
          if (!addedMovies.has(movie.id)) {
            addedMovies.add(movie.id);
          }

    
        });
      } catch (error) {
        console.log("Error al obtener películas populares:", error);
      }
    }

        // Llama a la función para obtener películas populares
        fetchPopularMovies(currentPage);

        // Agregar botones de paginación
    });
  



// Boton my library 
const btnMyLibrary = document.querySelector('.my-library-btn');
const conteinerLibrarySearch = document.querySelector(
  '.search-container'
);

btnMyLibrary.addEventListener('click', event => {
    event.preventDefault();
    conteinerLibrarySearch.innerHTML = '';
    const wachedBtn = document.createElement('button');
    const queveBtn = document.createElement('button');
    wachedBtn.textContent = 'WATCHED';
    queveBtn.textContent = 'QUEVE';
    wachedBtn.classList.add("library-container__button--active");
    queveBtn.classList.add('library-container__button--transparent');
    conteinerLibrarySearch.classList.add('library-container__button')
    conteinerLibrarySearch.append(wachedBtn, queveBtn);
});



const apiKey = "d62e671e72a3270f6005a951e144404c"
function showMovieModal(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });

}















const config = {
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJlNjcxZTcyYTMyNzBmNjAwNWE5NTFlMTQ0NDA0YyIsInN1YiI6IjY1MzliYWFkMDkxZTYyMDBhY2JjZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kl2esxdpMndC8Ncdl_j46puXA1C37-yIPMFWbeO-_d4' // Cambio aquí
  }
};

let page = 1;

function moviesPopularies(){
  fetch(`https://api.themoviedb.org/3/trending/all/day?page=${page}&language=en-US`, config)
  .then(response => response.json())
  .then(data => console.log(data));
  
}

let search = "batman";
page = 1;
fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, config) // Cambio aquí
  .then(response => response.json())
  .then(data => console.log(data.results.map(d => d.title + " " + d.release_date)));

let movieID = 2661;
fetch(`https://api.themoviedb.org/3/movie/${movieID}`, config)
  .then(response => response.json())
  .then(data => console.log(data));





//modal
const btnAbrirModal = document.getElementById("btn-open-modal");
const btnCerrarModal = document.getElementById("btn-close-modal");
const modal = document.querySelector('#modal');

btnAbrirModal.addEventListener('click', () => {
  modal.showModal();
});

btnCerrarModal.addEventListener('click', () => {
  modal.close();
});