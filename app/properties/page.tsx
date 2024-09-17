"use client";
import PropertyCard from "@/components/Card/PropertyCard";
import { IProperty } from "@/interfaces";
import properties from "@/properties.json";
import { FC } from "react";

console.log(properties);

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
