import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from 'layout/main';
import { EmptyLayout } from 'layout/empty';
import { ProtectedRoute } from 'components/protected';
import { Loading } from 'components/loading';

const HomePage = lazy(() => import('./views/home'));
const LoginPage = lazy(() => import('./views/auth/login'));
const RegisterPage = lazy(() => import('./views/auth/register'));
const ProfilePage = lazy(() => import('./views/profile'));
const NotFoundPage = lazy(() => import('./views/notfound'));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            {withSuspense(ProfilePage)}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <EmptyLayout />,
    children: [
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'register', element: withSuspense(RegisterPage) },
    ],
  },
  {
    element: <EmptyLayout />,
    children: [
      { path: '*', element: withSuspense(NotFoundPage) }
    ],
  },
]);