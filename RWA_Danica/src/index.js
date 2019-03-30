fetch('http://localhost:3000/users')
  .then(function(response) {
    return response.json()
  })
  .then(function(myJson) {
   console.log(myJson);
  });