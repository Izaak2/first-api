var express = require("express");
var app = express();
//var app = require("express")(); //Same as two lines above

app.get("/", function(request, response) { // "/" means base URL
  response.send("My first API!"); // send converts message to JSON
});

app.get("/funions", function(request, response) {
  response.send("You give me some funions foo!");
});

app.listen(3000, function(){
  console.log("First API running on port 3000!");
});
