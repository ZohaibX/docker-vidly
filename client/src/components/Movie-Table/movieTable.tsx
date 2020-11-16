import React from "react";
import { Table } from "react-bootstrap";
import { FakeMoviesList } from "./../fakeMoviesList/list";
import { Button } from "react-bootstrap";
import Pagination from "../Pagination/pagination";
import { Paginate } from "./../Pagination/paginate";
import Like from "../Like/like";
import _ from "lodash";
import { MoviesInterface } from "../../pages/movies";
import { Link } from "react-router-dom";

export interface MovieTableProps {
  movies: any;
  updateMovies: any;
  selectedGenre: any;
  currentPage: any;
  updateCurrentPage: any;
  searchInput: any;
}

const MovieTable: React.SFC<MovieTableProps> = (props: MovieTableProps) => {
  const [moviesInASinglePage, updateMoviesSinglePage] = React.useState(4);

  const {
    currentPage,
    updateCurrentPage,
    searchInput,
    movies,
    updateMovies,
    selectedGenre,
  } = props;

  React.useEffect(() => {
    updateMovies(FakeMoviesList);
  }, []); // will work on 1st render only -- we may change it when using backend

  const columns = [
    {
      path: "title",
      title: "Movie",
      content: (movie: any) => (
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre", title: "Genre" },
    { path: "stock", title: "Stocks" },
    { path: "rate", title: "Rate" },
    {
      key: "like",
      content: (movie: any) => (
        <Like movie={movie} updateMovies={updateMovies} movies={movies} />
      ),
    },
    {
      key: "delete",
      content: (movie: any) => (
        <Button onClick={() => deleteMovie(movie)} variant="outline-danger">
          Delete
        </Button>
      ),
    },
  ];

  const showTableData = (movie: any, column: any) => {
    if (column.content) {
      return column.content(movie);
    }
    return _.get(movie, column.path); // it will get column.path(title or something) from movie object
  };

  const deleteMovie = (movie: any): any => {
    // here we normally do backend work to delete a movie
    const movieIndex = movies.indexOf(movie);
    const newMovies = movies.filter((m: any) => m.id !== movie.id);
    updateMovies(newMovies);
  };

  let filteredMovies = movies;

  if (selectedGenre && selectedGenre !== "All Genres") {
    filteredMovies = movies.filter(
      (movie: any) => movie.genre === selectedGenre
    );
  }

  // Search By Any Field
  if (searchInput) {
    filteredMovies = movies.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchInput.toLowerCase()) ||
        movie.stock === searchInput ||
        movie.rate === searchInput
    );
  }

  const paginatedMovies = Paginate(
    filteredMovies,
    moviesInASinglePage,
    currentPage
  );

  return (
    <div className="">
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.title ? column.title : column.key}>
                {column.title ? column.title : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {paginatedMovies.map((movie: MoviesInterface) => (
            <tr key={JSON.stringify(movie.id)}>
              {columns.map((column) => (
                <td key={movie.title + (column.path || column.key)}>
                  {showTableData(movie, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        moviesInASinglePage={moviesInASinglePage}
        moviesLength={filteredMovies.length}
        updateCurrentPage={updateCurrentPage}
      />
    </div>
  );
};

export default MovieTable;
