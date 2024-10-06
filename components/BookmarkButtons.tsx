"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { IPropertyProp } from "@/interfaces";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const BookmarkButton: FC<IPropertyProp> = ({ property }) => {
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

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
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  if (loading)
    return (
      <p className="uppercase text-center py-2 text-blue-500">Loading...</p>
    );

  return isBookmarked ? (
    <button
      onClick={handleBookmarkClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookmarkClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
