import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/app/routes/Home';
import Register from '@/app/routes/auth/Register';
import Login from '@/app/routes/auth/Login';
import NotFound from '@/app/routes/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
