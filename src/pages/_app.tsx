// Next
import { type AppType } from "next/app";

// Trpc
import { api } from "@/utils/api";

// Mantine
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// Font
import { Inter } from "@next/font/google";

// Styles
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const inter = Inter({
  subsets: ["latin-ext"],
});

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <Notifications position="bottom-right" />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
