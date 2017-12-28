import * as React from 'react';
import './index.css';

const MovieSearchForm = ({ voteAverage, onSubmit, onVoteAverageChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="voteAverageInput">Vote Average</label>

        <span>0</span>
        <input
          type="range"
          min="0"
          max="10"
          step=".1"
          className="voteAverageSlider"
          value={voteAverage}
          onChange={onVoteAverageChange}
        />
        <span>{voteAverage}</span>

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
