import Link from "next/link";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBack: FC = () => {
  return (
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Properties
        </Link>
      </div>
    </section>
  );
};

export default GoBack;
