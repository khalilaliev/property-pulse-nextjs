import { IUserSchema } from "@/interfaces";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUserSchema>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUserSchema>("User", UserSchema);
export default User;
