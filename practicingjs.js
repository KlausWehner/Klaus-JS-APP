
let myPeeps2 = [
    {
    name: 'Klaus',
    type: 'Idioth'
    },
  
    { 
    name: 'Alesch',
    type: 'Picaah'
    },
  
    { 
    name: 'Pippi',
    type: 'Miiiiau'
    }
  ]; 
  
  
  for (let i=0; i<myPeeps2.length; i++) {
    console.log(myPeeps2[i].name + ' ' + myPeeps2[i].type);
  }; 
  
  myPeeps2.forEach(function(word) {
    console.log(word.name + ' ' + word.type);
  });
  
  
  function loopOver (myPeeps2) {
    console.log(myPeeps2.name + ' ' + myPeeps2.type);
  };
  
  myPeeps2.forEach(function(loopOver) {
    console.log(loopOver);
     console.log(loopOver.name +' '+ loopOver.type);
  });

  

  let anne = {
    name: 'Anne',
    age: 38,
    children: ['Pippi', 'Piča'],
    faveFood: 'Pasta',
  };
  
  /*
  Object.keys(anne).forEach(function(term){
    console.log(anne[term]);
  })  
  */
  
  Object.keys(anne).forEach(function(iterResult){
    console.log(iterResult +': '+ anne[iterResult]);
  })
