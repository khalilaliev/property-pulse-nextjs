"use server";
import PropertyCard from "@/components/Card/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDb from "@/config/database";
import { IProperty } from "@/interfaces";
import Property from "@/models/Property";
import Link from "next/link";
import { FC } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface IProps {
  location: string;
  propertyType: string;
}

interface ISearchParam {
  searchParams: IProps;
}

const SearchResultsPage: FC<ISearchParam> = async ({
  searchParams: { location, propertyType },
}): Promise<JSX.Element> => {
  await connectDb();
  const locationPattern: RegExp = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern: RegExp = new RegExp(propertyType, "i");
    // @ts-ignore
    query.type = typePattern;
  }

  // const propertiesQueryResults = await Property.find(query).lean()
  const properties = await Property.find(query).lean();
  const convertedProperties = properties as IProperty[];

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto flex-col flex px-4 items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3 cursor-pointer"
          >
            <FaArrowAltCircleLeft className="mr-2 text-xl" /> Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {convertedProperties.length === 0 ? (
            <p>No search results </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {convertedProperties.map((property) => (
                <PropertyCard key={String(property._id)} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
