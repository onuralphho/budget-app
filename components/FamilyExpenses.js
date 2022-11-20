const FamilyExpenses = (props) => {
  return (
    <>
    <tr>
      <td>{props.expense.name}</td>
      <td>{props.expense.title}</td>
      <td className={`${props.expense.amount >100 ? 'text-danger' : props.expense.amount > 50 ? 'text-warning' : props.expense.amount > 0 ?'text-success' : ''}`}>${props.expense.amount}</td>
      <td>{props.expense.date}</td>
    </tr>
    </>
  );
};

export default FamilyExpenses;
