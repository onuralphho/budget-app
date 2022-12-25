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
        <>
          <div
            className="position-fixed top-0 start-0  bg-dark opacity-75 "
            style={{ height: "100%", width: "100%", zIndex: "90" }}
          ></div>
          <div className=" position-fixed d-flex justify-content-center align-items-center top-0 " style={{ height: "100%", width: "100%", zIndex: "98"}}>
            <div
              className="spinner-square position-fixed mx-auto my-auto"
              style={{ zIndex: "98" }}
            >
              <div className="square-1 square" style={{ zIndex: "98" }}></div>
              <div className="square-2 square " style={{ zIndex: "98" }}></div>
              <div className="square-3 square" style={{ zIndex: "98" }}></div>
            </div>
          </div>
        </>
      )
    );
  };

  return (
    <SessionProvider session={session}>
      <Layout>
        <Loading></Loading>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
