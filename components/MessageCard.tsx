"use client";
import deleteMessage from "@/app/actions/deleteMessages";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { IMessage } from "@/interfaces";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface IMessageProp {
  message: IMessage;
}

const MessageCard: FC<IMessageProp> = ({ message }): JSX.Element => {
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isDeleted, setIsDeleted] = useState<boolean>(message.read);

  const handleReadClick = async (): Promise<void> => {
    const read = await markMessageAsRead(message._id);
    // @ts-ignore
    setIsRead(read);
    toast.success(`Marked as ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    toast.success(`Message Deleted`);
  };

  if (isDeleted) return <p>Deleted Message</p>;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 ">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a className="text-blue-500" href={`mailto:${message.email}`}>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a className="text-blue-500" href={`tel:${message.phone}`}>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString("de-CH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
