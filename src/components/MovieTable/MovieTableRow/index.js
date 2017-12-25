import * as React from 'react';
import { Star } from 'react-feather';

const MovieTableRow = ({ movie }) => {
  return (
    <tr>
      <td>
        <img
          src={`${movie.basePosterPath}${movie.poster_path}`}
          alt={`Poster for '${movie.title}'`}
          width="92px;"
          className="posterImage"
        />
      </td>
      <td>{movie.title}</td>
      <td>
        <div className="voteAverage">
          <Star className="voteAverageIcon" />
          {movie.vote_average}
        </div>
      </td>
      <td>{new Date(movie.release_date).getFullYear()}</td>
    </tr>
  );
};

export default MovieTableRow;
