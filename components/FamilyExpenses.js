import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";
import { useState } from "react";
const FamilyExpenses = (props) => {
  const [isDeleting, setIsDeleting] = useState();
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const deleteFamilyExpenseHandler = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    const res = await fetch("/api/add-family-expenses", {
      method: "DELETE",
      body: JSON.stringify({
        familyId: props.familyId,
        id: props.expense.id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setIsDeleting(false);

    refreshData();
  };

  return (
    <>
      <tr>
        <td>
          <span className="me-3 me-md-0">{props.expense.name}</span>
          {isDeleting ? (
            <span className=" ms-3 text-danger spinner-border spinner-border-sm"></span>
          ) : (
            <span
              onClick={deleteFamilyExpenseHandler}
              className="m-2 text-danger"
              style={{cursor:'pointer'}}
            >
              <MdDeleteForever size={25} />
            </span>
          )}
        </td>
        <td>{props.expense.title}</td>
        <td
          className={`${
            props.expense.amount > 100
              ? "text-danger"
              : props.expense.amount > 50
              ? "text-warning"
              : props.expense.amount > 0
              ? "text-success"
              : ""
          }`}
        >
          ${props.expense.amount}
        </td>
        <td>{props.expense.date}</td>
      </tr>
    </>
  );
};

export default FamilyExpenses;
