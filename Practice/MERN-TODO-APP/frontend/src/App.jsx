import { useState, useEffect } from 'react';
import Todos from './components/Todos';
import CreateTodo from './components/CreateTodo';
import Auth from './components/auth';

function App() {
  const [todos, setTodos] = useState([]);
  const [screen, setScreen] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
          'Content-type': 'applicaion/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      });
      if (response.status >= 400 && response.status < 500) {
        setScreen('signin');
      } else if (response.status >= 500) {
        setScreen('error');
      } else {
        const data = await response.json();
        setScreen('todos');
        setTodos(data.todos);
      }
    };
    fetchData();
  }, []);

  function signOut(e) {
    e.preventDefault();
    localStorage.setItem('Authorization', '');
    setScreen('signin');
  }

  return (
    <>
      {screen == 'signin' ? <Auth setScreen={setScreen}></Auth> : <></>}
      {screen == 'todos' ? (
        <>
          <div>
            <button onClick={signOut}>Sign Out</button>
          </div>
          <CreateTodo></CreateTodo>
          <Todos todos={todos}></Todos>
        </>
      ) : (
        <></>
      )}
      {screen == 'error' ? <div>Error</div> : <></>}
    </>
  );
}

export default App;
