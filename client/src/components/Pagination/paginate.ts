import _ from "lodash";

//! Pagination

export const Paginate = (
  movies: any,
  moviesInASinglePage: any,
  currentPage: any
) => {
  const index = (currentPage - 1) * moviesInASinglePage;
  return _(movies).slice(index).take(moviesInASinglePage).value();
};
