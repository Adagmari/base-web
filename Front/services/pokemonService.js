class PokemonService {
    baseURL = "https://pokeapi.co/api/v2/pokemon";  
    async getPokemons() {
        const response = await fetch(`${this.baseURL}`, {
          method: 'GET'
        });
    
        if (!response.ok) {
          throw new Error(`Error al obtener prokemons: ${response.statusText}`);
        }
        const data = await response.json();
        const pokemons=data.results;
        console.log("data",pokemons);
        console.log(response);
        return pokemons;
    }
    async getImgDescription(ruta) {
        const response = await fetch(`${ruta}`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error(`Error al obtener imagen y descripcion del: ${response.statusText}`);
        }
        const data = await response.json();
        const descript="Los tipos que existen son: "+data.types.map((type) => type.type.name).join(', ')+
                        " y tienen "+data.moves.length+" movimientos distintos.";
        const imagen=data.sprites['front_default'];

        const dataResult ={
            "pokemon_description":descript,
            "pokemon_image":imagen
        }
        return dataResult;
    }
}