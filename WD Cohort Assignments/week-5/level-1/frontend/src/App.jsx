import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage, {
  loader as homeLoader,
  action as homeAction,
} from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage, {
  loader as profileLoader,
  action as profileAction,
} from './pages/ProfilePage';
import AuthPge, { action as authAction } from './pages/AuthPage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        path: 'auth',
        element: <AuthPge />,
        action: authAction,
      },
    ],
  },
]);

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AuthContext.Provider value={[isAdmin, setIsAdmin]}>
      <div></div>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
