import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Modal from './components/Modal';

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
    },
    // This route is for designing purpose only
    {
      path: 'modal',
      element: <Modal />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
