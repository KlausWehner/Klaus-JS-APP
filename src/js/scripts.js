let pokemonRepository = (function () {

  let pokemonList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //function to add a pokemon object to the list (with conditions):
  function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon 
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("Input not correct");
      }
  }

  // gets all the data from the API pokemonList[]
  function getAll() {
    return pokemonList;
  }

  
  function addListItem(pokemon) {
      let pokeList2 = document.querySelector('.list-group'); //selects the ul by the bootstrap class as added to html
      let pokeListItem = document.createElement('li'); 
      pokeListItem.classList.add('list-group-item', 'list-group-item-action'); //bootstrap class ..action??

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-outline-dark');
      button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal'); // ????
     
      pokeListItem.appendChild(button); //button attached to li item
      pokeList2.appendChild(pokeListItem); // list li attached to main list -pokeList2 as defined above
      // add event listener to button:
      button.addEventListener('click', function () {
              showDetails(pokemon);
       })
  }

  // loads the list as a Promise
  function loadList() {
     return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
          imageUrl: item.imageUrl
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // load individual details
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
      showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
    });
  }


  function showModal(name, height, types, image) {

    let modalBody = $(".modal-body"); // references classes as in html copied from bootstrap
    let modalTitle = $(".modal-title");
    

    modalTitle.empty();
    modalBody.empty();


    let titleElement = $('<h1>' + name + '</h1>');
    
    let imageElement = $('<img class="modal-img" style="width 40%">'); // where is modal-img from?
    imageElement.attr("src", image); //is 'image' defined in my loadDetails showModal line 79??

    let heightElement = $("<p>" + "HEIGHT: " + height + "</p>");
        
    let typeNames = [];
    types.forEach(function (typeObject) {
    typeNames.push(typeObject.type.name);
    });

    let typesElement = $("<p>" + "TYPES: " + typeNames + "</p>");
    
    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

    $('#pokemonModal').modal('toggle');  //???
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




pokemonRepository.loadList().then(function() {
  // data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});