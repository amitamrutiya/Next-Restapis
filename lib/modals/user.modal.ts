import { Schema, model, models, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    email: { type: "string", required: true, unique: true },
    username: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const UserModal = models.User || model("User", UserSchema);

export default UserModal;
