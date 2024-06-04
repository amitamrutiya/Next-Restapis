import { Schema, model, models, Document } from "mongoose";

export interface Blog extends Document {
  title: string;
  description: string;
  user: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
}

const BlogSchema = new Schema<Blog>(
  {
    title: { type: "string", required: true },
    description: { type: "string" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const BlogModal = models.Blog || model("Blog", BlogSchema);

export default BlogModal;
