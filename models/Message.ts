import { IMessageSchema } from "@/interfaces";
import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema<IMessageSchema>(
  {
    sender: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    body: String,
    phone: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  models.Message || model<IMessageSchema>("Message", MessageSchema);
export default Message;
