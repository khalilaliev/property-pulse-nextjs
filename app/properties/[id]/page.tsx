import GoBack from "@/components/GoBack";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import connectDb from "@/config/database";
import { IProperty } from "@/interfaces";
import Property from "@/models/Property";
import { FC } from "react";

interface IParams {
  params: {
    id: string;
  };
}

const PropertyPage: FC<IParams> = async ({ params }) => {
  await connectDb();

  const property = (await Property.findById(params.id).lean()) as IProperty;

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <GoBack />
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
