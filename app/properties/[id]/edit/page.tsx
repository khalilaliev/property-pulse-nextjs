import PropertyEditForm from "@/components/PropertyEditForm";
import connectDb from "@/config/database";
import { IParams, IProperty } from "@/interfaces";
import Property from "@/models/Property";
import { FC } from "react";
const PropertyEditPage: FC<IParams> = async ({
  params,
}): Promise<JSX.Element> => {
  await connectDb();
  const property = (await Property.findById(params.id).lean()) as IProperty;
  if (!property) {
    return (
      <h1 className="text-2xl text-center font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 rounded-md mb-4 shadow-md border m-4 md:m-0">
            <PropertyEditForm property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyEditPage;
