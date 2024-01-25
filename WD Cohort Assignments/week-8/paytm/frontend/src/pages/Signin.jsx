import Card from '../components/Card';

const Signin = () => {
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
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                required
              />
            </div>

            <button
              type='submit'
              className='w-full text-white bg-black  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
            >
              Sign In
            </button>
            <div className='text-black text-center text-sm font-medium mt-4'>
              Don't have an account?{' '}
              <span className='underline hover:cursor-pointer'>Sign Up</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Signin;
