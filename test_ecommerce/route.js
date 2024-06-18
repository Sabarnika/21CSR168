const express = require("express");
const router = express.Router();
const Company = require("./model"); 
router.post("/add", async (req, res) => {
  try {
    const { companyName, products } = req.body;
    const newCompany = new Company({
      companyName,
      products,
    });
   const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// router.get("/products", async (req, res) => {
//     try {
//       const allProducts = await Company.find({}, { products: 1, _id: 0 }); 
//       let productsArray = [];
//       allProducts.forEach(company => {
//         productsArray = [...productsArray, ...company.products];
//       });
//       res.status(200).json(productsArray);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
router.get("/products", async (req, res) => {
    try {
      const allProducts = await Company.find(
        { 'products.price': { $gte: 1, $lte: 10000 } }, 
        { products: { $elemMatch: { price: { $gte: 1, $lte: 10000 } } } }
      ); 
      let productsArray = [];
      allProducts.forEach(company => {
        productsArray = [...productsArray, ...company.products];
      });
      res.status(200).json(productsArray);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  
  router.get("/:companyName/products", async (req, res) => {
    try {
      const companyName = req.params.companyName;
      console.log("Searching for company:", companyName);
      const company = await Company.findOne({ companyName: companyName });
      if (!company) {
        console.log("Company not found:", companyName);
        return res.status(404).json({ message: "Company not found" });
      }
      const products = company.products;
      res.status(200).json(products);
    } catch (err) {
      console.error("Error retrieving company:", err.message);
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;
