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

  const cardListEl = document.getElementById("cardList");

  let MaxCardPorPagina = 30;

  let paginaAtual = 1;
  let numeroDePaginas = pokedex.length / MaxCardPorPagina;
  numeroDePaginas = Math.round(numeroDePaginas);
  let ultimaPagina = numeroDePaginas;

  var search = location.search;
  var searchSplit = search.split("=");
  let numeroSearch = searchSplit[1];

  search = quandoNaoTemPagina(search, numeroSearch);

  paginaAtual = carregaAPaginaAtual();

  if (paginaAtual > numeroDePaginas) {
    location.search = "?pagina=" + ultimaPagina;
  }

  imprimeCard(paginaAtual, pokedex, cardListEl);

  //botãoooooooooooooooooooo
  // const botaoProxAnt = document.getElementById("botaoProxAnt");

  // const botaoProxEl = document.createElement("button");
  // const botaoAntEl = document.createElement("button");

  // botaoAntEl.className = "botaoAnt";
  // botaoProxEl.className = "botaoProx";

  // botaoProxAnt.appendChild(botaoAntEl);
  // botaoProxAnt.appendChild(botaoProxEl);

  // botaoAntEl.innerText = "Anterior";
  // botaoProxEl.innerText = "Proximo";

  // botaoProxEl.addEventListener("click", function () {
  //   if (paginaAtual < numeroDePaginas) {
  //     paginaAtual++;
  //     location.search = "?pagina=" + paginaAtual;
  //     imprimeCard(paginaAtual, pokedex, cardListEl);
  //   }
  // });

  // botaoAntEl.addEventListener("click", function () {
  //   if (paginaAtual >= 2) {
  //     paginaAtual--;
  //     location.search = "?pagina=" + paginaAtual;
  //   }

  //   imprimeCard(paginaAtual, pokedex, cardListEl);
  // });

  const numerosDeNavegacao = document.getElementById("numerosDeNavegacao");
  const numProxOpcoesPagina = 2;
  const numAntOpcoesPagina = -2;

  let paginaAnterior = paginaAtual - 1;
  let proximaPagina = paginaAtual + 1;

  // const numeroPaginaAnterior = document.createElement("a");
  // const numeroPaginaAtual = document.createElement("a");
  // const numeroPaginaProxima = document.createElement("a");

  // numeroPaginaAnterior.className = "numeroPagina";
  
  // numeroPaginaProxima.className = "numeroPagina";

  

  // numeroPaginaAnterior.innerText = paginaAnterior;
  // numeroPaginaAtual.innerText = paginaAtual;
  // numeroPaginaProxima.innerText = proximaPagina;

  // numeroPaginaAnterior.addEventListener("click", function () {
  //   if (paginaAnterior >= 1) {
  //     location.search = "?pagina=" + paginaAnterior;
  //   }
  // });

  // numeroPaginaProxima.addEventListener("click", function () {
  //   if (proximaPagina <= numeroDePaginas) {
  //     location.search = "?pagina=" + proximaPagina;
  //   }
  // });

  if (paginaAtual - 2 >= 1) {
    for (let i = 2; i > numAntOpcoesPagina; i--) {
      const numeroPagina = document.createElement("a");
      numeroPagina.className = "numeroPagina";
      numeroPagina.innerText = paginaAtual - i + " ";
      numeroPagina.addEventListener("click", function () {
        location.search = "?pagina=" + (paginaAtual - i);
      });
      numerosDeNavegacao.appendChild(numeroPagina);
    }
  }

  for (let i = 2; i <= numProxOpcoesPagina; i++) {
    const numeroPagina = document.createElement("a");
    numeroPagina.className = "numeroPagina";
    numeroPagina.innerText = paginaAtual + i;
    numeroPagina.addEventListener("click", function () {
      location.search = "?pagina=" + (paginaAtual + i);
    });
    numerosDeNavegacao.appendChild(numeroPagina);
  }
}

function carregaAPaginaAtual() {
  var search = location.search;

  numeroPagina = search.split("=");

  paginaAtual = Number(numeroPagina[1]);
  return paginaAtual;
}

function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}

function quandoNaoTemPagina(search, numeroSearch) {
  if (search == "" || numeroSearch <= 0) {
    search = "?pagina=1";
    location.search = search;
    numeroDaPagina = 1;
    paginaAtual = 1;
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
