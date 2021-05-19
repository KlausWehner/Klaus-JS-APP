let pokemonRepository = (function () {
  let pokemonList = [
                    {name: 'Kakuna', height: 0.6, type: ['bug', 'poison']},
                    {name: 'Zubat', height: 0.8, type: ['poison', 'flying']},
                    {name: 'Tentacruel', height: 1.6, type: ['water', 'poison']},
                    {name: 'Yanma', height: 1.2, type: ['bug', 'flying']}
                     ];

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Input needs: Name, Height and Type");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListItem(pokemon) {
      let pokeList2 = document.querySelector('.pokemon-list');
      let pokeListItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('poke-button-class');
      pokeListItem.appendChild(button);
      pokeList2.appendChild(pokeListItem);
      // add event listener to button:
      button.addEventListener('click', function (event, secondEvent) {
              showDetails(pokemon);
       })
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();  


//pokemonRepository.add('KAKINI');
pokemonRepository.add({name: 'JavaScript', height: 100.7, type: ['monster', 'poison']});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
});
                
