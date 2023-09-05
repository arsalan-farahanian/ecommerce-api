const Product = require("../models/Product");

module.exports = {
  products_get: async (req, res, next) => {
    let page = +req.query.page || 1; // getting what page the user is on
    page = page >= 1 ? page : 1; // preventing explicit negative pages

    let limit = +req.query.limit || 5;
    limit = limit >= 5 ? limit : 5;

    try {
      const products = await Product.find()
        .select("-ratings")
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
      let product = await Product.findById(productId).select("-ratings").exec();
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

  productReviews_get: async (req, res, next) => {
    let productId = req.params.id;

    let page = +req.query.page || 1; // getting what page the user is on
    page = page >= 1 ? page : 1; // preventing explicit negative pages

    let limit = +req.query.limit || 5;
    limit = limit >= 5 ? limit : 5;

    try {
      let product = await Product.findById(productId)
        .select("ratings")
        .limit(limit)
        .skip((page - 1) * limit)
        .populate({
          path: "ratings",
          populate: {
            path: "userId",
            model: "User",
            select: "firstname lastname email",
          },
        })
        .exec();

      res.status(200).json({
        msg: "Reviews were fetched successfully",
        reviews: product.ratings,
      });
    } catch (err) {
      next(err);
    }
  },
};
