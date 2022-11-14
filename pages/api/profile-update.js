import connectMongo from "../../database/conn";
import users from "../../model/Schema";

const handler3 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "PUT") {
    if (!req.body) {
      res.status(404).json({ error: "Empty Form Data !" });
    }

    await users.updateOne(
      { email: req.body.email },
      { $set: { image: req.body.image } }
    );  
    
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only PUT accepted...!" });
  }
};

export default handler3;
