import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
const ProductDetail = ({ familyDetails }) => {
  const [isAddNewMember, setIsNewMember] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const emailRef = useRef();
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const memberAddFormHandler = async (e) => {
    e.preventDefault();
    console.log(familyDetails.family._id);
    const res = await fetch("/api/add-family-member", {
      method: "POST",
      body: JSON.stringify({
        familyId: familyDetails.family._id,
        email: emailRef.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    refreshData();
  };

  return (
    <div className="container shadow-lg  rounded-4 p-4">
      <div className="row justify-content-center">
        <div className="row">
          <div className="col">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="btn btn-dark d-md-none"
            >
              Menu
            </button>
          </div>
        </div>
        <div
          className={`row m-2 p-2 justify-content-around rounded-4 gap-2   text-center bg-dark text-white ${
            isMenuOpen ? "d-flex" : "d-none d-md-flex"
          }`}
        >
          <div
            onClick={() => {
              setIsNewMember(false);
            }}
            className="col-md-3 fs-5 fw-bold  "
            style={{ cursor: "pointer" }}
          >
            <span>Home Page</span>
          </div>
          <div
            onClick={() => {
              setIsNewMember(true);
            }}
            className="col-md-3  fs-5 fw-bold"
            style={{ cursor: "pointer" }}
          >
            <span>Add Member</span>
          </div>
          <div
            onClick={() => {
              setIsNewMember(false);
            }}
            className="col-md-3  fs-5 fw-bold"
            style={{ cursor: "pointer" }}
          >
            <span>Add Expense</span>
          </div>
        </div>

        <div className="row p-3">
          <div className="row text-center">
            <Link
              href="/family"
              className="btn btn-close bg-danger"
              style={{ minWidth: "2rem", minHeight: "2rem" }}
            ></Link>
            <h1>{familyDetails.family.name}</h1>
          </div>
          <div className="row justify-content-md-start p-3">
            <div className="col-md-4 border p-3 rounded-4 shadow text-center ">
              <h4>Members</h4>
              <ul className="list-group ">
                {familyDetails.family.members.map((member) => (
                  <li
                    key={Math.random()}
                    className=" fs-5"
                    style={{ listStyleType: "none" }}
                  >
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {isAddNewMember && (
            <div className="row justify-content-center">
              <form
                onSubmit={memberAddFormHandler}
                className="col-md-6 d-flex gap-2"
              >
                <input
                  ref={emailRef}
                  className="form-control"
                  placeholder="Add New Member By Email"
                  type="email"
                />
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const familyId = context.query.familyId;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-family`, {
    method: "POST",
    body: JSON.stringify({ id: familyId }),
    headers: { "Content-Type": "application/json" },
  });

  const familyDetails = await res.json();

  if (Object.keys(familyDetails).length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (!familyDetails.family.members?.includes(session.user.email)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      familyDetails,
    },
  };
};
