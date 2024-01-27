import { useEffect, useRef } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import zod from 'zod';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myUserAtom } from '../atoms/myUser';

const UpdateProfile = () => {
  const token = localStorage.getItem('token');
  const user = useRecoilValue(myUserAtom);
  const navigate = useNavigate();
  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const passwordElement = useRef();

  const updateProfile = async (e) => {
    e.preventDefault();
    const firstName = firstNameElement.current.value;
    const lastName = lastNameElement.current.value;
    const password = passwordElement.current.value;
    const body = {};
    if (firstName.length > 0) {
      body.firstName = firstName;
    }
    if (lastName.length > 0) {
      body.lastName = lastName;
    }

    if (password != '') {
      body.password = password;
    }
    if (password.length < 6 && password != '') {
      return alert('Password must contain atleast 6 characters');
    }

    const response = await fetch('http://localhost:3000/api/v1/user', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status == 411) {
      return alert(data.message);
    } else if (response.status == 200) {
      alert('Profile Update successfully');
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
              Update Profile
            </div>
            <div className='text-gray-500 mt-2'>
              Enter your information to update
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
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>

            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                New Password
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
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default UpdateProfile;
