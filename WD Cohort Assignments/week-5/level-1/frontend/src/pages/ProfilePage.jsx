import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  return null;
}

const ProfilePage = () => {
  const profile = useLoaderData();
  return <div>ProfilePage</div>;
};
export default ProfilePage;

export async function action() {}
