import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import isAuthenticated from './isAuthenticated';
import { authenticateFailure, authenticateSuccess } from '@/features/auth/authSlice';



const withAuth = <P extends { children: React.ReactNode | any }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    useEffect(() => {
      const isLoggedIn = isAuthenticated(token as string);
      if (!isLoggedIn) {
        router.push('/auth/login');
        localStorage.removeItem('token');
        dispatch(authenticateFailure({ error: 'Authentication failed' }));
      } else {
        dispatch(authenticateSuccess());
      }
    }, []);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export default withAuth;