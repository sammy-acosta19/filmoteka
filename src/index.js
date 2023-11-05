document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    // Elemento donde se mostrarán las películas
    const movieListContainer = document.getElementById("movie-list");
    const paginationNumbers = document.getElementById("pagination-numbers");
    let currentPage = 1;

    const moviesPerPage = 9;
  
    // Función para obtener películas populares
    async function fetchPopularMovies(page) {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        movieListContainer.innerHTML = "";

        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
  
        // Mostrar las películas populares
        data.results.slice(startIndex, endIndex).forEach(async (movie) => {
          const movieContainer = document.createElement("div");
          movieContainer.id = `movie-${movie.id}`;
          movieContainer.classList.add("movie");
          movieContainer.style.width = "274px";
          movieContainer.style.height = "480px";
          movieContainer.style.marginBottom = "-70px";
          movieContainer.style.marginTop = "100px";
          movieContainer.style.marginLeft = "40px";
  
          const image = document.createElement("img");
          image.src = IMAGE_BASE_URL + movie.poster_path;
          image.alt = movie.title;
          image.style.borderRadius = "5px";
  
          const title = document.createElement("h2");
          title.textContent = movie.title;
          title.style.color = "black";
          title.style.fontFamily = "Roboto";
          title.style.fontWeight = "500px";
          title.style.fontSize = "15px";

          const divcontainerPreInfo = document.createElement("div");
          divcontainerPreInfo.style.display = "flex";
  
          const genre = document.createElement("p");
          const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
          const genresData = await genresResponse.json();
          const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
          genre.textContent = `${genreNames}     |`;
          genre.style.color = "rgba(255, 107, 1, 1)";
          genre.style.fontFamily = "Roboto";
          genre.style.fontWeight = "500px";
          genre.style.fontSize = "15px";

          const releaseYear = document.createElement("p");
          const releaseDate = new Date(movie.release_date);
          releaseYear.textContent = `${releaseDate.getFullYear()}`;
          releaseYear.style.color = "rgba(255, 107, 1, 1)";
          releaseYear.style.fontFamily = "Roboto";
          releaseYear.style.fontWeight = "500px";
          releaseYear.style.fontSize = "15px";
          releaseYear.style.marginLeft = "5px";
          releaseYear.style.marginRight = "5px";

          const containerRatingOrange = document.createElement("div");
          containerRatingOrange.style.backgroundColor = "rgba(255, 107, 1, 1)";
          containerRatingOrange.style.width = "36px";
          containerRatingOrange.style.height = "16px";
          containerRatingOrange.style.borderRadius = "5px";

          const rating = document.createElement("p");
          rating.textContent = `${movie.vote_average}`;
          rating.style.color = "white";
          rating.style.fontFamily = "Roboto";
          rating.style.fontWeight = "500px";
          rating.style.fontSize = "13px";
          rating.style.textAlign = "center";
  
          movieListContainer.appendChild(movieContainer);
          movieContainer.appendChild(image);
          movieContainer.appendChild(title);
          movieContainer.appendChild(divcontainerPreInfo);
          divcontainerPreInfo.appendChild(genre);
          divcontainerPreInfo.appendChild(releaseYear);
          divcontainerPreInfo.appendChild(containerRatingOrange);
          containerRatingOrange.appendChild(rating);

          const btnAbrirModal = movieContainer;
          const btnCerrarModal = document.getElementById("btn-close-modal");
          const modal = document.querySelector('#modal');


          btnAbrirModal.addEventListener('click', () => {
            modal.showModal();
          
            const agregarHtmlModal = document.getElementById("add-movies-modal");
          
            const movieId = movie.id;
            const movieDetailsUrl = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
          
            fetch(movieDetailsUrl)
              .then(response => response.json())
              .then(data => {
                const contenedorAddModal1 = document.querySelector(".contenedor-add-modal-1");
                contenedorAddModal1.innerHTML = '';

                const imagePathModal = document.createElement("img");
                imagePathModal.src = IMAGE_BASE_URL + data.poster_path;
                imagePathModal.alt = data.title;
                contenedorAddModal1.appendChild(imagePathModal);

                const addPreInfoValor = document.querySelector(".container-preInfo-valor");
                addPreInfoValor.innerHTML = `<p class="preinfo-valor-1 description-movies-valor">${data.vote_average}/${data.vote_count}</p>
                  <p class="preinfo-valor-2 description-movies-valor">${data.popularity}</p>
                  <p class="preinfo-valor-3 description-movies-valor">${data.original_title}</p>
                  <p class="preinfo-valor-4 description-movies-valor">${data.genres.map(genre => genre.name).join(", ")}</p>`;
                  
                const descriptionModal = document.querySelector(".description");
                descriptionModal.textContent = data.overview;
              });
          });
          
          btnCerrarModal.addEventListener('click', () => {
            modal.close();
          });

        });

        paginationNumbers.innerHTML = "";
        const totalPages = Math.ceil(data.results.length / moviesPerPage);
        const maxPages = Math.min(totalPages, 20);
  
        for (let i = 1; i <= maxPages; i++) {
          const button = document.createElement("button");
          button.classList.add("pagination-number");
          button.textContent = i;
          if (i === currentPage) {
            button.classList.add("active");
          }
          button.addEventListener("click", () => {
            currentPage = i;
            fetchPopularMovies(currentPage);
          });
          paginationNumbers.appendChild(button);
        }
  
        if (totalPages > 20) {
          const dots = document.createElement("span");
          dots.textContent = "...";
          paginationNumbers.appendChild(dots);
        }

        const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPopularMovies(currentPage);
      }
    });

    nextButton.addEventListener("click", () => {
      currentPage++;
      fetchPopularMovies(currentPage);
    });

      } catch (error) {
        console.error("Error al obtener películas populares:", error);
      }
    }
  
    fetchPopularMovies(currentPage);
  });
  




const config = {
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJlNjcxZTcyYTMyNzBmNjAwNWE5NTFlMTQ0NDA0YyIsInN1YiI6IjY1MzliYWFkMDkxZTYyMDBhY2JjZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kl2esxdpMndC8Ncdl_j46puXA1C37-yIPMFWbeO-_d4' // Cambio aquí
  }
};

let page = 20;

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
