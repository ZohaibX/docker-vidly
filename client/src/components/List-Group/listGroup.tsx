import React, { useState } from "react";
import { fakeGenres } from "./../fakeGenreList/list";

export interface ListGroupProps {
  selectedGenre: any;
  changeSelectedGenre: any;
  updateCurrentPage: any;
}

const ListGroup: React.SFC<ListGroupProps> = (props: ListGroupProps) => {
  const [genres, setGenres]: any = useState([]);

  const { selectedGenre, changeSelectedGenre, updateCurrentPage } = props;

  React.useEffect(() => {
    setGenres(fakeGenres);
  }, []); // will work on 1st render only -- we may change it when using backend

  const updates = (genre: any) => {
    changeSelectedGenre(genre.title);
    updateCurrentPage(1);
  };

  return (
    <div className="">
      <ul className="list-group">
        {genres.map((genre: any) => (
          <li
            className={
              selectedGenre === genre.title
                ? "list-group-item active"
                : "list-group-item"
            }
            key={genre.title}
            onClick={() => updates(genre)}
          >
            {genre.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
