import Link from "next/link";
import { FC } from "react";

interface IButtonInfo {
  text: string;
  link: string;
  bgColor: string;
}

interface IInfoBox {
  description: string;
  heading: string;
  bgColor: string;
  textColor: string;
  buttonInfo: IButtonInfo;
}

const InfoBox: FC<IInfoBox> = ({
  description,
  heading,
  bgColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
}) => {
  return (
    <div className={`${bgColor} bg-gray-100 p-6 rounded-lg shadow-md`}>
      <h2 className={` ${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={` ${textColor} mt-2 mb-4`}>{description}</p>
      <Link
        href={buttonInfo.link}
        className={` ${buttonInfo.bgColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
