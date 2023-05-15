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

  // add card 
  const cardEl = document.createElement("div");
  const imgCardEl = document.createElement("img");
  const cardBody = document.createElement("div");
  const numeroCard  = document.createElement("p");
  const nomeCard  = document.createElement("p");
  const tipoCard  = document.createElement("p");
  


  cardEl.className="cardPokemon";
  imgCardEl.className="gif-card";
  cardBody.className="car-Body";
  nomeCard.className="nome__card";
  numeroCard.className="number__card";
  tipoCard.className="type__card";

  imgCardEl.setAttribute("src", `./json/images/00${primeiroPokemon.id}.png`);

  cardEl.appendChild(imgCardEl);  
  cardEl.appendChild(cardBody);

  cardBody.appendChild(numeroCard);
  cardBody.appendChild(nomeCard);

  nomeCard.innerText ="teste";

  cardBody.appendChild(tipoCard);

  console.log(primeiroPokemon.type[0]);
  console.log(primeiroPokemon.type[1]);
  
  cardListEl.appendChild(cardEl);

}
function old(pokedex) {
    const primeiroPokemon = pokedex[0];
    const segundoPokemon = pokedex[1];
    const terceiroPokemon = pokedex[2];
    const quartoPokemon = pokedex[3];
    const quintoPokemon = pokedex[4];
    const sextoPokemon = pokedex[5];
    const setimoPokemon = pokedex[6];
    const oitavoPokemon = pokedex[7];
    const nonoPokemon = pokedex[8];

    console.log(primeiroPokemon);

    const imgEl = document.getElementById("imagemPrincipal");
    imgEl.setAttribute("src", `./json/images/00${primeiroPokemon.id}.png`);
    const h1El = document.getElementById("nomePrincipal");
    h1El.innerText = primeiroPokemon.name.english;

    const imgEl1 = document.getElementById("pirmeiraImagemPokemon");
    imgEl1.setAttribute("src", `./json/images/00${primeiroPokemon.id}.png`);

    const h1El1 = document.getElementById("nome__card1");
    h1El1.innerText = primeiroPokemon.name.english;

    const imgEl2 = document.getElementById("segundaImgPokemon");
    imgEl2.setAttribute("src", `./json/images/00${segundoPokemon.id}.png`);

    const h1El2 = document.getElementById("nome__card2");
    h1El2.innerText = segundoPokemon.name.english;

    const imgEl3 = document.getElementById("terceiraImgPokemon");
    imgEl3.setAttribute("src", `./json/images/00${terceiroPokemon.id}.png`);

    const h1El3 = document.getElementById("nome__card3");
    h1El3.innerText = terceiroPokemon.name.english;

    const imgEl4 = document.getElementById("quartaImgPokemon");
    imgEl4.setAttribute("src", `./json/images/00${quartoPokemon.id}.png`);

    const h1El4 = document.getElementById("nome__card4");
    h1El4.innerText = quartoPokemon.name.english;

    const imgEl5 = document.getElementById("quintaImgPokemon");
    imgEl5.setAttribute("src", `./json/images/00${quintoPokemon.id}.png`);

    const h1El5 = document.getElementById("nome__card5");
    h1El5.innerText = quintoPokemon.name.english;

    const imgEl6 = document.getElementById("sextaImgPokemon");
    imgEl6.setAttribute("src", `./json/images/00${sextoPokemon.id}.png`);

    const h1El6 = document.getElementById("nome__card6");
    h1El6.innerText = sextoPokemon.name.english;

    const imgEl7 = document.getElementById("setimaImgPokemon");
    imgEl7.setAttribute("src", `./json/images/00${setimoPokemon.id}.png`);

    const h1El7 = document.getElementById("nome__card7");
    h1El7.innerText = setimoPokemon.name.english;

    const imgEl8 = document.getElementById("oitavaImgPokemon");
    imgEl8.setAttribute("src", `./json/images/00${oitavoPokemon.id}.png`);

    const h1El8 = document.getElementById("nome__card8");
    h1El8.innerText = oitavoPokemon.name.english;

    const imgEl9 = document.getElementById("nonaImgPokemon");
    imgEl9.setAttribute("src", `./json/images/00${nonoPokemon.id}.png`);

    const h1El9 = document.getElementById("nome__card9");
    return { oitavoPokemon, segundoPokemon };
}

