"use client";
import { IPropertyProp } from "@/interfaces";
import { FC } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  ViberIcon,
  WhatsappIcon,
  EmailIcon,
  VKShareButton,
  TwitterShareButton,
  TwitterIcon,
  VKIcon,
} from "react-share";

const ShareButtons: FC<IPropertyProp> = ({ property }) => {
  const shareUrl: string = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        {" "}
        Share this property
      </h3>
      <div className="flex justify-center gap-3 pb-5">
        <FacebookShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          //@ts-ignore
          quote={`${property.name}`}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TelegramShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          title={`${property.name}`}
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
        <ViberShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          title={`${property.name}`}
        >
          <ViberIcon size={40} round />
        </ViberShareButton>
        <WhatsappShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          title={`${property.name}`}
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <EmailShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          subject={`${property.name}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
        <VKShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          title={`${property.name}`}
        >
          <VKIcon size={40} round />
        </VKShareButton>
        <TwitterShareButton
          className="hover:scale-110 transition-all duration-300"
          url={shareUrl}
          title={property.name}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
