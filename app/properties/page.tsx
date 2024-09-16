"use client";
import PropertyCard from "@/components/Card/PropertyCard";
import properties from "@/properties.json";
import { FC } from "react";

console.log(properties);

interface ILocation {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface IRates {
  weekly: number;
  monthly?: number;
  nightly?: number;
}

interface ISellerInfo {
  name: string;
  email: string;
  phone: string;
}

interface IProperty {
  amenities: string[];
  baths: number;
  beds: number;
  createdAt: string;
  description: string;
  images: string[];
  is_featured: boolean;
  location: ILocation;
  name: string;
  owner: string;
  rates: IRates;
  seller_info: ISellerInfo;
  square_feet: number;
  type: string;
  updatedAt: string;
  _id: string;
}

const propertiesTyped: IProperty[] = properties;

const PropertiesPage: FC = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {propertiesTyped.length === 0 ? (
          <p>There are no any properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertiesTyped.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
