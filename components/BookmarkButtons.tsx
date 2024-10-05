"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { IPropertyProp } from "@/interfaces";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton: FC<IPropertyProp> = ({ property }) => {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;

  const handleBookmarkClick = async (): Promise<void> => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }
    console.log(
      "Click detected, calling bookmarkProperty with ID:",
      property._id
    );
    bookmarkProperty(property._id).then((res) => {
      console.log("Response from bookmarkProperty:", res);

      if (res.error) return toast.error(res.error);
      toast.success(res.message);
    });
  };

  return (
    <button
      onClick={handleBookmarkClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
