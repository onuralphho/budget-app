import { Schema, model, models } from "mongoose";

const familySchema = new Schema({
  owner: { type: String },
  members: { type: Array, default : [] },
  name: { type: String },
  date: { type: Date },
  expenses:{type: Array, default: []}
});

const families = models.families || model("families", familySchema);

export default families;
