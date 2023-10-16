require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
  })
);

// In-memory car collection (replace this with a database if needed)
let allCars = [];

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

// Serve static files from the "Main" folder
app.use(express.static('Main'));

app.post("/remove-car", (req, res) => {
  try {
    const carName = req.body.carName;
    const carPrice = req.body.carPrice;

    console.log("Received request to remove car:", carName, carPrice);

    // Logic to remove the car from the in-memory collection
    allCars = allCars.filter(car => !(car.name === carName && car.price === carPrice));

    // Redirect to collection.html after successfully removing the car
    res.redirect('/Main/collection.html');
  } catch (e) {
    console.error(e); // Log the error
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Your existing code for creating a checkout session
  } catch (e) {
    console.error('Error creating checkout session:', e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
