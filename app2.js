let pagina = 1;
const btnAnterior=document.getElementById('btnAnterior');
const btnSiguiente=document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',()=>{
  if(pagina<1000){
    pagina+=1;
    obtenerMovies();
  }
})
btnAnterior.addEventListener('click',()=>{
  if(pagina>1){
    pagina-=1;
    obtenerMovies();
  }
})

async function obtenerMovies(){
const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=036e9a4985ec1e72fab339a404a18aec&language=es-CO&page=${pagina}`);
console.log(respuesta)
const datos = await respuesta.json();
let personajes = datos.results;
console.log(personajes);
let heroes='';
var dos = personajes.forEach(persona=>{
  heroes+= `<div class="resultss"><h3>${persona.title}</h3>
                                   <a href="./pelicula.html?id=${persona.id}" ><img src="https://image.tmdb.org/t/p/w500/${persona.poster_path}" alt="" class="img-thumbnail" > </a> <br>
                                   <h5>Popularidad:</h5> ${persona.vote_average}<br>
                                   <h5>Cantidad de votos:</h5> ${persona.vote_count}<br>
                                   <h5>Idioma original:</h5> ${persona.original_language}<br>
                                   <a class="btn btn-primary" href="./similares.html?id=${persona.id}" >Similares</a>
                                   <a class="btn btn-primary" href="./pelicula.html?id=${persona.id}" >Detalles</a>


  </div>`
})

document.getElementById('resultado').innerHTML=heroes;
};
function ver(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var anuncioParam = urlParams.get('id');

  let url = `https://api.themoviedb.org/3/movie/${anuncioParam}/similar?api_key=036e9a4985ec1e72fab339a404a18aec&language=es-CO`;
  async function naren(){
  const respuesta = await fetch(`${url}`);
  console.log(respuesta)
  const datos = await respuesta.json();
  let personajes = datos.results;
  console.log(personajes);
  let heroes='';
  personajes.forEach(persona=>{
  heroes+= `<div class="resultss"><h3>${persona.title}</h3>
                                  <a href="./pelicula.html?id=${persona.id}"><img src="https://image.tmdb.org/t/p/w500/${persona.poster_path}" alt="" class="img-thumbnail" ><br></a>
                                  <h3>Descripcion:</h3>
                                  ${persona.overview} <br> <br>
    </div>`
  })

  document.getElementById('resultado').innerHTML=heroes;
  };
  naren();
}

function infoPelicula(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var anuncioParam = urlParams.get('id');
  let url = `https://api.themoviedb.org/3/movie/${anuncioParam}?api_key=036e9a4985ec1e72fab339a404a18aec&language=es-CO`;
  //console.log(url)
  async function naren(){
  const respuesta = await fetch(`${url}`);
  console.log(respuesta)
  const datos = await respuesta.json();
  let personajes = datos;
  console.log(personajes);
  let nn = `<div class="non"><h3 class="title" >${personajes.original_title}</h3>
                                    <img class="img-thumbnail" src="https://image.tmdb.org/t/p/w500/${personajes.poster_path}"> <br> <br>
                                    <h3>Descripción:</h3> ${personajes.overview} <br> <br>
                                    <a class="btn btn-primary" href="${personajes.homepage}">Pagina Web Oficial</a> <br> <br>
                                    Generos: ${personajes.genres[0].name},${personajes.genres[1].name}.
  </div>`
  document.getElementById('resultado').innerHTML=nn;
  }
  naren();
}
