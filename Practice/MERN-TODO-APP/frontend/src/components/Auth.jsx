import { useState } from 'react';
import zod from 'zod';

const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(6);
const Auth = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function signIn(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status == 403) {
      return alert(data.message);
    }
    localStorage.setItem('Authorization', 'Bearer ' + data.token);
    props.setScreen('todos');
  }
  async function signUp(e) {
    const usernameValidation = usernameSchema.safeParse(username);
    const passwordValidation = passwordSchema.safeParse(password);
    if (!usernameValidation.success) {
      return alert('Username must be an email');
    }
    if (!passwordValidation.success) {
      return alert('Password must be atleast 6 characters');
    }
    e.preventDefault();
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status == 403) {
      return alert(data.message);
    }
    if (response.status == 409) {
      return alert(data.message);
    }
    localStorage.setItem('Authorization', 'Bearer ' + data.token);
    props.setScreen('todos');
  }
  function usernameChangeHandler(e) {
    setUsername(e.target.value);
  }
  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }
  return (
    <div>
      <input
        type='text'
        name='username'
        id='username'
        onChange={usernameChangeHandler}
        value={username}
      />{' '}
      <br />
      <input
        type='password'
        name='password'
        id='password'
        onChange={passwordChangeHandler}
        value={password}
      />
      <br />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};
export default Auth;
