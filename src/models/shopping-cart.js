const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

const ShoppingCartModel = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCartModel;
