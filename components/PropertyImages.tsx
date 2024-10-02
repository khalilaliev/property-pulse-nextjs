import { FC } from "react";
import { IImageProp } from "@/interfaces";
import Image from "next/image";
import { div } from "framer-motion/client";

interface IPropImages {
  images: string[];
}

const PropertyImages: FC<IPropImages> = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, i) => (
              <div
                key={i}
                className={`${
                  images.length !== 3 && i === 2 ? "col-span-2" : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
