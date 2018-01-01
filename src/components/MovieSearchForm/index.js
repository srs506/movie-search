import * as React from 'react';
import './index.css';

const MovieSearchForm = ({
  onSubmit,
  onInputChange,
  voteAverage,
  releaseDateGte
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
          name="voteAverage"
          value={voteAverage}
          onChange={onInputChange}
        />

        <label htmlFor="releaseDateGte">Released After</label>

        <input
          type="number"
          name="releaseDateGte"
          value={releaseDateGte}
          onChange={onInputChange}
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
