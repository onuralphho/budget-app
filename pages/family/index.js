import { useRef, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Families from "../../components/Families";
import { MdCheck } from "react-icons/md";
import { useRouter } from "next/router";
import { sleep } from "../../utils/sleep";
const FamilyPage = ({ familyData }) => {
  const { data: session } = useSession();
  const nameRef = useRef();
  
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [complete, setComplete] = useState();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const date = Date.now();
    const res = await fetch("api/add-family", {
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
    setLoading(false);
    setComplete(true);

    await sleep(1000);

    setComplete(false);

    router.replace("/family");
  };

  return (
    <div className="container shadow rounded-4 p-5 ">
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
              <button
                type="submit"
                className={`btn btn-primary ${complete && "btn-success"}`}
                style={{ transition: "all 0.6s ease-ot" }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : complete ? (
                  <>
                    <span>Family Submited</span> <MdCheck size={20} />
                  </>
                ) : (
                  <span>Submit Your Family!</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {familyData && (
        <div className="row mt-4 gap-3 justify-content-evenly">
          {familyData.families
            .slice(0)
            .reverse()
            .map((family) => (
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
