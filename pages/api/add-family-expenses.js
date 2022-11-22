import families from "../../model/familySchema";
import connectMongo from "../../database/conn";

const handler2 = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "DELETE") {
    families.updateOne(
      { _id: req.body.familyId },
      { $pull: { expenses: { id: req.body.id } } },
      function (err, data) {
        if (err)
          return res.status(404).json({ message: "Something went wrong!" });
        res.status(201).json({ message: "Expense deleted!" });
      }
    );

    return;
  }

  if (req.method === "POST") {
    families.findOneAndUpdate(
      { _id: req.body.familyId },
      { $push: { expenses: req.body.expenseData } },
      function (err, data) {
        if (err)
          return res.status(404).json({ message: "Something went wrong!" });
        res.status(201).json({ message: "Expense added successfuly!" });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
};

export default handler2;
