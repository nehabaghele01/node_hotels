const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

//POST Method to add menu item in database
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //create menu using MenuItem model
    const newMenu = new MenuItem(data);

    //save into databse
    const response = await newMenu.save();
    console.log("menu saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//GET Method to get the menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//parameterized api calls
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //extract work type from the url parameter
    if (tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

///update routes for menuitem route

router.put("/:id", async (req, res) => {
  try {
    //extract id from parameter url
    //extract menu item data from req.body

    const personId = req.params.id;
    const updateMenuItem = req.body;

    //ab req.params ke through jo id aayi h usse us data ko database me find kro and use update kro and jo update krna use hume body me bhejna pdega
    const response = await MenuItem.findByIdAndUpdate(
      personId,
      updateMenuItem,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    //else
    console.log("data updated successfully !");

    res.status(200).json({ response });
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
    const response = await MenuItem.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "menu item not found" });
    }

    //else
    console.log("data deleted");
    res.status(200).json({ message: "menu item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
