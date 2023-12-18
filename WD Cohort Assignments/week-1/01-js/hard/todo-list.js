/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todo = [];
  }

  add(todo) {
    this.todo.push(todo);
  }

  remove(index) {
    if (index < this.todo.length) {
      this.todo = this.todo.filter((item) => item !== this.todo[index]);
    }
  }

  update(index, newTodo) {
    if (index < this.todo.length) {
      this.todo[index] = newTodo;
    }
  }

  getAll() {
    return this.todo;
  }

  get(index) {
    if (index < this.todo.length) {
    return this.todo[index];} else {
      return null
    }
  }

  clear() {
    this.todo = [];
  }
}

module.exports = Todo;
