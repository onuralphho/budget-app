import "bootstrap/dist/css/bootstrap.css";
import Layout from "../layout/Layout";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Loading = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleStart = (url) => url !== router.asPath && setLoading(true);
      const handleComplete = (url) =>
        url === router.asPath && setLoading(false);

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    });

    return (
      loading && (
        <div
          className="d-flex justify-content-center align-items-center bg-white "
          style={{ height: "100vh", width: "100vw" }}
        >
          <div class="spinner-square">
            <div class="square-1 square"></div>
            <div class="square-2 square"></div>
            <div class="square-3 square"></div>
          </div>
        </div>
      )
    );
  };

  return (
    <SessionProvider session={session}>
      <Loading></Loading>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
