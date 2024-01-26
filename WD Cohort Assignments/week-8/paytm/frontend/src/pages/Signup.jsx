import { useEffect, useRef } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import zod from 'zod';
import { useRecoilState } from 'recoil';
import { myUserAtom } from '../atoms/myUser';

const Signup = () => {
  const navigate = useNavigate();
  const [myUser, setMyUser] = useRecoilState(myUserAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return navigate('/dashboard');
    }
  }, []);

  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();

  const signup = async (e) => {
    e.preventDefault();
    const firstName = firstNameElement.current.value;
    const lastName = lastNameElement.current.value;
    const username = emailElement.current.value;
    const password = passwordElement.current.value;
    if (firstName == '') {
      return alert('First Name is required');
    }
    if (lastName == '') {
      return alert('Last Name is required');
    }
    const schema = zod.string().email();
    const { success } = schema.safeParse(username);
    if (!success) {
      return alert('Enter a valid email address');
    }
    if (password.length < 6) {
      return alert('Password must contain atleast 6 characters');
    }

    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
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
              Sign Up
            </div>
            <div className='text-gray-500 mt-2'>
              Enter your information to create an account
            </div>
            <div className='mt-4'>
              <label
                htmlFor='firstname'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                First Name
              </label>
              <input
                type='text'
                name='firstname'
                id='firstname'
                ref={firstNameElement}
                placeholder='john'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>

            <div className='mt-4'>
              <label
                htmlFor='lastname'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Last Name
              </label>
              <input
                type='text'
                name='lastname'
                id='lastname'
                ref={lastNameElement}
                placeholder='doe'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
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
              onClick={signup}
            >
              Sign Up
            </button>
            <div className='text-black text-center text-sm font-medium mt-4'>
              Already have an account?{' '}
              <span
                className='underline hover:cursor-pointer'
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Sign In
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Signup;
