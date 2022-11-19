
import AuthForm from "../../components/AuthForm";
import { useSession, signIn, signOut,getSession } from "next-auth/react";

const LoginPage = () => {

  const { data: session } = useSession();
  
  return <AuthForm session={session} signIn={signIn} signOut={signOut}/>;
};

export default LoginPage;


export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      session,
    },
  };
};
