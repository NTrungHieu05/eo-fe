import { ROUTES } from '@constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MiniTestPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(ROUTES.MINI_TEST);
  }, [router]);
  return null;
};

export default MiniTestPage;
