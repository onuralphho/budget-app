import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import AddExpenseSVG from "../svg/Transactional SMS.svg";
import { MdCheck } from "react-icons/md";
import { sleep } from "../utils/sleep";
import Expense from "./Expense";
import { useRouter } from "next/router";
import Link from "next/link";
const Profile = (props) => {
  const { data: session } = useSession();
  const [isNewExpense, setIsNewExpense] = useState(false);
  const [isExpenses, setIsExpenses] = useState(true);
  const titleRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const imageRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
  const [showPpChanger, setShowPpChanger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpenseSaved, setIsExpenseSave] = useState(false);

  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const submitFormHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const enteredTitle = titleRef.current.value;
    const enteredDate = dateRef.current.value;
    const enteredAmount = amountRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredAmount.trim === "" ||
      enteredDate.trim() === ""
    ) {
      setIsFormValid(false);
      setIsLoading(false);
      return;
    }
    const obj = {
      emailOfUser: session.user.email,
      name: session.user.name,
      image:
        "https://img.freepik.com/free-vector/flat-design-installment-illustration_23-2149389193.jpg?w=826&t=st=1668345154~exp=1668345754~hmac=d0ecb52b91979d1cf930e9c9eb6b224201fcb1b9e7664b6d6baf6b4ba700b3c3",
      amount: enteredAmount,
      title: enteredTitle,
      date: enteredDate,
    };
    console.log(obj.date);
    const response = await fetch("/api/add-expense", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsLoading(false);
    setIsExpenseSave(true);
    await sleep(1000);
    setIsExpenseSave(false);

    setIsFormValid(true);
    refreshData();
  };

  const changeProfilePicHandler = async (e) => {
    const obj = { image: imageRef.current.value, email: session.user.email };

    await fetch("/api/profile-update", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="container  shadow rounded-5 p-4">
      <div className="row justify-content-center ">
        <div
          style={{ minWidth: "20rem" }}
          className=" col-sm-3 rounded-3 col-md-3 text-center"
        >
          <img
            style={{ minWidth: "15rem" }}
            src={props.userData.user.image}
            className="img-fluid rounded-3 "
            alt="profile-picture"
          />
          <button
            onClick={() => {
              setShowPpChanger(!showPpChanger);
            }}
            className="btn btn-primary m-2"
          >
            Change Profile Picture
          </button>

          {showPpChanger && (
            <>
              <form
                className=" d-flex gap-2"
                onSubmit={changeProfilePicHandler}
              >
                <input
                  ref={imageRef}
                  className="form-control "
                  type="file"
                  id="formFile"
                />
                <button type="submit" className="btn btn-success ">
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
        <div className="col">
          <div className="row ">
            <div>
              <h1>{props.userData.user.name}</h1>
              <p className="text-secondary"> ({props.userData.user.email}) </p>
            </div>
            <Link href="/family">
              <button className="btn btn-dark position-relative">
                <h2>Family</h2>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  New
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center bg-dark text-white rounded-4 mt-4 ps-4 pe-4 gap-5  justify-content-around">
        <div
          onClick={() => {
            setIsExpenses(true);
            setIsNewExpense(false);
          }}
          className="p-2 text-center "
          style={{ cursor: "pointer" }}
        >
          <h3>Expenses</h3>
        </div>
        <div
          onClick={() => {
            setIsNewExpense(true);
            setIsExpenses(false);
          }}
          className="p-2 text-center "
          style={{ cursor: "pointer" }}
        >
          <h3>New Expense </h3>
        </div>
      </div>
      {isExpenses && (
        <div className="row gap-5 p-4  mt-3 justify-content-center">
          <h2 className="text-center">Expenses</h2>
          {props.expensesData.expenses.map((expense) => (
            <Expense key={Math.random()} expenseData={expense} />
          ))}
        </div>
      )}
      {isNewExpense && (
        <div className="row mt-3 justify-content-center gap-5">
          <div className="col-md-4">
            <AddExpenseSVG />
          </div>
          <div className="col-md-4 card p-3">
            <form onSubmit={submitFormHandler}>
              <label htmlFor="title">
                <h3> Title of Expense</h3>
              </label>
              <input
                ref={titleRef}
                placeholder='"Hamburger at McDonalds"'
                type="text"
                className=" form-control mb-3"
              />
              <label htmlFor="title">
                <h3> Date of Expense</h3>
              </label>
              <input ref={dateRef} type="date" className=" form-control mb-3" />
              <label htmlFor="title">
                <h3> Amount of Expense</h3>
              </label>
              <input
                ref={amountRef}
                placeholder='"$10"'
                type="number"
                min={1}
                className=" form-control mb-3"
              />
              {!isFormValid && (
                <p className="text-danger">
                  Please fill all information about your expense!
                </p>
              )}
              <button
                type="submit"
                className={`w-100 btn btn-primary ${
                  isExpenseSaved && "btn-success"
                }`}
                style={{ transition: "all 0.6s ease-out" }}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : isExpenseSaved ? (
                  <>
                    <span>Expense Submited</span> <MdCheck size={20} />
                  </>
                ) : (
                  <span> Add Expense!</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
