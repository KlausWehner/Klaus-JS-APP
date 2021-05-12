let pokemonRepository = (function () {
    let pokemonList = [
                      {name: 'Kakuna', height: 0.6, type: ['bug', 'poison']},
                      {name: 'Zubat', height: 0.8, type: ['poison', 'flying']},
                      {name: 'Tentacruel', height: 1.6, type: ['water', 'poison']},
                      {name: 'Yanma', height: 1.2, type: ['bug', 'flying']}
                       ];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();  
  
 
                    
  let text = "WOW! That's big!";
  
  
  
  let pokemonList = pokemonRepository.getAll();
  
  
  
  Object.keys(pokemonList).forEach(function(property) {
    if (pokemonList[property].height > 1.2) {
    document.write('<p>' + 'Name: ' + pokemonList[property].name + ', Height: ' + pokemonList[property].height + 'm,' + ' (' + text + ')' + ' Type: ' + '<i>' + pokemonList[property].type[0] + ',  ' + pokemonList[property].type[1] + '</i>' + '.' +'</p>');
    } else {
    document.write('<p>' + 'Name: ' + pokemonList[property].name + ', Height: ' + pokemonList[property].height + 'm,' + ' Type: ' + '<i>' + pokemonList[property].type[0] + ',  ' + pokemonList[property].type[1] + '</i>' + '.' +'</p>');  
    }
  })
  
   


