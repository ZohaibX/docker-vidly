import React from "react";

export interface LikeProps {
  movie: any;
  movies: any;
  updateMovies: any;
}

const Like: React.SFC<LikeProps> = (props: LikeProps) => {
  const { movies, movie, updateMovies }: any = props;

  const likeMovie = () => {
    const index = movies.indexOf(movie);
    if (!movies[index].liked) {
      movies[index].liked = true;
    } else {
      movies[index].liked = false;
    }
    updateMovies(movies);
  };

  return (
    <i
      className={!movie.liked ? "fa fa-heart-o" : "fa fa-heart"}
      onClick={() => likeMovie()}
    ></i>
  );
};

export default Like;
