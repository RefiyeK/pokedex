let offset= 0;


async function loadPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const data = await response.json();
        
        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i]

            const detailResponse = await fetch(pokemon.url);
            const details = await detailResponse.json();

            allPokemon.push(details);

            const name = details.name;
            const image = details.sprites.other['official-artwork'].front_default;
            const types = details.types;
        }
        
        renderPokemon(allPokemon);
            offset += 20;
    } catch (error) {
        console.error("Fehler beim Laden:", error);
        } 
         
}
