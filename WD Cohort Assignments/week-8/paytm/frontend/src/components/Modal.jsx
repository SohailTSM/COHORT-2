const Modal = ({ user, isOpen }) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden='true'
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className='relative p-4 w-full max-w-md max-h-full'>
        {/* Modal content */}
        <div className='relative bg-white rounded-lg shadow '>
          {/* Modal header */}
          <div className='flex flex-end'>
            <button
              type='button'
              className='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>

          <div className='flex items-center justify-center rounded-t p-5'>
            <div className='text-3xl font-extrabold'>Send Money</div>
          </div>
          {/* Modal body */}

          <div className='p-4 md:p-5'>
            <div className='flex '>
              <span>
                <div class='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green-500 rounded-full'>
                  <span class='font-medium text-gray-800'>
                    {user.firstName[0].toUpperCase() +
                      user.lastName[0].toUpperCase()}
                  </span>
                </div>
              </span>
              <span className='text-lg px-2 font-bold text-center flex flex-col justify-center'>
                {user.firstName[0].toUpperCase() + user.firstName.substr(1)}{' '}
                {user.lastName[0].toUpperCase() + user.lastName.substr(1)}
              </span>
            </div>
            <form className='space-y-4' action='#'>
              <div>
                <label
                  htmlFor='email'
                  className='block my-2 text-sm font-medium text-gray-900 '
                >
                  Amount (in Rs.)
                </label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                  placeholder='Enter Amount '
                />
              </div>
              <div className='flex flex-col justify-center'>
                <button
                  type='submit'
                  className=' text-black bg-green-500  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2 text-center'
                  //21C55D
                >
                  Initiate Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
