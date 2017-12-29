import * as React from 'react';
import './index.css';

const MovieSearchForm = ({ voteAverage, onSubmit, onVoteAverageChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="voteAverageInput">Vote Average</label>

        <input
          type="number"
          min="0"
          max="10"
          className="voteAverageSlider"
          value={voteAverage}
          onChange={onVoteAverageChange}
        />

        <div>
          <input
            className="button-primary"
            type="submit"
            value="Search!"
            id="voteAverageInput"
          />
        </div>
      </fieldset>
    </form>
  );
};

export default MovieSearchForm;
