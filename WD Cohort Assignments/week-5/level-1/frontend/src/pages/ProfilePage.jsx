import { useContext, useState } from 'react';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';

export async function loader({ request }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/')[2];
  const response = await fetch('http://localhost:3000/' + id, {
    headers: {
      Authorization: localStorage.getItem('Authorization'),
    },
  });
  const data = await response.json();
  return data.profile;
}

const ProfilePage = () => {
  const profile = useLoaderData();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(profile);

  function profileDataHandler(e) {
    const key = e.target.name;
    const value = e.target.value;
    setProfileData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  function onCancel(e) {
    navigate('/');
  }

  async function onDelete() {
    const response = await fetch('http://localhost:3000/' + profile._id, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    });
    const data = await response.json();
    alert('Profile deleted successfully');
    navigate('/');
  }

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700'>
          {profile == 'new' ? 'CREATE' : 'EDIT'}
        </h1>
        <Form className='mt-6' method='POST'>
          <div className='mb-2'>
            <label
              htmlFor='name'
              className='block text-sm font-semibold text-gray-800'
            >
              Name
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='name'
              value={profileData.name}
              onChange={profileDataHandler}
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='description'
              className='block text-sm font-semibold text-gray-800'
            >
              Description
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='description'
              value={profileData.description}
              onChange={profileDataHandler}
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='linkedIn'
              className='block text-sm font-semibold text-gray-800'
            >
              LinkedIn Link
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='linkedIn'
              value={profileData.linkedIn}
              onChange={profileDataHandler}
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='twitter'
              className='block text-sm font-semibold text-gray-800'
            >
              Twitter Link
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='twitter'
              value={profileData.twitter}
              onChange={profileDataHandler}
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='github'
              className='block text-sm font-semibold text-gray-800'
            >
              Github Link
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='github'
              value={profileData.github}
              onChange={profileDataHandler}
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='interests'
              className='block text-sm font-semibold text-gray-800'
            >
              Interests
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='interests'
              value={profileData.interests}
              onChange={profileDataHandler}
            />
          </div>

          <div className='flex justify-around'>
            <div className='mt-6'>
              <button
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700'
                type='sumbit'
              >
                {profile == 'new' ? 'Create' : 'Update'}
              </button>
            </div>

            {profile == 'new' ? (
              <></>
            ) : (
              <div className='mt-6'>
                <button
                  className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700'
                  type='button'
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            )}

            <div className='mt-6'>
              <button
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-800'
                type='button'
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ProfilePage;

export async function action({ request }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/')[2];
  let method = '';
  let alertMessage = '';
  let fetchUrl = '';
  if (id == 'new') {
    method = 'POST';
    alertMessage = 'Profile created successfully';
    fetchUrl = 'http://localhost:3000/';
  } else {
    method = 'PUT';
    alertMessage = 'Profile updated successfully';
    fetchUrl = 'http://localhost:3000/' + id;
  }

  const formData = await request.formData();
  const name = formData.get('name');
  const description = formData.get('description');
  const linkedIn = formData.get('linkedIn');
  const twitter = formData.get('twitter');
  const github = formData.get('github');
  const interests = formData.get('interests');

  const profile = { name, description, linkedIn, twitter, github, interests };

  const response = await fetch(fetchUrl, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
    body: JSON.stringify(profile),
  });
  const data = await response.json();

  alert(alertMessage);
  return redirect('/');
}
