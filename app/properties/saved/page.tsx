"use server";
import PropertyCard from "@/components/Card/PropertyCard";
import connectDb from "@/config/database";
import { IProperty } from "@/interfaces";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { FC } from "react";

const SavedProperties: FC = async (): Promise<JSX.Element> => {
  connectDb();
  // @ts-ignore
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  const savedProperties: IProperty[] = bookmarks as IProperty[];
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-3xl text-center mb-6">Saved Properties</h1>
        {savedProperties.length === 0 ? (
          <p>There is no saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
