const Grocery = require("../model/grocery.js");
const cloudinary = require("cloudinary");

exports.createGrocery = async (req, res) => {
  try {
    const formData = req.body;
    const {
      groceryName,
      groceryDescription,
      quantity,
      unit,
      expiryDate,
      image,
    } = formData;

    if (image !== null) {
      const mycloud = await cloudinary.v2.uploader.upload(image, {
        folder: "Food",
      });
    }

    if (!formData.groceryName) {
      return res
        .status(400)
        .json({ error: "Grocery name is required.", success: false });
    }

    if (!formData.groceryDescription) {
      return res
        .status(400)
        .json({ error: "Grocery Description  is required.", success: false });
    }

    if (!formData.quantity) {
      return res
        .status(400)
        .json({ error: "Grocery quantity  is required.", success: false });
    }

    if (!formData.unit) {
      return res
        .status(400)
        .json({ error: "Grocery unit  is required.", success: false });
    }

    const newGrocery = new Grocery({
      name: groceryName,
      description: groceryDescription,
      quantityAvailable: quantity,
      pricePerUnit: unit,
      expiryDate: expiryDate,
      groceryPhoto: image !== null && {
        secure_url: mycloud.secure_url,
        public_id: mycloud.public_id,
      },
    });

    const savedGrocery = await newGrocery.save();
    res.status(201).json({ data: savedGrocery, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all grocery items
exports.getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json({ data: groceries, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
