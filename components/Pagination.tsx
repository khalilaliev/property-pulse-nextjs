import { IPaginationInner } from "@/interfaces";
import Link from "next/link";
import { FC } from "react";

const Pagination: FC<IPaginationInner> = ({ page, pageSize, totalItems }) => {
  const totalPages: number = Math.ceil(totalItems! / page);

  return (
    <section className="container mx-auto flex justify-center my-8 items-center">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
        >
          Nex
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;
