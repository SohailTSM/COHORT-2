import { useRecoilState } from 'recoil';
import User from '../components/User';
import { myUserAtom } from '../atoms/myUser';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const loader = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/signin');
  }
  const myselfResponse = await fetch(
    'http://localhost:3000/api/v1/user/myself',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  const accountResponse = await fetch(
    'http://localhost:3000/api/v1/account/balance',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  const { balance } = await accountResponse.json();
  const myself = await myselfResponse.json();
  if (myselfResponse.status == 200) {
    return { myself, balance, token };
  } else {
    return redirect('/signin');
  }
};

const Dashboard = () => {
  const [myUser, setMyUser] = useRecoilState(myUserAtom);
  const { myself, balance, token } = useLoaderData();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setMyUser(myself);
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/signin');
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      response.json().then((data) => {
        setUsers(data.users);
      });
    });
  }, [filter]);

  return (
    <div className='bg-white w-screen h-screen'>
      <div className='flex flex-col'>
        <div className='flex justify-between border-b-2 p-5'>
          <div className='text-2xl font-bold'>Payments App</div>
          <div className='text-lg font-semibold'>
            Hello,{' '}
            {myself.firstName[0].toUpperCase() + myself.firstName.substr(1)}{' '}
            {myself.lastName[0].toUpperCase() + myself.lastName.substr(1)}
            <button
              type='submit'
              className=' text-white bg-black  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2 ml-4 text-center'
              onClick={() => {
                navigate('/update');
              }}
            >
              Update Profile
            </button>
            <button
              type='submit'
              className=' text-white bg-black  hover:ring-1 hover:outline-none hover:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2 ml-4 text-center'
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className='text-xl font-bold p-5'>Your Balance {balance}</div>
        <div className='text-xl font-bold px-5'>Users</div>
        <div className='px-5 pt-4'>
          <input
            type='text'
            name='filter'
            placeholder='Search users...'
            className='bg-white0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className='px-5 pt-4'>
          {users
            ? users
                .filter((user) => user._id != myself._id)
                .map((user) => <User user={user} key={user._id} />)
            : null}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
