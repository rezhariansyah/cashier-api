const productModels = require("../models/product");
const MiscHelper = require("../helpers/helpers");
const cloudinary = require("cloudinary");

module.exports = {
  getAllProduct: (req, res) => {
    productModels.getAllProduct((err, result) => {
      if (err) console.log(err);

      MiscHelper.response(res, result, 200);
    });
  },
  getTotalCart: (req, res) => {
    productModels.getTotalCart((err, result) => {
      if (err) console.log(err);

      MiscHelper.response(res, result, 200);
    });
  },
  addToCart: (req, res) => {
    let id_product = req.params.id_product;
    let status = {
      status: "cart"
    };
    productModels
      .addToCart(status, id_product)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteCartItem: (req, res) => {
    let id_product = req.params.id_product;
    productModels
      .deleteCartItem(id_product)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getCartStatus: (req, res) => {
    productModels
      .getCartstatus()
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addProduct: async (req, res) => {
    const path = req.file.path;
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: "dewnmhir6",
        api_key: "634673581744656",
        api_secret: "kM7HXBmASUj8LnaDvSzGvj9ACG0"
      });

      let dataimg;
      await cloudinary.uploader.upload(path, result => {
        console.log("coba ini", path);
        // const fs = require('fs')
        // fs.unlink(path)
        dataimg = result.url;
      });
      return dataimg;
    };
    const data = {
      name: req.body.name,
      price: req.body.price,
      img: await getUrl()
    };
    productModels
      .addProduct(data)
      .then(result => {
        MiscHelper.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
