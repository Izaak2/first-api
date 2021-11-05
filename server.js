var express = require("express");
var app = express();
//var app = require("express")(); //Same as two lines above

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
  {
    "id":"1",
    "text":"Eggs"
  },
  {
    "id":"2",
    "text":"Milk"
  },
  {
    "id":"3",
    "text":"Juice"
  },
  {
    "id":"4",
    "text":"Bacon"
  }
];


app.get("/ingredients", function(request, response) { // "/" means base URL
  response.send(ingredients); // send converts message to JSON
});


app.post("/ingredients", function(request, response){
  var ingredient = request.body;
  if(!ingredient || ingredient.text === ""){
    response.status(500).send({error: "Your ingredient must have text"});
  }else {
    ingredients.push(ingredient);
    response.status(200).send(ingredients);
  }
});

app.put("/ingredients/:ingredientId", function(request, response) {

  var newText = request.body.text;

  if (!newText || newText === "") {
      response.status(500).send({error:"You must provide ingredient text"})
  } else {
      var objectFound = false;
      for (var x = 0; x < ingredients.length; x++) {
          var ing = ingredients[x];

          if (ing.id === request.params.ingredientId) {
              ingredients[x].text = newText;
              objectFound = true;
              break;
          }
      }
      if(!objectFound) {
        response.status(500).send({error:"Ingredient not found"});
      }
      response.send(ingredients);
    }
});

app.delete("/ingredients", function(request, response){
  var id = request.body.id;
  if(!id || id === ""){
    response.status(500).send({error:"ingredient does not exists"});
  }else {

    var objectFound = false;

    for(var x = 0; x < ingredients.length; x++) {
      if(id === ingredients[x].id) {
        ingredients.splice(x, 1);
        objectFound = true;
        break;
      }
    }

    if(!objectFound){
      response.status(500).send({error:"Ingredient not found"});
    }

    response.send(ingredients);
  }
});

app.get("/funions", function(request, response) {
  response.send("You give me some funions foo!");
});

app.listen(3000, function(){
  console.log("First API running on port 3000!");
});
