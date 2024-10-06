"use server";

import connectDb from "@/config/database";
import { IPropertyData } from "@/interfaces";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

interface IMessageResponse {
  submitted?: boolean;
  error?: string;
}

async function addMessage(
  prevState: any,
  formData: FormData
): Promise<IMessageResponse> {
  await connectDb();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const recipient = formData.get("recipient");
  if (userId === recipient) {
    return { error: "You cannot send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
