import type { AppProps } from "next/app";
import { NextUIProvider, createTheme, Grid } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Header, Layout, Sidebar } from "@components/Layout/index";
import { useRouter } from "next/router";

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
        <Layout>
          <Header />
          {showSidebar ? (
            <Grid.Container gap={2}>
              <Grid xs={12} sm={2.5}>
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
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default MyApp;
