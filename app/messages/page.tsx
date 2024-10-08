import { FC } from "react";
import "@/models/Property";
import connectDb from "@/config/database";
import { ISessionUser, getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import { IMessage } from "@/interfaces";
import MessageCard from "@/components/MessageCard";

const MessagesPage: FC = async () => {
  await connectDb();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser as ISessionUser;

  console.log("id", userId);

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...readMessages, ...unreadMessages].map(
    // @ts-ignore
    (messageDoc: IMessage) => {
      return {
        _id: messageDoc._id.toString(),
        sender: {
          _id: messageDoc.sender._id.toString(),
          username: messageDoc.sender.username,
        },
        property: {
          _id: messageDoc.property._id.toString(),
          name: messageDoc.property.name,
        },
        name: messageDoc.name,
        email: messageDoc.email,
        phone: messageDoc.phone,
        body: messageDoc.body,
        read: messageDoc.read,
        createdAt: messageDoc.createdAt.toISOString(),
        updatedAt: messageDoc.updatedAt.toISOString(),
      };
    }
  );

  console.log(messages);

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto py-24 max-w 6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="mb-4 text-3xl font-bold text-center">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                // @ts-ignore
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
