import "bootstrap/dist/css/bootstrap.css";
import Layout from "../layout/Layout";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
