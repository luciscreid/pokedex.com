fetch("./json/pokedex.json")
  .then((response) => response.json())
  .then(carregaJson)
  .catch(function (reject) {
    console.error(arguments);
    alert("deu ruim não carregou!");
  });

function carregaJson(pokedex) {
  console.log(pokedex);

  // const { oitavoPokemon, segundoPokemon } = old(pokedex);

  const primeiroPokemon = pokedex[0];
  const cardListEl = document.getElementById("cardList");
  const botaoProxAnt = document.getElementById("botaoProxAnt");

  const botaoProxEl = document.createElement("button");
  const botaoAntEl = document.createElement("button");

  botaoAntEl.className = "botaoAnt";
  botaoProxEl.className = "botaoProx";

  botaoProxAnt.appendChild(botaoAntEl);
  botaoProxAnt.appendChild(botaoProxEl);

  botaoAntEl.innerText = "Anterior";
  botaoProxEl.innerText = "Proximo";

  let numeroSearch = 1;
  let numeroDeCard = 0;
  let MaxCardPorPagina = 30;
  let numeroDaPagina = 0;
  var search = location.search;

  let paginaAtual = 1;
  let numeroDePaginas = pokedex.length / MaxCardPorPagina;
  numeroDePaginas = Math.round(numeroDePaginas);

  var apertouProx = false;
  var apertouAnt = false;

  var numeroPagina;
  var locationSearch;

  search = quandoNaoTemPagina(search);

  numeroPagina = search.split("=");

  paginaAtual = Number(numeroPagina[1]);
  console.log(paginaAtual);

  imprimeCard(paginaAtual, pokedex, cardListEl);
}

botaoProxEl.addEventListener("click", function () {
  numeroDaPagina++;
  locationSearch = "?pagina=" + paginaAtual;
  imprimeCard(paginaAtual, pokedex, cardListEl);
  location.search = locationSearch;
  numeroPagina[1] = numeroDaPagina;
});

console.log(numeroPagina);
console.log(numeroDaPagina);
console.log(paginaAtual);
console.log();

botaoAntEl.addEventListener("click", function () {
  paginaAtual--;
  locationSearch = "?pagina=" + paginaAtual;
  imprimeCard(paginaAtual, pokedex, cardListEl);
  location.search = locationSearch;
});

function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}

function quandoNaoTemPagina(search) {
  if (search == "") {
    search = "?pagina=1";
    location.search = search;
    numeroDaPagina = 1;
  }
  return search;
}

function imprimeCard(paginaAtual, pokedex, cardListEl) {
  for (let i = (paginaAtual - 1) * 30; i <= paginaAtual * 30 - 1; i++) {
    const pokemonAtual = pokedex[i];
    cardListEl.appendChild(criaCard(pokemonAtual));
  }
}

function criaCard(pokemon) {
  const cardEl = document.createElement("div");
  const imgCardEl = document.createElement("img");
  const cardBodyEl = document.createElement("div");
  const numeroCardEl = document.createElement("p");
  const nomeCardEl = document.createElement("p");
  const tipoCardEl = document.createElement("p");

  cardEl.className = "cardPokemon";
  imgCardEl.className = "gif-card";

  cardBodyEl.className = "card-body";
  numeroCardEl.className = "number__card";
  nomeCardEl.className = "nome__card";
  tipoCardEl.className = "type__card";

  imgCardEl.setAttribute("src", `./json/images/${zeroPad(pokemon.id, 3)}.png`);
  nomeCardEl.innerText = pokemon.name.english;
  numeroCardEl.innerText = pokemon.id;
  tipoCardEl.innerText = pokemon.type[0];

  cardEl.appendChild(imgCardEl);
  cardEl.appendChild(cardBodyEl);

  cardBodyEl.appendChild(numeroCardEl);
  cardBodyEl.appendChild(nomeCardEl);
  cardBodyEl.appendChild(tipoCardEl);

  return cardEl;
}
