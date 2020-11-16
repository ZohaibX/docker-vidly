import React from "react";
import _ from "lodash";
import { Connect } from "../../Redux/4-connect";

//! Finding Range Here

export interface PaginationProps {
  moviesInASinglePage: number;
  moviesLength: number;
  updateCurrentPage: any;
}

const Pagination: React.SFC<PaginationProps> = (
  props: PaginationProps
): JSX.Element => {
  const { moviesInASinglePage, moviesLength, updateCurrentPage } = props;
  const pages: number = Math.ceil(moviesLength / moviesInASinglePage);
  const range = _.range(1, pages + 1);

  return (
    <div className="">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {range.map((page) => (
            <li
              key={page}
              onClick={() => updateCurrentPage(page)}
              className="page-item"
            >
              <span className="page-link">{page}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
