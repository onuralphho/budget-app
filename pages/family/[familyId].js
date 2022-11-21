import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import FamilyExpenses from "../../components/FamilyExpenses";
import AddFamilyExpense from "../../components/AddFamilyExpense";
import _ from "lodash";
import { TbArrowsSort } from "react-icons/tb";

const ProductDetail = ({ familyDetails }) => {
  const [isAddNewMember, setIsNewMember] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const { data: session } = useSession();
  const sessionOwner = { email: session.user.email, name: session.user.name };
  const emailRef = useRef();
  const router = useRouter();
  const [amountAscendingOrder, setAmountAscendingOrder] = useState(false);
  const [dateAscendingOrder, setDateAscendingOrder] = useState(false);
  const [checkSort, setCheckSort] = useState(false);
  const refreshData = () => router.replace(router.asPath);



  const memberAddFormHandler = async (e) => {
    e.preventDefault();
    
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
    
      <div className="container-me shadow-lg   rounded-4  ps-3 p-md-5 mb-5 mb-md-0">
        <div className="row justify-content-center ">
          <div className="row">
            <div className="col mt-3 d-md-none">
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="btn btn-dark "
              >
                Menu
              </button>
            </div>
          </div>
          <div
            className={`row m-2 p-2 justify-content-around rounded-4 gap-2 w-75 text-center bg-dark text-white ${
              isMenuOpen ? "d-flex" : "d-none d-md-flex"
            }`}
          >
            <div
              onClick={() => {
                setIsAddExpense(false);
              }}
              className="col-md-3 fs-5 fw-bold  "
              style={{ cursor: "pointer" }}
            >
              <span>Home Page</span>
            </div>

            <div
              onClick={() => {
                setIsAddExpense(true);
              }}
              className="col-md-3  fs-5 fw-bold"
              style={{ cursor: "pointer" }}
            >
              <span>Add Expense</span>
            </div>
          </div>
          <div className="row ps-4 pt-3">
            <Link
              href="/family"
              className="btn btn-close bg-danger"
              style={{ minWidth: "2rem", minHeight: "2rem" }}
            ></Link>
          </div>
          {isAddExpense && <AddFamilyExpense session={sessionOwner} />}
          {!isAddExpense && (
            <div className="row p-3 justify-content-center ">
              <div className="row text-center">
                <h1>{familyDetails.family.name}</h1>

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
              <div className="row gap-3 justify-content-md-start p-0 pb-5 flex-row-reverse ">
               

                <div
                  className="CardEffect col bg-dark border p-3 rounded-4 shadow overflow-auto "
                  style={{ maxHeight: "20rem" }}
                >
                  <h4 className="text-center text-white border-bottom pb-2">
                    Family Expenses
                  </h4>
                  <table className="table table-dark  table-bordered  table-striped table-sm  ">
                    <thead>
                      <tr className="">
                        <th className=" align-baseline">Name</th>
                        <th className=" align-baseline">Title</th>
                        <th className=" align-baseline ">
                          <span
                            onClick={() => {
                              setCheckSort(true);
                              setAmountAscendingOrder(!amountAscendingOrder);
                            }}
                            className="btn text-white align-baseline"
                          >
                            <TbArrowsSort size={20} />
                          </span>
                          Amount
                        </th>
                        <th className=" align-baseline"><span
                            onClick={() => {
                              setCheckSort(false);
                              setDateAscendingOrder(!dateAscendingOrder);
                            }}
                            className="btn text-white align-baseline"
                          >
                            <TbArrowsSort size={20} />
                          </span>Date</th>
                      </tr>
                    </thead>
                    <tbody
                      className="overflow-auto h-100"
                      style={{ maxHeight: "20rem" }}
                    >
                      {checkSort ? amountAscendingOrder
                        ? _.sortBy(familyDetails.family.expenses, "amount").map(
                            (expense) => (
                              <FamilyExpenses
                                key={Math.random() * Date.now()}
                                expense={expense}
                              />
                            )
                          )
                        : _.sortBy(familyDetails.family.expenses, "amount")
                            .slice(0)
                            .reverse()
                            .map((expense) => (
                              <FamilyExpenses
                                key={Math.random() * Date.now()}
                                expense={expense}
                              />
                            )):null}
                            
                      {!checkSort ? dateAscendingOrder
                        ? _.sortBy(familyDetails.family.expenses, "date").map(
                            (expense) => (
                              <FamilyExpenses
                                key={Math.random() * Date.now()}
                                expense={expense}
                              />
                            )
                          )
                        : _.sortBy(familyDetails.family.expenses, "date")
                            .slice(0)
                            .reverse()
                            .map((expense) => (
                              <FamilyExpenses
                                key={Math.random() * Date.now()}
                                expense={expense}
                              />
                            )):null}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4 border p-3 rounded-4 shadow text-center overflow-auto" style={{ maxHeight: "20rem" }}>
                  <div className="col">
                    <span>
                      <h4>Members</h4>
                    </span>
                  </div>
                  
                  {familyDetails.family.owner === sessionOwner.email && (
                    <div className="col">
                      <button
                        onClick={() => {
                          setIsNewMember(!isAddNewMember);
                        }}
                        className="btn btn-primary  bottom-0 mb-2 "
                      >
                        Add a member
                      </button>
                    </div>
                  )}
                  <ul className="list-group ">
                    {familyDetails.family.members.map((member) => (
                      <li
                        key={Math.random() * Date.now()}
                        className=" fs-5 border-bottom p-2"
                        style={{ listStyleType: "none" }}
                      >
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
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
      session,
      familyDetails,
    },
  };
};
