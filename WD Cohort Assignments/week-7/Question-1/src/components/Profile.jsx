const Profile = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <>
        {/* This is an example component */}
        <div>
          <div className='flex space-x-2 w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
            <div className='card  min-w-sm border border-gray-100 bg-purple-100   transition-shadow shadow-xl hover:shadow-xl min-w-max'>
              {/**/}
              <div className='w-full card__media'>
                <img
                  src='https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg'
                  className='h-48 w-96'
                />
              </div>
              <div className='  card__media--aside ' />
              <div className='flex items-center p-4'>
                <div className='relative flex flex-col items-center w-full'>
                  <div className='h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white'>
                    <img
                      className='h-24 w-24 md rounded-full relative'
                      src='https://avatars3.githubusercontent.com/u/11801238?v=4'
                      alt=''
                    />
                    <div className='absolute' />
                  </div>
                  <div className='flex flex-col space-y-1 justify-center items-center -mt-12 w-full'>
                    <span className=' flex gap-1'>
                      <span className='text-md whitespace-nowrap text-gray-800 font-semibold'>
                        Someone
                      </span>
                      <span className='text-md whitespace-nowrap text-gray-600'>
                        32
                      </span>
                    </span>
                    <span className='text-md whitespace-nowrap text-gray-600'>
                      Somewhere
                    </span>
                    <div className='py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid'>
                      <span className='text-center px-2'>
                        <span className='font-bold text-gray-700'>56</span>
                        <span className='text-gray-600'> followers</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-gray-700'>112</span>
                        <span className='text-gray-600'> following</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-gray-700'>27</span>
                        <span className='text-gray-600'> repos</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>
            {/**/}
            {/**/}
            {/**/}
          </div>
        </div>
      </>
    </div>
  );
};
export default Profile;
