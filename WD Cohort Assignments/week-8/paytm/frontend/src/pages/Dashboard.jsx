import User from '../components/User';

const Dashboard = () => {
  return (
    <div className='bg-white w-screen h-screen'>
      <div className='flex flex-col'>
        <div className='flex justify-between border-b-2 p-5'>
          <div className='text-2xl font-bold'>Payments App</div>
          <div className='text-lg font-semibold'>Hello, User</div>
        </div>
        <div className='text-xl font-bold p-5'>Your Balance 5000</div>
        <div className='text-xl font-bold px-5'>Users</div>
        <div className='px-5 pt-4'>
          <input
            type='text'
            name='filter'
            placeholder='Search users...'
            className='bg-white0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
          />
        </div>
        <div className='px-5 pt-4'>
          <User user={{ firstName: 'sohail', lastName: 'Memon' }} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
