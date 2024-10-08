import connectDb from "@/config/database";
import Property from "@/models/Property";
import { IPaginationInner, IProperty } from "@/interfaces";
import PropertyCard from "@/components/Card/PropertyCard";
import { FC } from "react";
import Pagination from "@/components/Pagination";

interface IPagination {
  searchParams: IPaginationInner;
}

const PropertiesPage: FC<IPagination> = async ({
  searchParams: { page = 1, pageSize = 9 },
}) => {
  await connectDb();
  const skip: number = (page - 1) * pageSize;
  const total = await Property.countDocuments([]);
  const properties = (await Property.find({})
    .skip(skip)
    .limit(pageSize)) as IProperty[];

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>There are no properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={Number(page)}
            pageSize={Number(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
