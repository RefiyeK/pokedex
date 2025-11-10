let currentPokemonIndex = 0;
let allPokemon = [];
const resultArray = [];

const backBtn = document.getElementById('backBtn');
const loadMoreBtn = document.getElementById('load_more_btn');
const spinner = document.getElementById('loading_spinner');
const mainContent = document.getElementById('main_content');


function init() { 
    loadPokemon();
    loadMoreBtn.addEventListener('click', loadPokemon);
    setupDialogEvent();
    setClassesForOverview();
}

function setupDialogEvent() {
        document.addEventListener('keydown', handleKeyPress);
        const myDialog = document.getElementById('pokemon_dialog');
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
    let typesHTML = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        const typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }    
    dialog.innerHTML = getPokemonDetailTemplate(pokemon, typesHTML);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
}

function generateTypesHTML(types) {     
      let typesHTML = '';
    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }
    return typesHTML;
}

function closeDialog() {
    const dialog = document.getElementById('pokemon_dialog');
    dialog.close();
    document.body.style.overflow = '';
}

function navigatePokemon(direction) {    
    let newIndex = currentPokemonIndex + direction;
    if (newIndex < 0) {
        newIndex = 0;
    }
    if (newIndex >= allPokemon.length) {
        newIndex = allPokemon.length - 1;
    }
    openDialog(newIndex);
}

function updateDialogContent(pokemon) {
    let typesHTML = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        const typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }
}

function searchPokemon() {
    setClassesForSearch();
    let searchString = document.getElementById('search_input').value;
    let searchText = searchString.toLowerCase();
    let searchResult =  allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText));
    renderPokemon(searchResult);
    document.getElementById('load_more_btn').classList.add('hidden');
    document.getElementById('backBtn').classList.remove('hidden');
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
    document.getElementById('backBtn').classList.add('hidden');
}

function handleKeyPress(event) {
    if (document.getElementById('pokemon_dialog').open) {
        if (event.key === 'ArrowLeft') navigatePokemon(-1);
        if (event.key === 'ArrowRight') navigatePokemon(+1);
        if (event.key === "Escape") closeDialog();    
    }
}

function setClassesForOverview() {
    mainContent.classList.remove('hidden');
    backBtn.classList.add('hidden');
    loadMoreBtn.classList.remove('hidden');
}

function setClassesForSearch() {
    backBtn.classList.remove('hidden');
    loadMoreBtn.classList.add('hidden');        
}

function loadingScreenStart() {
        spinner.classList.remove('hidden');
}

function loadingScreenEnd() {
        spinner.classList.add('hidden'); 
}

