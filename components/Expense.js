import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const Expense = (props) => {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const date = props.expenseData.date.split("T");
  const [notification, setNotification] = useState({
    status: null,
    message: null,
  });

  const deleteHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("api/get-expenses", {
      method: "DELETE",
      body: JSON.stringify({
        id: props.expenseData._id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setNotification(data);

    refreshData();
  };

  return (
    <>
      {notification.status === "ok" && (
        <div className="col-2 rounded-4 bg-white d-none d-md-block bottom-0 end-0 fw-bold  position-absolute shadow-lg fs-5 p-3 text-success  text-center">
          {notification.message}
        </div>
      )}

      <div className="CardEffect col-md-4 col-xl-3 border rounded-5 shadow p-3">
        <div className="row justify-content-end pe-3">
          <button
            onClick={deleteHandler}
            className="btn btn-close position-relative"
          ></button>
        </div>
        <div className="row">
          <div className="col-6  my-auto">
            <Image
              height={300}
              width={300}
              placeholder="blur"
              blurDataURL="https://img.freepik.com/free-vector/flat-design-installment-illustration_23-2149389193.jpg?w=826&t=st=1668345154~exp=1668345754~hmac=d0ecb52b91979d1cf930e9c9eb6b224201fcb1b9e7664b6d6baf6b4ba700b3c3"
              src="https://img.freepik.com/free-vector/flat-design-installment-illustration_23-2149389193.jpg?w=826&t=st=1668345154~exp=1668345754~hmac=d0ecb52b91979d1cf930e9c9eb6b224201fcb1b9e7664b6d6baf6b4ba700b3c3"
              alt="expense pic"
              className="img-fluid"
            />
          </div>
          <div className="col-6 mt-2">
            <div className="row">
              <h5 className="fw-bold">
                {" "}
                {props.expenseData.title.toUpperCase()}
              </h5>
            </div>
            <div className="row">
              <h5
                className={`${
                  props.expenseData.amount > 100
                    ? "text-danger"
                    : props.expenseData.amount > 50
                    ? "text-warning"
                    : props.expenseData.amount > 0
                    ? "text-success"
                    : ""
                }`}
              >
                ${props.expenseData.amount}
              </h5>
            </div>
            <div className="row">
              <div className="col fst-italic">{props.expenseData.name} </div>
            </div>
            <div className="row mt-2">
              <div className="col fst-italic fw-semibold">{date[0]}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expense;
