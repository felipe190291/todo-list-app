import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "./components/page_layouts/dashboard_layout";

export default function App({ Component, pageProps, router }: AppProps) {
  const is_dashboard_page = router.pathname.startsWith("/dashboard");

  return is_dashboard_page ? (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  ) : (
    <Component {...pageProps} />
  );
}
