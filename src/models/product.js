const db = require("../configs/db");

module.exports = {
  getAllProduct: callback => {
    db.query(`select * from product`, (err, result) => {
      if (err) console.log(err);

      callback(err, result);
    });
  },
  getTotalCart: callback => {
    db.query(`select count(id_product) as jumlah from product where status = 'cart'`, (err, result) => {
      if (err) console.log(err);

      callback(err, result);
    });
  },
  addToCart: (status, id_product) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE product SET ? WHERE id_product = ?",
        [status, id_product],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getCartstatus: () => {
    return new Promise((resolve, reject) => {
      db.query("select * from product where status = 'cart'", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteCartItem: id_product => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE product SET status = 'available' WHERE id_product = ?",
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  addProduct: data => {
    return new Promise((resolve, reject) => {
      db.query("insert into product set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
