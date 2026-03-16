import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "product id is required"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemsSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.pre("save", function () {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.quantity * item.productId.price,
    0,
  );
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
