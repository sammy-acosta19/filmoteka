const config = {
    method: 'GET',
    headers: {
        'Authorization' :'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJlNjcxZTcyYTMyNzBmNjAwNWE5NTFlMTQ0NDA0YyIsInN1YiI6IjY1MzliYWFkMDkxZTYyMDBhY2JjZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kl2esxdpMndC8Ncdl_j46puXA1C37-yIPMFWbeO-_d4',
        'accept' : 'application/json'
    }}


// El valor que estara definido en PAGE se utilizara como variable para llamar cuando se este en la primera pagina mostrando las peliculas tendencia del dia//
let page = 1;

fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, config)
.then(response => response.json())
.then(data => console.log(data))

//igual como mencione anterior, El valor de search se utilizara para colocarlo en el evento buscar y podra encontrar peliculas por nombre
let search = "batman";

fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=true&language=en-US&page=1`, config)
.then(response => response.json())
.then(data => console.log(data))

//igual como mencione anterior, El valor de movieID se utilizara para colocarlo en el evento buscar y podra encontrar peliculas por ID
let movieId = 123;

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, config)
.then(response => response.json())
.then(data => console.log(data))