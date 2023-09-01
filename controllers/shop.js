const Product = require("../models/Product");

module.exports = {
  products_get: async (req, res, next) => {
    let page = +req.query.page || 1; // getting what page the user is on
    page = page >= 1 ? page : 1; // preventing explicit negative pages

    let limit = +req.query.limit || 5;
    limit = limit >= 5 ? limit : 5;

    try {
      const products = await Product.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      res.status(200).json({
        msg: "products were fetched",
        products: products,
        page: page,
        count: products.length,
      });
    } catch (err) {
      next(err);
    }
  },

  productById_get: async (req, res, next) => {
    let productId = req.params.id;

    try {
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  productById_delete: async (req, res, next) => {
    let productId = req.params.id;

    try {
      await Product.findByIdAndDelete(productId);
      res.status(204).json({ msg: "Product was deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
