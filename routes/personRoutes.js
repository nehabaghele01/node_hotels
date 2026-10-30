const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

//post route to add new person (USING ASYNC AWAIT)
router.post("/", async (req, res) => {
  try {
    const data = req.body; //assuming the request body conatains the person data

    //create a new person document using the mongoose model
    const newPerson = new Person(data);

    //save the new person data to the database
    const response = await newPerson.save();
    console.log("data saves");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//ask for data from server (database)
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data is fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//parameterized api calls
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract id from url paramater
    const updatePersonData = req.body; //person data for updation

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //return updated document
        runValidators: true, // run mongoose validation
      },
    );
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    //else
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete endpoint / api
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract id from url parameter
    //assuming you have the Person model
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    //else
    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
