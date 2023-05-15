fetch("./json/pokedex.json")
  .then((response) => response.json())
  .then(carregaJson)
  .catch(function (reject) {
    console.error(arguments);
    alert("deu ruim não carregou!");
  });

function carregaJson(pokedex) {
  console.log(pokedex);

  const primeiroPokemon = pokedex[0];

  console.log(primeiroPokemon);

  const imgEl = document.getElementById('imagemPrincipal')
  
  imgEl.setAttribute("src", `./json/images/00${primeiroPokemon.id}.png`)
  
  const h1El = document.getElementById('nomePrincipal')

  h1El.innerText = primeiroPokemon.name.english;
}
