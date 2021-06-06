let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container'); //was set up in html added here globally
  let pokemonList = [];
  // load the API URL:
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

  // DOM-create each item to a li in a button with a class: 
  function addListItem(pokemon) {
      let pokeList2 = document.querySelector('.pokemon-list'); //selects the ul by the class as added to html
      let pokeListItem = document.createElement('li'); 
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('poke-button-class'); //class DOM-added here - no dot - styled in CSS
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


    // making the modal:
  function showModal(name, height, types, image) {
    // clear existing modal content
    modalContainer.innerHTML = '';
    //modalContainer.classList.add('modal');
    
    //DOM-creates a div class="modal" inside modal-container
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close-btn');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = name;
    
    let contentElement = document.createElement('p');
    contentElement.innerText = height;
    
    let contentElement2 = document.createElement('p');
    contentElement.innerText = types;

    // the image in the modal:
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container')
    //document.querySelector('#img-container');
    let pokeImage = document.createElement('img');
   
    pokeImage.src = image; // ?

    // ?document.querySelector(pokeImage).setAttribute('src', '');

    imgContainer.appendChild(pokeImage);
    modal.appendChild(imgContainer);
   

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentElement2);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  

  
  // closes modal with escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
pokemonRepository.add({name: 'JavaScriptTEST', height: 100.7, type: ['monster', 'poison']});
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