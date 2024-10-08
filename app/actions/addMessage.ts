"use server";

import connectDb from "@/config/database";
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

  // Проверяем наличие авторизации пользователя
  if (!sessionUser || !sessionUser.userId) {
    return { error: "User is not authenticated" };
  }

  const { userId } = sessionUser;

  // Получаем recipient из формы и проверяем его наличие
  const recipient = formData.get("recipient");
  if (!recipient) {
    return { error: "Recipient is required" };
  }

  // Не допускаем отправку сообщения самому себе
  if (userId === recipient) {
    return { error: "You cannot send a message to yourself" };
  }

  try {
    // Создаем новое сообщение
    const newMessage = new Message({
      sender: userId,
      recipient,
      property: formData.get("property"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      body: formData.get("body"),
    });

    // Сохраняем сообщение в базу данных
    await newMessage.save();

    return { submitted: true };
  } catch (error) {
    console.error("Error while saving message:", error);
    return { error: "Failed to save message. Please try again." };
  }
}

export default addMessage;
