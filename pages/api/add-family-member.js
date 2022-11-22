import families from "../../model/familySchema";
import connectMongo from "../../database/conn";

const handler2 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
  
    
    

    families.findOneAndUpdate(
      { _id: req.body.familyId },
      { $push: { members: req.body.email } },
      function (err, data) {
        if (err)
          return res.status(404).json({ message: "Something went wrong!" });
        res.status(201).json({status:true ,message: "Member added successfuly!" });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler2;
