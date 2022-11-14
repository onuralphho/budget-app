import { Schema, model, models } from "mongoose";

const expensesSchema = new Schema({
  emailOfUser: { type: String },
  name: { type: String },
  image: { type: String },
  amount: { type: Number },
  title: { type: String },
  date: { type: Date },
});

const expenses = models.expenses || model("expenses", expensesSchema);

export default expenses;
