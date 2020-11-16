import React, { useState } from "react";
import MovieTable from "../components/Movie-Table/movieTable";
import ListGroup from "../components/List-Group/listGroup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface MoviesProps {}

export interface MoviesInterface {
  id: Number;
  title: string;
  genre: string;
  stock: number;
  rate: number;
  liked: boolean;
}

const Movies: React.SFC<MoviesProps> = (props: MoviesProps) => {
  const [movies, updateMovies]: any = React.useState([]);
  const [selectedGenre, changeSelectedGenre]: any = React.useState(null);
  const [currentPage, updateCurrentPage]: any = React.useState(1);
  const [searchInput, changeSearchInput]: any = React.useState("");

  return (
    <div className="">
      <h1 className="my-5 text-center font-weight-bolder">Available Movies</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-2">
          <ListGroup
            selectedGenre={selectedGenre}
            changeSelectedGenre={changeSelectedGenre}
            updateCurrentPage={updateCurrentPage}
          />
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-7">
              <input
                type="search"
                className="form-control"
                placeholder="Search for a movie"
                name=""
                id=""
                value={searchInput}
                onChange={(e) => changeSearchInput(e.currentTarget.value)}
              />
            </div>
            <div className="col-5">
              <Link to="add-new-movie">
                <Button variant="outline-success">Add New Movie</Button>
              </Link>
            </div>
          </div>
          <br />
          <MovieTable
            movies={movies}
            updateMovies={updateMovies}
            selectedGenre={selectedGenre}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
            searchInput={searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
