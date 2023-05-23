fetch("./json/pokedex.json")
  .then((response) => response.json())
  .then(carregaJson)
  .catch(function (reject) {
    console.error(arguments);
    alert("deu ruim não carregou!");
  });

function carregaJson(pokedex) {
  a = new URLSearchParams(location.search);
  var nomeSearch = a.get("search");
  var pokemonLista = [];
  

  console.log(pokemonLista[0]);

  const cardListEl = document.getElementById("cardList");

  let MaxCardPorPagina = 30;

  let paginaAtual = Number(a.get("pagina"));
  let numeroDePaginas = Math.round(pokedex.length / MaxCardPorPagina);
  let ultimaPagina = numeroDePaginas;

  var search = location.search;
  var searchSplit = search.split("=");
  let numeroSearch = searchSplit[1];
  const botaoBusca = document.getElementById("botao__busca");
  barrinha = document.getElementById("barra__busca");
  barrinha.value = a.get("search");

  botaoBusca.addEventListener("click", function () {
    a.set("pagina", paginaAtual);
    a.set("search", barrinha.value);
    location.search = a.toString();
  });

  const input = document.getElementById("barra__busca");
  input.addEventListener("keypress", function (evento) {
    if (evento.key == "Enter") {
      a.set("pagina", paginaAtual);
      a.set("search", barrinha.value);
      location.search = a.toString();
    }
  });
  for (let i = 0; i < pokedex.length; i++) {
    const pokemonAtual1 = pokedex[i];
    if (pokemonAtual1.name.english.toLowerCase().includes(barrinha.value.toLowerCase()) == true) {
      paginaAtual = 1;
      pokemonLista.push(pokemonAtual1);
    }
  }

  if (a.get("search") != null) {
    pokedex = pokemonLista;
  }
  
  // .includes("tain")
  search = quandoNaoTemPagina(search, numeroSearch);

  paginaAtual = carregaAPaginaAtual();

  if (paginaAtual > numeroDePaginas) {
    a.set("pagina", ultimaPagina);
    a.set("search", "bobossauro");
    location.search = a.toString();
  }

  imprimeCard(paginaAtual, pokedex, cardListEl);

  if (paginaAtual <= 2) {
    paginaAtual = botaoProxEAnt(
      paginaAtual,
      numeroDePaginas,
      pokedex,
      cardListEl
    );
  } else {
    numPaginacao(paginaAtual);
    paginaAtual = botaoProxEAnt(
      paginaAtual,
      numeroDePaginas,
      pokedex,
      cardListEl
    );
  }

  

  //aquiiiiiiiiiiiiiiiiiiiiiiii
}

function numPaginacao(paginaAtual) {
  const numerosDeNavegacao = document.getElementById("numerosDeNavegacao");
  const numProxOpcoesPagina = 2;
  const numAntOpcoesPagina = -2;

  if (paginaAtual - 2 >= 1) {
    for (let i = 2; i > numAntOpcoesPagina; i--) {
      const numeroPagina = document.createElement("a");
      numeroPagina.className = "numeroPagina";
      numeroPagina.innerText = paginaAtual - i + " ";
      numeroPagina.addEventListener("click", function () {
        a.set("pagina", paginaAtual - i);
        location.search = a.toString();
      });
      numerosDeNavegacao.appendChild(numeroPagina);
    }
  }

  for (let i = 2; i <= numProxOpcoesPagina; i++) {
    const numeroPagina = document.createElement("a");
    numeroPagina.className = "numeroPagina";
    numeroPagina.innerText = paginaAtual + i;
    numeroPagina.addEventListener("click", function () {
      a.set("pagina", paginaAtual + i);
      location.search = a.toString();
    });
    numerosDeNavegacao.appendChild(numeroPagina);
  }
}

function botaoProxEAnt(paginaAtual, numeroDePaginas, pokedex, cardListEl) {
  const botaoProxAnt = document.getElementById("botaoProxAnt");

  const botaoProxEl = document.createElement("button");
  const botaoAntEl = document.createElement("button");

  botaoAntEl.className = "botaoAnt";
  botaoProxEl.className = "botaoProx";

  botaoProxAnt.appendChild(botaoAntEl);
  botaoProxAnt.appendChild(botaoProxEl);

  botaoAntEl.innerText = "Anterior";
  botaoProxEl.innerText = "Próximo";

  botaoProxEl.addEventListener("click", function () {
    if (paginaAtual < numeroDePaginas) {
      paginaAtual++;
      a.set("pagina", paginaAtual);
      location.search = a.toString();
      imprimeCard(paginaAtual, pokedex, cardListEl);
    }
  });

  botaoAntEl.addEventListener("click", function () {
    if (paginaAtual >= 2) {
      paginaAtual--;
      a.set("pagina", paginaAtual);
      location.search = a.toString();
    }

    imprimeCard(paginaAtual, pokedex, cardListEl);
  });

  return paginaAtual;
}

function carregaAPaginaAtual() {
  var search = location.search;
  a = new URLSearchParams(search);
  numeroPagina = a.get("pagina");
  paginaAtual = Number(numeroPagina);
  return paginaAtual;
}

function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}

function quandoNaoTemPagina(search, numeroSearch) {
  if (a == "" || numeroSearch <= 0) {
    search = "?pagina=1";
    a.set("pagina", "1");
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
