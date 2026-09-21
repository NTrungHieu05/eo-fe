import { GetServerSideProps } from 'next/types';
import React from 'react';
import Home from '@containers/Home/Home';
import Config from '@root/config';
import { ROUTES } from '@constants';
import MainLayout from '@ui/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = context?.req?.cookies[Config.AUTH_TOKEN_KEY];
  // if (!token) {
  //   context.res.writeHead(302, {
  //     Location: ROUTES.SIGNIN,
  //   });
  //   context.res.end();
  // }
  return {
    props: {},
  };
};
export default HomePage;
