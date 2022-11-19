import { useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Families from "../../components/Families";
import { useRouter } from "next/router";
const FamilyPage = ({ familyData }) => {
  const nameRef = useRef();
  const { data: session } = useSession();
  const router = useRouter();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const date = Date.now();
    const res = fetch("api/add-family", {
      method: "POST",
      body: JSON.stringify({
        owner: session.user.email,
        name: nameRef.current.value,
        date: date,
        members: [session.user.email],
        expenses: [],
      }),
      headers: { "Content-Type": "application/json" },
    });

    router.replace("/family");
  };

  return (
    <div className="container shadow rounded-4 p-5">
      <div className="row">
        <div className="row">
          <div className="col">
            <Link href="/profile">
              <button
                className=" btn btn-close border bg-danger "
                style={{ minWidth: "2rem", minHeight: "2rem" }}
              ></button>
            </Link>
          </div>
        </div>
        <div className="col-12 text-center">
          <h1>Create A Family</h1>
        </div>
        <form
          onSubmit={formSubmitHandler}
          className="row justify-content-center"
        >
          <div className="col col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                abc
              </span>
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                placeholder="Name of your family"
                aria-label="familyName"
              />
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary">
                Submit your family !
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {familyData && (
        <div className="row mt-4 gap-3 justify-content-evenly">
          {familyData.families.map((family) => (
            
            <Families key={family._id} family={family}></Families>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyPage;

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

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-family`, {
    method: "POST",
    body: JSON.stringify({ emailOfUser: session.user.email }),
    headers: { "Content-Type": "application/json" },
  });

  const familyData = await response.json();
  
  return {
    props: {
      familyData,
      session,
    },
  };
};
