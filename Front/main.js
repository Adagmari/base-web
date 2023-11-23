
//var pokemons=[];
var pokemons=[
    {
      "pokemon_name": "Pikachu",
      "pokemon_image": "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a3/latest/20221013200240/Artwork_Pikachu_UNITE.png/800px-Artwork_Pikachu_UNITE.png",
      "pokemon_description": "¡Pikachu es un Pokémon eléctrico muy querido por todos!"
    },
    {
      "pokemon_name": "Charizard",
      "pokemon_image": "https://ssb.wiki.gallery/images/thumb/2/21/Charizard_SSBU.png/800px-Charizard_SSBU.png",
      "pokemon_description": "Charizard es un Pokémon de tipo fuego y volador, ¡muy poderoso!"
    }
];
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function createCard(pokemon) {
    return `
    <div class="col-sm-6 col-md-4">
        <div class="pokemon-card">
            <h3 style="color: ${getRandomColor()}; text-transform: uppercase; font-size:90%"><strong>${pokemon.pokemon_name}</strong></h3>
            <img class="pokemon-image" src="${pokemon.pokemon_image}" alt="Pikachu">
            <p>${pokemon.pokemon_description}</p>
        </div>
    </div>
    `;
};
async function getPokemons() {
    try {
      const pokemonService = new PokemonService();
      previaPokemons=await pokemonService.getPokemons();

      for (var i = 0; i < previaPokemons.length; i++) {
        const ruta=previaPokemons[i].url; 
        descripPokemon=await pokemonService.getImgDescription(ruta);
        console.log(descripPokemon);
        const data={
          "pokemon_name":previaPokemons[i].name        
        }
        const dataPokemon = {...data, ...descripPokemon};
        pokemons.push(dataPokemon);
        console.log(dataPokemon);
    };
      var pokemonContainer = $("#pokemonContainer");
      for (var i = 0; i < pokemons.length; i++) {
          pokemonContainer.append(createCard(pokemons[i]));
          //console.log(pokemons[i]);
      };
    } catch (error) {
      console.error('Error al obtener pokemons:', error);
    }
}
async function filtrarPokemon(buscarPokemon) {
  try {
    var pokemonsFiltrados = pokemons.filter(pokemon => pokemon.pokemon_name.toLowerCase().includes(buscarPokemon.toLowerCase()));
    actualizarCardPokemons(pokemonsFiltrados);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  } 
}

function actualizarCardPokemons(listaFiltrada) {
    var container = $("#pokemonContainer");
    container.empty(); 
    for (var i = 0; i < listaFiltrada.length; i++) {
        container.append(createCard(listaFiltrada[i]));
    }
}
$("#buscarPokemon").on("input", function () {
  var nombre = $(this).val();
  filtrarPokemon(nombre);
});
$(document).ready(function () {
    
    getPokemons();
    
});