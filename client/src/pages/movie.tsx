import React from "react";
import { Form, Button } from "react-bootstrap";
import { addSyntheticTrailingComment } from "typescript";
import { FakeMoviesList } from "./../components/fakeMoviesList/list";
import { fakeGenres } from "./../components/fakeGenreList/list";

export interface MovieProps {
  match: any;
}

const Movie: React.SFC<MovieProps> = (props: MovieProps) => {
  // console.log(props.match.params.id);

  const [movie, updateMovie]: any = React.useState({});
  const [genreList, updateGenreList]: any = React.useState([]);

  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [rate, setRate] = React.useState(0);

  React.useEffect(() => {
    const movies = FakeMoviesList;
    const myMovie = movies.find(
      (m: any) => JSON.stringify(m.id) === props.match.params.id
    );

    // console.log(myMovie);
    updateMovie(myMovie);
    updateGenreList(fakeGenres);
  }, [updateGenreList, updateMovie]);

  React.useEffect(() => {
    // console.log(movie);
    setTitle(movie.title);
    setGenre(movie.genre);
    setStock(movie.stock);
    setRate(movie.rate);
  }, [setTitle, setGenre, setStock, setRate]);

  console.log(title, genre);
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <h1 className="text-center my-5 font-weight-bolder">Movie</h1>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="font-weight-bolder text-uppercase">
              Title
            </Form.Label>
            <Form.Control
              type="title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="Your Title"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="font-weight-bolder text-uppercase">
              Genre
            </Form.Label>
            <Form.Control
              as="select"
              value={genre}
              onChange={(e) => setGenre(e.currentTarget.value)}
            >
              {genreList.map((item: any) => (
                <option value={item.title} key={item.title}>
                  {item.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="font-weight-bolder text-uppercase">
              Stock
            </Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(JSON.parse(e.currentTarget.value))}
              placeholder=" Stocks ... "
            />
          </Form.Group>

          <Button variant="primary" className="my-3" type="submit">
            Edit The Changes
          </Button>
        </Form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Movie;
