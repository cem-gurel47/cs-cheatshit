import type { AppProps } from "next/app";
import { NextUIProvider, createTheme, Grid } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Header, Layout, Sidebar } from "@components/Layout/index";
import { useRouter } from "next/router";
import TreeContextProvider from "@contexts/tree";

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
        <TreeContextProvider>
          <Layout>
            <Header />
            {showSidebar ? (
              <Grid.Container gap={2}>
                <Grid
                  sm={0}
                  md={2.5}
                  css={{
                    "@media (max-width:992px)": {
                      display: "none !important",
                    },
                  }}
                >
                  <Sidebar />
                </Grid>
                <Grid xs={12} md={9.5}>
                  <Component {...pageProps} />
                </Grid>
              </Grid.Container>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </TreeContextProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default MyApp;
