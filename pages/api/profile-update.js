import connectMongo from "../../database/conn";
import users from "../../model/Schema";

const handler3 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
    if (!req.body) {
      res.status(404).json({ error: "Empty Form Data !" });
    }

    users.updateOne(
      { email: req.body.email },
      { $set: { image: req.body.image } },
      function (err, data) {
        if (err)
          return res.status(404).json({ message: "Something went wrong!" });
        res
          .status(201)
          .json({ message: "Picture added successfuly!" });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only PUT accepted...!" });
  }
};

export default handler3;
