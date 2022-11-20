import connectMongo from "../../database/conn";
import families from "../../model/familySchema";

const handler3 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));
 

  if (req.method === "POST") {

    //For familydata for details
    if (req.body.id) {
      families.findOne({ _id: req.body.id }, function (err, data) {
        res.status(201).json({ family: data });
      });
    }

    //for find families that user have
    if (req.body.emailOfUser) {
      families.find({members: req.body.emailOfUser }, function (err, data) {
        res.status(201).json({ families: data });
      });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default handler3;
