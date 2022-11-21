import { useRef, useState } from "react";
import AddExpenseSVG from "../svg/Transactional SMS.svg";
import { sleep } from "../utils/sleep";
import { useRouter } from "next/router";
import { MdCheck } from "react-icons/md";
const AddFamilyExpense = (props) => {
  const titleRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
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
      emailOfUser: props.session.email,
      name: props.session.name,
      amount: parseFloat(enteredAmount),
      title: enteredTitle,
      date: enteredDate,
    };
    
    const response = await fetch("/api/add-family-expenses", {
      method: "POST",
      body: JSON.stringify({
        familyId:router.query.familyId,
        expenseData:obj 
    }),
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

  return (
    <div className="row mt-3 justify-content-center gap-5 p-4">
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
  );
};

export default AddFamilyExpense;
