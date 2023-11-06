 //funcion contenido modal
 async function contenidoModalMovie(movie, API_URL, API_KEY, IMAGE_BASE_URL) {
    modal.showModal();
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
    } 

    export default contenidoModalMovie;