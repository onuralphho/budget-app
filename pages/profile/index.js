import Profile from "../../components/Profile";
import { getSession } from "next-auth/react";
import Head from "next/head";


const ProfilePage = ({ userData, expensesData }) => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Keep track of your expenses!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Profile userData={userData} expensesData={expensesData}></Profile>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps = async (context) => {
  
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-expenses`, {
    method: "POST",
    body: JSON.stringify({ emailOfUser: session.user.email }),
    headers: { "Content-Type": "application/json" },
  });

  const expensesData = await response.json();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-user`, {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
    headers: { "Content-Type": "application/json" },
  });
  const userData = await res.json();
  return {
    props: {
      expensesData,
      userData,
      session,
    },
  };
};
