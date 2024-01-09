import { Link } from "react-router-dom";

const Profile = ({ profile, isAdmin }) => {
  return (
    <div className=' p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-4 '>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {profile.name}
      </h5>

      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        {profile.description}
      </p>
      <a
        target='_blank'
        href={profile.linkedIn}
        className='inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        LinkedIn
      </a>
      <a
        target='_blank'
        href={profile.twitter}
        className='inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Twitter
      </a>
      <a
        target='_blank'
        href={profile.github}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Github
      </a>
      <p className='mt-3 font-normal text-gray-700 dark:text-gray-400'>
        {profile.interests}
      </p>
      {isAdmin ? (
        <Link
          to={`profile/${profile._id}`}
          className='inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Edit
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Profile;
