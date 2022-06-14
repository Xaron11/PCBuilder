import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { getCookie, setCookies } from 'cookies-next';
import { MantineProvider, MantineThemeOverride, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Layout from '../components/layout';
import { PartsCookie } from '../types/parts';
import { defaultParts } from '../utils/parts';
import { PartsProvider } from '../components/partsContext';
function MyApp(props: AppProps & { colorScheme: ColorScheme; parts: PartsCookie }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const myTheme: MantineThemeOverride = { colorScheme };

  return (
    <>
      <Head>
        <title>PC Builder</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="PC Builder to narzędzie, które sprawia, że budowa komputera jest łatwiejsza niż kiedykolwiek."
        />
        <meta name="author" content="Dawid Kaczmarzyk, kl. 3gSP 2021/2022, gr. 1" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
          <PartsProvider initialParts={props.parts}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PartsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

type AppInitialProps = {
  colorScheme: string | true;
  parts: PartsCookie;
};

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }): AppInitialProps => {
  const colorScheme = getCookie('color-scheme', ctx) || 'light';
  const partsCookie = getCookie('parts', ctx);
  let parts: PartsCookie;
  if (typeof partsCookie === 'string') {
    parts = JSON.parse(partsCookie) as PartsCookie;
  } else {
    parts = { ...defaultParts };
  }
  return { colorScheme, parts };
};

export default MyApp;
