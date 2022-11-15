const Expense = (props) => {
 const date = props.expenseData.date.split("T")
 
  return (
  
      <div  className="col-md-4 col-xl-3 border rounded-5 shadow p-3">
        <div className="row">
          <div className="col-6">
            <img
              className=" img-fluid"
              src="https://img.freepik.com/free-vector/flat-design-installment-illustration_23-2149389193.jpg?w=826&t=st=1668345154~exp=1668345754~hmac=d0ecb52b91979d1cf930e9c9eb6b224201fcb1b9e7664b6d6baf6b4ba700b3c3"
              alt="expense pic"
            />
          </div>
          <div className="col-6 mt-2">
            <div className="row">
             
              <h5 className="fw-bold"> {props.expenseData.title.toUpperCase()}</h5>
            </div>
            <div className="row">
              <h5 className=" text-danger">${props.expenseData.amount}</h5>
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
  );
};

export default Expense;
