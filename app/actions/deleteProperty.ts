"use server";
import cloudinary from "@/config/cloudinary";
import { IProperty } from "@/interfaces";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string): Promise<void> {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const property = (await Property.findById(propertyId)) as IProperty;

  if (!property) throw new Error("Property not found");
  if (property.owner.toString() !== userId) throw new Error("Unauthorized");

  const publicIds = property.images.map((imageUrl) => {
    const parts: string[] = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  await Property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
