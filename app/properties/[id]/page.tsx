import { FC } from "react";

interface IParams {
  params: {
    id: number;
  };
}

const PropertyPage: FC<IParams> = ({ params }) => {
  return (
    <>
      <div>get param {params.id}</div>
    </>
  );
};

export default PropertyPage;
