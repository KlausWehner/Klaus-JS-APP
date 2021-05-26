let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon 
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Input needs: Name, Height and Type");
    }
  }

  function getAll() {
    return pokemonList;
  }

 function showLoadingMessage() {
    document.write('Data is loading...');
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


  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();  






//pokemonRepository.add('KAKINI');
pokemonRepository.add({name: 'JavaScript', height: 100.7, type: ['monster', 'poison']});
console.log(pokemonRepository.getAll());

/*pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
}); */

pokemonRepository.loadList().then(function() {
  // data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});