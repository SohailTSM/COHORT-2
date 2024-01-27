import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard';
import Modal from './components/Modal';
import Backdrop from './components/Backdrop';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { isModalActiveSelector, modalContentAtom } from './atoms/modalContent';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  const isModalActive = useRecoilValue(isModalActiveSelector);
  const modalContent = useRecoilValue(modalContentAtom);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/dashboard' />,
    },
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
    {
      path: 'update',
      element: <UpdateProfile />,
    },
    // This route is for designing purpose only
    {
      path: 'modal',
      element: <Modal />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      {isModalActive ? (
        <Backdrop>
          <Modal user={modalContent.user} />
        </Backdrop>
      ) : null}
    </>
  );
}

export default App;
