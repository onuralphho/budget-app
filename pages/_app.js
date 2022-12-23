import "bootstrap/dist/css/bootstrap.css";
import Layout from "../layout/Layout";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const Loading = () => {
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
          className="position-absolute  d-flex justify-content-center align-items-center bg-white "
          style={{ height: "100%", width: "100%" }}
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
      
      <Layout>
      <Loading></Loading>
        {!loading&&<Component {...pageProps} />}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
