const express = require("express");
const Route = express.Router();

const productController = require("../controllers/product");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

let upload = multer({ storage: storage }); 

Route
    .get("/", productController.getAllProduct)
    .get("/cart", productController.getCartStatus)
    .get("/totalCart", productController.getTotalCart)
    .patch("/:id_product", productController.addToCart)
    .patch("/delete/:id_product", productController.deleteCartItem)
    .post('/', upload.single('img'), productController.addProduct)

module.exports = Route;
