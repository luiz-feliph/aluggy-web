import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/app/routes/home.tsx';
import Register from '@/app/routes/auth/register.tsx';
import Login from '@/app/routes/auth/login.tsx';
import NotFound from '@/app/routes/not-found.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
