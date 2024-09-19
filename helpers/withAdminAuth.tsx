import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import isAuthenticated from './isAuthenticated';
import { authenticateFailure, authenticateSuccess } from '@/features/auth/authSlice';
import { userInfoSuccess, userIsSellerCompanyAdmin, userIsBuyerCompanyAdmin, userIsNotCompanyAdmin } from '@/features/user/userSlice'
import { getUserInfo } from '@/http/auth';
import { useQuery } from '@tanstack/react-query';



export const withSellerAdminAuth = <P extends { children: React.ReactNode | any }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null


  useEffect(() => {
    // Fetch user information only if userId is set
    if (userId !== null) {
      getUserInfo(userId);
    }
  }, [userId]);

  const { data: UserInfo, isLoading: isUserInfoLoading } = useQuery(
    ["user-information", userId],
    async () => getUserInfo(userId))
    {enabled: Boolean(userId)};

    useEffect(() => {
      const isLoggedIn = isAuthenticated(token as string);
      if (!isLoggedIn) {
        router.push('/auth/login');
        localStorage.removeItem('token');
        dispatch(authenticateFailure({ error: 'Authentication failed' }));
        return;
      } else {
        dispatch(authenticateSuccess())
        if (!isUserInfoLoading && UserInfo) {
          console.log(UserInfo.data.data.is_companyAdmin)
          dispatch(userInfoSuccess(UserInfo.data))
          if (UserInfo.data.user_info.userRole === 'seller') {
            if (UserInfo?.data.data.is_companyAdmin) {
              dispatch(userIsSellerCompanyAdmin())
            } else {
              dispatch(userIsNotCompanyAdmin())
              router.push('/accessDenied');
            }
          } else {
            dispatch(userIsNotCompanyAdmin())
            router.push('/accessDenied');
          }
        }
      }
      
    }, [token, UserInfo, isUserInfoLoading, router, dispatch]);  

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export const withBuyerAdminAuth = <P extends { children: React.ReactNode | any }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null


  useEffect(() => {
    // Fetch user information only if userId is set
    if (userId !== null) {
      getUserInfo(userId);
    }
  }, [userId]);

  const { data: UserInfo, isLoading: isUserInfoLoading } = useQuery(
    ["user-information", userId],
    async () => getUserInfo(userId))
    {enabled: Boolean(userId)};

    useEffect(() => {
      const isLoggedIn = isAuthenticated(token as string);
      if (!isLoggedIn) {
        router.push('/auth/login');
        localStorage.removeItem('token');
        dispatch(authenticateFailure({ error: 'Authentication failed' }));
        return;
      } else {
        dispatch(authenticateSuccess())
        if (!isUserInfoLoading && UserInfo) {
          console.log(UserInfo.data.data.is_companyAdmin)
          dispatch(userInfoSuccess(UserInfo.data))
          if (UserInfo.data.user_info.userRole === 'seller') {
            if (UserInfo?.data.data.is_companyAdmin) {
              dispatch(userIsBuyerCompanyAdmin())
            } else {
              dispatch(userIsNotCompanyAdmin())
              router.push('/accessDenied');
            }
          } else {
            dispatch(userIsNotCompanyAdmin())
            router.push('/accessDenied');
          }
        }
      }
    }, [token, UserInfo, isUserInfoLoading, router, dispatch]);  

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};