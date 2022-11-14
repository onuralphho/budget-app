import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect('mongodb+srv://admin_onuralp:Da7t0hqvz@cluster0.hg1engs.mongodb.net/Budget?retryWrites=true&w=majority');
    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
