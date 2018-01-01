import React from 'react';
import './index.css';
import MovieTableRow from './MovieTableRow';

const MovieTable = ({ movies }) => {
  if (movies.length === 0) {
    return <table>No results :(</table>;
  }

  return (
    <table>
      <tbody>
        {movies.map(function(movie) {
          return <MovieTableRow movie={movie} key={movie.id} />;
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
