const express = require('express');
const port = 9000;
const app = express();
const bodyParser = require('body-parser');

var todos = [{id:1, title:'buy the milk'}, {id:2, title:'rent a car'}, {id:3, title:'feed the cat'}];

app.use(bodyParser.json())

app.get('/', (request, response) => {

   response.status(200).json(todos);
});

app.post('/', (request, response) => {
    var newTodo=request.body;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    response.status(201).json();
});

app.put('/:id', (request, response) => {
  var id = request.params.id// retrieve the id parameter value
  if (todos[id - 1]){
    todos[id - 1] ={id,title:request.query.title};
    response.status(202).send(todos[id-1]);
  }else{
    response.status(404, 'The task is not found').send();
  }
});
app.delete('/:id', (request, response) => {
    var id = parseInt(request.params.id);
    if(todos.filter(todo => todo.id == id).length !== 0){
      todos = todos.filter(todo => todo.id !== id);
      response.status(200).send(todos[id-1]);
    }else{
      response.status(404).send();
    }
  });

app.listen(port);
