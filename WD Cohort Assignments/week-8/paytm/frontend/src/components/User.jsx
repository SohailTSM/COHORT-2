import { useState } from 'react';
import Modal from './Modal';

const User = ({ user }) => {
  return (
    <>
      <div className='flex justify-between mb-3'>
        <div className='flex '>
          <span>
            <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>
              <span className='font-medium text-gray-600'>
                {user.firstName[0].toUpperCase() +
                  user.lastName[0].toUpperCase()}
              </span>
            </div>
          </span>
          <span className='text-lg px-2 font-medium text-center flex flex-col justify-center'>
            {user.firstName[0].toUpperCase() + user.firstName.substr(1)}{' '}
            {user.lastName[0].toUpperCase() + user.lastName.substr(1)}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <button
            type='submit'
            className=' text-white bg-black  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2 text-center'
          >
            Send Money
          </button>
        </div>
      </div>
    </>
  );
};
export default User;
