
async function loadInitialPokemon() {
    try {
        console.log('starte Pokemon-Laden')
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const data = await response.json();
        
        console.log('Liste geladen:', data);
        console.log('Anzahl Pokemon:', data.results.length);

        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i];
            const detailResponse = await fetch(pokemon.url);
            const details = await detailResponse.json();
        
            const name = details.name;
            const image = details.sprites.other['official-artwork'].front_default;
            const types = details.types;

            const html = getPokemonCardTepmlate(name, image, types);
            const container = document.getElementById('pokemon_container');
            container.innerHTML += html;
        }
    } catch (error) {
        }
}


function init() {

   loadInitialPokemon();
}