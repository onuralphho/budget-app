import SignUpForm from "../../components/SignUpForm";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
const SignUpPage = () => {
  const { data: session } = useSession();
  return <SignUpForm session={session} signIn={signIn} signOut={signOut} />;
};

export default SignUpPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/profile",
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
