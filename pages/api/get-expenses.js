import connectMongo from "../../database/conn";
import expenses from "../../model/expenseSchema";

const handler3 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
   
    expenses.find({emailOfUser:req.body.emailOfUser},function(err,data){
        res.status(201).json({expenses:data})
    })
    
    
 
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default handler3;
