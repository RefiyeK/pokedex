let offset= 0;


async function loadPokemon() {
    
   loadingScreenStart();
    
  
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i]

            const detailResponse = await fetch(pokemon.url);
            const details = await detailResponse.json();

            allPokemon.push(details);
        }
        
        renderPokemon(allPokemon);
            offset += 20;
    } catch (error) {
        console.error("Fehler beim Laden:", error);
        } finally {
            spinner.classList.add('hidden');
          
           setClassesForOverview();
           loadingScreenEnd();
        }           
}