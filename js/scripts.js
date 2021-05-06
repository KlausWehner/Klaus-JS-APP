
let pokemonList = [
                    {name: 'Kakuna', height: 0.6, type: ['bug', 'poison']},
                    {name: 'Zubat', height: 0.8, type: ['poison', 'flying']},
                    {name: 'Tentacruel', height: 1.6, type: ['water', 'poison']},
                    {name: 'Yanma', height: 1.2, type: ['bug', 'flying']}
                     ];


                  
let text = "WOW! That's big!";
for (let i=0; i< pokemonList.length; i++) {
   if (pokemonList[i].height > 1.2) {
    document.write(`${pokemonList[i].name}: (Height: ${pokemonList[i].height} m, Types: "${pokemonList[i].type[0]}" and "${pokemonList[i].type[1]}") - ${text} <br>`)
    } else {
    document.write(`${pokemonList[i].name}: (Height: ${pokemonList[i].height} m, Types: "${pokemonList[i].type[0]}" and "${pokemonList[i].type[1]}") <br>`)
    }
}



