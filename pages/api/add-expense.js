
import expenses from "../../model/expenseSchema";
import connectMongo from "../../database/conn";
const handler2 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data...!" });
    }
 
    expenses.create(req.body, function(err,data){
      if (err) return res.status(404).json({message:'denemeee'});
        res.status(201).json({ status: true, expense: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler2;
