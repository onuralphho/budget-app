import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import AddExpenseSVG from "../svg/Transactional SMS.svg";
import { MdCheck } from "react-icons/md";
import { sleep } from "../utils/sleep";
import Expense from "./Expense";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import Image from "next/image";
import { HiSortAscending } from "react-icons/hi";
import { HiSortDescending } from "react-icons/hi";

const Profile = (props) => {
  const { data: session } = useSession();
  const [isNewExpense, setIsNewExpense] = useState(false);
  const [isExpenses, setIsExpenses] = useState(true);
  const titleRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  const [isFormValid, setIsFormValid] = useState(true);
  const [showPpChanger, setShowPpChanger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpenseSaved, setIsExpenseSave] = useState(false);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const [image, setImage] = useState();

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

  const uploadImage = async (e) => {
    e.preventDefault();
    let img_url;
    setImgLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "budget-images");
    data.append("cloud_name", "djmonktf8");
    await fetch("https://api.cloudinary.com/v1_1/djmonktf8/image/upload", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        img_url = data.url;

        session.user.image = img_url;
      })
      .catch((err) => console.log(err));

    const obj = {
      image: img_url,
      email: session.user.email,
    };

    const res2 = await fetch("/api/profile-update", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });

    const data_pp = res2.json();

    setImgLoading(false);

    refreshData();
  };

  return (
    
    <div className="container shadow rounded-5 p-4">
      <div className="row justify-content-center ">
        <div
          style={{ minWidth: "20rem" }}
          className=" col-sm-3 rounded-3 s col-md-3 text-center"
        >
          <Image
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            style={{ minWidth: "15rem" }}
            src={props.userData.user.image}
            className="img-fluid rounded-3 shadow"
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
              <form className=" d-flex gap-2" onSubmit={uploadImage}>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control "
                  type="file"
                  id="formFile"
                  accept="image/*"
                />
                <button type="submit" className="btn btn-success ">
                  {imgLoading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <span>Submit</span>
                  )}
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
              <button className="btn btn-dark position-relative py-2">
                <h2 className="my-auto">Family</h2>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  New
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
        <div className="row gap-5 p-4  mt-3 justify-content-center mb-5 mb-md-0 ">
          <div className="row">
            {props.expensesData.expenses.length === 0 ? (
              <h2 className="text-center">No expense founded! Add one!</h2>
            ) : (
              <span className="text-end ">
                <button
                  onClick={() => {
                    setAscendingOrder(!ascendingOrder);
                  }}
                  className="btn"
                >
                  {ascendingOrder ? (
                    <HiSortAscending size={40} />
                  ) : (
                    <HiSortDescending size={40} />
                  )}
                </button>
              </span>
            )}
          </div>
          {ascendingOrder
            ? _.sortBy(props.expensesData.expenses, "date")
                .slice(0)
                .reverse()
                .map((expense) => (
                  <Expense key={expense._id} expenseData={expense} />
                ))
            : _.sortBy(props.expensesData.expenses, "date").map((expense) => (
                <Expense key={expense._id} expenseData={expense} />
              ))}
        </div>
      )}
      {isNewExpense && (
        <div className="row mt-3 justify-content-center gap-5 mb-5 mb-md-0">
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
                step="any"
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
