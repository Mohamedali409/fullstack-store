import mongoose from "mongoose";
import AppError from "../../utils/AppError.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name should be unique"],
    },
    description: { type: String },
    level: {
      type: String,
      enum: ["main", "sub"],
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true },
);

categorySchema.virtual("subCategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

categorySchema.pre("save", function () {
  if (this.level === "main" && this.parent) {
    return next(new AppError("main category cant have a parent", 400));
  }
  if (this.level === "sub" && !this.parent) {
    return next(new AppError("Subcategory must be have a parent", 400));
  }
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
