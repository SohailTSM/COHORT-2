import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
let globalid = 1;

function App() {
  const [input, setInput] = useState({ title: '', description: '' });
  const [todos, setTodos] = useState([]);

  const inputChangeHandler = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setInput((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    const title = input.title;
    const description = input.description;
    const id = globalid;
    setTodos((prev) => {
      return [...prev, { id, title, description }];
    });
    setInput({ title: '', description: '' });
    globalid++;
  };

  return (
    <div>
      <input
        type='text'
        id='title'
        placeholder='Todo title'
        value={input.title}
        onChange={inputChangeHandler}
      />{' '}
      <br />
      <br />
      <input
        type='text'
        id='description'
        placeholder='Todo description'
        value={input.description}
        onChange={inputChangeHandler}
      />
      <br />
      <br />
      <button onClick={addTodo}>Add todo</button>
      <br />
      <br />
      {todos.map((todo) => {
        console.log(todos);
        return (
          <div key={todo.id} id={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
