import { hash } from "bcryptjs";
import connectMongo from "../../database/conn";
import users from "../../model/Schema";

const handler = async (req, res) => {

  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    const {email, password} = req.body;

    req.body.password = await hash(password, 12)
    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data...!" });
    }

    const checkExisting = await users.findOne({ email });
    if (checkExisting) {
      return res.status(422).json({ message: "User Already Exists!" });
    }

    
    users.create(req.body,
      function (err, data) {
        
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler;
