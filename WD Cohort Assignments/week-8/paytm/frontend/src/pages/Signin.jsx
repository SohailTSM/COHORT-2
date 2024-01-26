import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { myUserAtom } from '../atoms/myUser';

const Signin = () => {
  const [myUser, setMyUser] = useRecoilState(myUserAtom);
  const navigate = useNavigate();
  const emailElement = useRef();
  const passwordElement = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return navigate('/dashboard');
    }
  }, []);

  const signin = async (e) => {
    e.preventDefault();
    const username = emailElement.current.value;
    const password = passwordElement.current.value;

    const response = await fetch('http://localhost:3000/api/v1/user/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (response.status == 411) {
      return alert(data.message);
    } else if (response.status == 200) {
      localStorage.setItem('token', data.token);
      setMyUser(data.user);
      return navigate('/dashboard');
    } else {
      console.log(response, data);
    }
  };

  return (
    <div className='flex justify-center content-center h-screen'>
      <div className='flex flex-col justify-center'>
        <Card>
          <div className='flex flex-col content-center justify-center'>
            <div className='text-black text-center font-bold text-3xl'>
              Sign In
            </div>
            <div className='text-gray-500 mt-2'>
              Enter your credentials to access your account
            </div>

            <div className='mt-4'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                ref={emailElement}
                placeholder='johndoe@example.com'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>

            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                ref={passwordElement}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>

            <button
              type='submit'
              className='w-full text-white bg-black  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
              onClick={signin}
            >
              Sign In
            </button>
            <div className='text-black text-center text-sm font-medium mt-4'>
              Don't have an account?{' '}
              <span
                className='underline hover:cursor-pointer'
                onClick={() => {
                  navigate('/signup');
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Signin;
