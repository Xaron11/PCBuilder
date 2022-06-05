import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { getCookie, setCookies } from 'cookies-next';
import { MantineProvider, MantineThemeOverride, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Layout from '../components/layout';

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const myTheme: MantineThemeOverride = { colorScheme };

  return (
    <>
      <Head>
        <title>PC Builder</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default MyApp;
