import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard';
import Modal from './components/Modal';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  const router = createBrowserRouter([
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: 'signin',
      element: <Signin />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
      loader: dashboardLoader,
    },
    // This route is for designing purpose only
    {
      path: 'modal',
      element: <Modal />,
    },
  ]);

  return (
    <RecoilRoot>
      {}
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
