"use server";
import connectDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

interface BookmarkResponse {
  message: string;
  isBookmarked: boolean;
  error?: string;
}

async function bookmarkProperty(propertyId: string): Promise<BookmarkResponse> {
  await connectDb();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  let isBookmarked: boolean = user.bookmarks.includes(propertyId);
  let message: string;
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/property/save", "page");
  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
