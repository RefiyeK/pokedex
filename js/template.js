function getPokemonCardTemplate(name, image, types, index) {
    let typesHTML = '';
    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }
    const primaryType = types[0].type.name;
    return `

        <div onclick="openDialog(${index})" class="pokemon_card bg-type-${primaryType}">
        
            <img src="${image}" alt=${name}>
            <h3 class="pokemon_name">${name.toUpperCase()}</h3>
            <div class="pokemon_types">${typesHTML}</div>
            </div>
    `;
}

function getPokemonDetailTemplate(pokemon) {

    let typesHTML = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        const typeName = pokemon.types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }

    return `
        <div class="pokemon_detail"> 
            <img src="${pokemon.sprites.other['official-artwork'].front_default}"
                alt="${pokemon.name}"
                class="pokemon_detail_image">
                <h2 class="pokemon_detail_name">${pokemon.name.toUpperCase()}</h2>
                <div class="pokemon_types">${typesHTML}</div>    
                <div class="pokemon_stats">
                        <div class="stat_item">
                            <span class="stat_label">HP:</span>
                            <span class="stat_value">${pokemon.stats[0].base_stat}</span>
                        </div>
                        <div class="stat_item">
                            <span class="stat_label">Attack:</span>
                            <span class="stat_value">${pokemon.stats[1].base_stat}</span>
                        </div>                
                        <div class="stat_item">
                            <span class="stat_label">Defense:</span>
                            <span class="stat_value">${pokemon.stats[2].base_stat}</span>
                        </div>
                        <div class="stat_item">
                            <span class="stat_label">Speed:</span>
                            <span class="stat_value">${pokemon.stats[5].base_stat}</span>
                        </div>
                </div>
        </div>
    `;
}
