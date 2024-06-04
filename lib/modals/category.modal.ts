import { Schema, model, models, Document } from "mongoose";

export interface Category extends Document {
  title: string;
  user: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<Category>(
  {
    title: { type: "string", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const CategoryModal = models.Category || model("Category", CategorySchema);

export default CategoryModal;
