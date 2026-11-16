import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CookiesProvider } from 'react-cookie';
import NextNprogress from 'nextjs-progressbar';
import { MasterContext, ToeicContextProvider } from '@contexts';
import { theme } from '@styles/theme';
import { globalStyles } from '@styles/global';
import 'bootstrap-utilities/bootstrap-utilities.css';
import '@styles/global.css';
import { BreakpointsContextProvider } from '@contexts/breakpointsContext';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';

require('@styles/antd.less');

const MyApp = ({ Component, pageProps, user, router }) => {
  return (
    <>
      <MasterContext
        components={[
          [CookiesProvider],
          [ThemeProvider, { theme }],
          [ConfigProvider, { locale: viVN }],
          [ToeicContextProvider],
          [BreakpointsContextProvider],
        ]}
      >
        <div id="main-app">
          <main>
            {globalStyles}
            <NextNprogress color={theme.colors.primary} options={{ showSpinner: false }} />
            <Component {...pageProps} />
          </main>
        </div>
      </MasterContext>
    </>
  );
};

export default MyApp;
