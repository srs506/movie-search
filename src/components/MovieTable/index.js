import * as React from 'react';
import './index.css';
import MovieTableRow from './MovieTableRow';

const MovieTable = ({ movies }) => {
  return (
    movies && (
      <table>
        <tbody>
          {movies.map(function(movie) {
            return <MovieTableRow movie={movie} key={movie.id} />;
          })}
        </tbody>
      </table>
    )
  );
};

export default MovieTable;
