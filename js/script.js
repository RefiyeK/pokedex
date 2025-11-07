let currentPokemonIndex = 0;
let allPokemon = [];
const resultArray = [];


function init() {
        loadPokemon();
        const loadMoreBtn = document.getElementById('load_more_btn');
        loadMoreBtn.addEventListener('click', loadPokemon);

        const homeBtn = document.getElementById('backHomeBtn');
        homeBtn.addEventListener('click', loadPokemon);
        

}

function setupDialogEvent() {
        document.addEventListener('keydown', handleKeyPress);
        const myDialog = document.getElementById('myDialog');

        myDialog.onclick = function(event) {
        if(event.target === myDialog) {
            closeDialog();
        }
    }
}


function openDialog(index) {
    currentPokemonIndex = index;
    const pokemon = allPokemon[index];
    const dialog = document.getElementById('pokemon_dialog');
    const content = document.getElementById('dialog_pokemon_content');

    content.innerHTML = getPokemonDetailTemplate(pokemon);

    dialog.showModal();

    document.body.style.overflow = 'hidden';
}


function closeDialog() {
    const dialog = document.getElementById('pokemon_dialog');
    dialog.close();

    document.body.style.overflow = '';
}


function navigatePokemon(direction) {    
    currentPokemonIndex = currentPokemonIndex + direction;

    if (currentPokemonIndex < 0) {
        currentPokemonIndex = 0;
    }
    if (currentPokemonIndex >= allPokemon.length) {
        currentPokemonIndex = allPokemon.length - 1;
    }

    const pokemon = allPokemon[currentPokemonIndex];
    const content = document.getElementById('dialog_pokemon_content');
    content.innerHTML = getPokemonDetailTemplate(pokemon);
}


function searchPokemon() {
    let searchString = document.getElementById('search_input').value;

    let searchText = searchString.toLowerCase(); 
    let searchResult =  allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText))
    
    renderPokemon(searchResult);
   
    document.getElementById('load_more_btn').classList.add('hidden');
    document.getElementById('backHomeBtn').classList.remove('hidden');
}


function activateSearchBtn() {
    const searchInput = document.getElementById('search_input');
    const searchBtn = document.getElementById('search_btn');
 
    let searchString = searchInput.value;
    if (searchString.length >= 3) {
        searchBtn.disabled = false;
    } else {
        searchBtn.disabled = true;
    }
    
}

function renderPokemon(pokemonArray) {
    const container = document.getElementById('pokemon_container');
    container.innerHTML= '';

    for (let i = 0; i < pokemonArray.length; i++) {
        const pokemon = pokemonArray[i];

        container.innerHTML += getPokemonCardTemplate(
            pokemon.name,
            pokemon.sprites.other['official-artwork'].front_default,
            pokemon.types,
            allPokemon.indexOf(pokemon)
        );
    }
    document.getElementById('search_input').value ='';
    document.getElementById('backHomeBtn').classList.add('hidden');
    
}
