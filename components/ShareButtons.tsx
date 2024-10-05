import { IPropertyProp } from "@/interfaces";
import { FC } from "react";
import { FaShare } from "react-icons/fa";

const ShareButtons: FC<IPropertyProp> = ({ property }) => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="fas fa-share mr-2"></FaShare> Share Property
    </button>
  );
};

export default ShareButtons;
