import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPreviousUrl } from '../features/navigation/navigationSlice'

interface CapturePreviousUrlProps {
  children: ReactNode;
}

const CapturePreviousUrl = ({ children }: CapturePreviousUrlProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Capture the current URL and store it in Redux
    if (router.asPath) {
      dispatch(setPreviousUrl(router.asPath)); // Set the previous URL in Redux
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return <>{children}</>;
};

export default CapturePreviousUrl;
