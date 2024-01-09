import { Form, redirect } from 'react-router-dom';

const AuthPage = () => {
  return (
    // <Form>
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700 underline'>
          Sign in
        </h1>
        <Form className='mt-6' method='POST'>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-gray-800'
            >
              Username
            </label>
            <input
              type='email'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='username'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='password'
              className='block text-sm font-semibold text-gray-800'
            >
              Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='password'
            />
          </div>
          <div className='mt-6'>
            <button
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
              type='sumbit'
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AuthPage;

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const response = await fetch('http://localhost:3000/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.status == 401) {
    alert(data.message);
    return null;
  }

  if (response.status == 200) {
    localStorage.setItem('Authorization', 'Bearer ' + data.token);
    alert('Sign in successfull');
    return redirect('/');
  }
  alert('Something happened');
  return null;
}
