import BookmarkButton from "@/components/BookmarkButtons";
import GoBack from "@/components/GoBack";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDb from "@/config/database";
import { IParams, IProperty } from "@/interfaces";
import Property from "@/models/Property";
import { FC } from "react";

const PropertyPage: FC<IParams> = async ({ params }) => {
  await connectDb();

  const property = (await Property.findById(params.id).lean()) as IProperty;
  if (!property) {
    return (
      <h1 className="text-center mt-10 font-bold text-2xl">
        Property not found
      </h1>
    );
  }

  const transformedProperty = {
    ...property,
    _id: property._id.toString(),
    owner: property.owner.toString(),
  };

  return (
    <>
      <PropertyHeaderImage image={transformedProperty.images[0]} />
      <GoBack />
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={transformedProperty} />
            <aside className="space-y-4">
              <BookmarkButton property={transformedProperty} />
              <ShareButtons property={transformedProperty} />
              <PropertyContactForm property={transformedProperty} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
