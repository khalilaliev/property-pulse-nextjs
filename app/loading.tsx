"use client";
import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IOverride {
  display: string;
  margin: string;
}

const override: IOverride = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage: FC = () => {
  return (
    <>
      <ClipLoader
        color="#3b82f6"
        cssOverride={override}
        size={150}
        aria-label="Loading spinner"
      />
    </>
  );
};

export default LoadingPage;
