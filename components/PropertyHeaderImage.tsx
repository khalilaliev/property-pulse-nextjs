import { IImageProp } from "@/interfaces";
import { div } from "framer-motion/client";
import Image from "next/image";
import { FC } from "react";

const PropertyHeaderImage: FC<IImageProp> = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vh"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
