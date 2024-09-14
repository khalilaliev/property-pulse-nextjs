import { FC } from "react";
import InfoBox from "./InfoBox";

const InfoBoxes: FC = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            description=" Find your dream rental property. Bookmark properties and contact
              owners."
            bgColor="bg-gray-100"
            textColor="text-gray-800"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              bgColor: "bg-black",
            }}
          />
          <InfoBox
            heading="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
            bgColor="bg-blue-100"
            textColor="text-gray-800"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              bgColor: "bg-blue-500",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
