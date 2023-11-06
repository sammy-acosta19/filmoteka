async function atributosMovies(movie, API_URL, API_KEY, IMAGE_BASE_URL, movieListContainer) {
    const movieContainer = document.createElement("div");
    movieContainer.id = `movie-${movie.id}`;
    movieContainer.classList.add("movie");
    movieContainer.style.width = "430px";
    movieContainer.style.height = "305px";
    movieContainer.style.marginBottom = "425px";
    movieContainer.style.marginTop = "20px";
    movieContainer.style.marginLeft = "50px";
    movieContainer.style.transition = "transform 0.3s ease-in-out";
    movieContainer.addEventListener("mouseenter", () => {
      movieContainer.style.transform = "scale(0.9)";
    });
    
    movieContainer.addEventListener("mouseleave", () => {
      movieContainer.style.transform = "scale(1)";
    });
    const image = document.createElement("img");
    image.src = IMAGE_BASE_URL + movie.poster_path;
    image.alt = movie.title;
    image.style.borderRadius = "5px";

    const title = document.createElement("h2");
    title.textContent = movie.title;
    title.style.color = "black";
    title.style.fontFamily = "Roboto";
    title.style.fontWeight = "500";
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
    genre.style.fontWeight = "500";
    genre.style.fontSize = "15px";

    const releaseYear = document.createElement("p");
    const releaseDate = new Date(movie.release_date);
    releaseYear.textContent = `${releaseDate.getFullYear()}`;
    releaseYear.style.color = "rgba(255, 107, 1, 1)";
    releaseYear.style.fontFamily = "Roboto";
    releaseYear.style.fontWeight = "500";
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
    rating.style.fontWeight = "500";
    rating.style.fontSize = "13px";
    rating.style.textAlign = "center";

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
      modal.showModal()
      const agregarHtmlModal = document.getElementById("add-movies-modal");
      const movieId = movie.id;
      const movieDetailsUrl = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;

      fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(data => {
          const contenedorAddModal1 = document.querySelector(".contenedor-add-modal-1");
          contenedorAddModal1.innerHTML = '';

          const titleModal = document.querySelector(".title-description-movies");
          titleModal.textContent = data.title;

          const imagePathModal = document.createElement("img");
          imagePathModal.src = IMAGE_BASE_URL + data.poster_path;
          imagePathModal.alt = data.title;
          contenedorAddModal1.appendChild(imagePathModal);

          const addPreInfoValor = document.querySelector(".container-preInfo-valor");
          addPreInfoValor.innerHTML = `
            <p class="preinfo-valor"> <span class="date-average">${data.vote_average}</span> / ${data.vote_count}</p>
            <p class="preinfo-valor">${data.popularity}</p>
            <p class="preinfo-valor">${data.original_title}</p>
            <p class="preinfo-valor">${data.genres.map(genre => genre.name).join(", ")}</p>`;

          const descriptionModal = document.querySelector(".description");
          descriptionModal.textContent = data.overview;
        });
    });

    btnCerrarModal.addEventListener('click', () => {
      modal.close();
    });

    movieListContainer.appendChild(movieContainer);
}

export default atributosMovies;