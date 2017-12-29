import * as React from 'react';
import './index.css';

const MovieSearchForm = ({
  onSubmit,
  voteAverage,
  onVoteAverageChange,
  releaseDateGte,
  onReleaseDateGteChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="voteAverageInput">Vote Average</label>

        <input
          type="number"
          min="0"
          max="10"
          step=".1"
          className="voteAverageSlider"
          value={voteAverage}
          onChange={onVoteAverageChange}
        />

        <label htmlFor="releaseDateGte">Released After</label>

        <input
          type="number"
          value={releaseDateGte}
          onChange={onReleaseDateGteChange}
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
