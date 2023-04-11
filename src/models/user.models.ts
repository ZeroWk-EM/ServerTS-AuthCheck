import { Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verify: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

export default model<IUser>("users", UserSchema);
