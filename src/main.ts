import { ToDo } from "./todo";

let todos : any[] = [];

window.addEventListener('load', () => {
  
  const savedTodosString = window.localStorage.getItem('todos')
  const savedTodos = savedTodosString !== null ? JSON.parse(savedTodosString) : null;
  
  if (savedTodos) {
    for (const savedTodo of savedTodos) {
      const todo = new ToDo(savedTodo.titel, savedTodo.erledigt);
      todo.addEventListener('loeschen', (o) => {
        const index = todos.indexOf(o.target);
        todos.splice(index, 1);
        updateTodos();
      });
      todos.push(todo);
    }
  }
  
  updateTodos();

    const neuesToDoElement = document.getElementById('neuesToDo') as HTMLInputElement;
    neuesToDoElement?.addEventListener('keydown', (e) => {
      if(e.which == 13 || e.keyCode == 13) {
 
        const todo = new ToDo(neuesToDoElement.value, false);
        todos.push(todo);

        neuesToDoElement.value = '';

        todo.addEventListener('loeschen', (o) => {
          const index = todos.indexOf(o.target);
          todos.splice(index, 1);
          updateTodos();
        });

        document.getElementById('aufraeumen')?.addEventListener('click', () => {
          todos = todos.filter((o) => !o.erledigt);
          updateTodos();
        })

        updateTodos();
      }
    });
});

function updateTodos() {
  const todoListElement = document.getElementById('todolist');

    if (todoListElement !== null) {
      todoListElement.innerHTML = '';
    }

    for (const todo of todos) {
      const toDoListEntry = todo.element();
      todoListElement?.appendChild(toDoListEntry);
    }

    const offeneToDos = todos.filter((o) => !o.erledigt);

    const anzahlElement = document.getElementById('anzahl');   

    if (anzahlElement !== null) {
        anzahlElement.innerText = `${offeneToDos.length} ToDos offen.`;
    }


    const openToDo = todos.filter((o) => !o.erledigt)

    const todosJson = JSON.stringify(openToDo);
    window.localStorage.setItem('todos', todosJson);

}



window.setInterval(updateTodos, 2000)