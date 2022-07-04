import type { AppProps } from "next/app";
import { NextUIProvider, createTheme, Grid } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Header, Layout, Sidebar } from "@components/Layout/index";
import { useRouter } from "next/router";
import BSTContextProvider from "@contexts/BST";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSidebar = router.pathname !== "/";
  const lightTheme = createTheme({
    type: "light",
  });

  const darkTheme = createTheme({
    type: "dark",
  });

  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <BSTContextProvider>
          <Layout>
            <Header />
            {showSidebar ? (
              <Grid.Container gap={2}>
                <Grid
                  xs={12}
                  sm={2.5}
                  css={{
                    overflowY: "scroll",
                  }}
                >
                  <Sidebar />
                </Grid>
                <Grid xs={12} sm={9.5}>
                  <Component {...pageProps} />
                </Grid>
              </Grid.Container>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </BSTContextProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default MyApp;
