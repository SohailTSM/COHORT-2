import { redirect, useLoaderData } from 'react-router-dom';
import Profile from '../components/Profile';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import Button from '../components/Button';

export async function loader() {
  const response = await fetch('http://localhost:3000/', {
    headers: {
      Authorization: localStorage.getItem('Authorization'),
    },
  });
  const data = await response.json();
  return data.profiles.length > 0
    ? data.profiles
    : [
        {
          name: 'Sohail Memon',
          description: 'Full stack developer',
          linkedIn: 'Linked In',
          twitter: 'Twitter',
          github: 'Github',
          interests: 'Interests',
          _id: 1,
        },
      ];
}

const HomePage = () => {
  const [isAdmin, setIsAdmin] = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      setIsAdmin(true);
    }
  }, []);
  const profiles = useLoaderData();
  return (
    <>
      {isAdmin ? (
        <div className='flex justify-between mx-6'>
          <Button
            text='New Profile'
            href='new'
            onClick={(e) => {
              // e.preventDefault();
              redirect('/profile/new');
            }}
          />
          <Button
            text='Logout'
            href=''
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem('Authorization');
              setIsAdmin(false);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className='grid grid-cols-3 justify-items-center gap-6 mx-8'>
        {profiles.map((profile) => (
          <Profile profile={profile} key={profile._id} isAdmin={isAdmin} />
        ))}
      </div>
    </>
  );
};
export default HomePage;

export async function action() {}
