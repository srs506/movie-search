import * as React from 'react';
import MovieTable from '../MovieTable';
import './index.css';
import TMDBLogo from '../../images/powered-by-rectangle-blue.svg';

const PATH_BASE = `https://api.themoviedb.org/3`;
const PATH_DISCOVER = '/discover';
const PATH_MOVIE = '/movie';
const PATH_CONFIGURATION = '/configuration';
const PARAM_API = 'api_key=';
const API_KEY = '1835ac896829a73f680b0d9f6094d57a';
const PARAM_VOTE_AVG_GTE = 'vote_average.gte=';
const DEFAULT_VOTE_AVG_GTE = '6.0';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: null,
      voteAverageGte: DEFAULT_VOTE_AVG_GTE,
      imageBaseUrl: null,
      posterSize: null
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchConfiguration = this.fetchConfiguration.bind(this);
    this.setConfiguration = this.setConfiguration.bind(this);
    this.setMovieList = this.setMovieList.bind(this);
    this.handleVoteAverageGteSliderChange = this.handleVoteAverageGteSliderChange.bind(
      this
    );
    this.onMovieSearchSubmit = this.onMovieSearchSubmit.bind(this);
  }

  setMovieList(result) {
    this.setState({
      movieList: result
    });
  }

  setConfiguration(result) {
    const { secure_base_url, poster_sizes } = result.images;

    this.setState({
      imageBaseUrl: secure_base_url,
      posterSize: (poster_sizes && poster_sizes[1]) || null
    });
  }

  fetchMovies(voteAverage, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?${PARAM_API}${API_KEY}&${PARAM_VOTE_AVG_GTE}${voteAverage}`
    )
      .then(response => response.json())
      .then(result => this.setMovieList(result))
      .catch(e => e);
  }

  fetchConfiguration() {
    fetch(`${PATH_BASE}${PATH_CONFIGURATION}?${PARAM_API}${API_KEY}`)
      .then(response => response.json())
      .then(result => this.setConfiguration(result))
      .catch(e => e);
  }

  handleVoteAverageGteSliderChange(event) {
    this.setState({
      voteAverageGte: event.target.value
    });
    event.preventDefault();
  }

  onMovieSearchSubmit(event) {
    this.fetchMovies(this.state.voteAverageGte);
    event.preventDefault();
  }

  render() {
    const { movieList, imageBaseUrl, posterSize, voteAverageGte } = this.state;
    const list = (movieList && movieList.results) || [];

    return (
      <div className="container">
        <div className="main">
          <form onSubmit={this.onMovieSearchSubmit}>
            <fieldset>
              <label htmlFor="voteAverageInput">Vote Average</label>
              <input
                type="number"
                min="0"
                max="10"
                step=".1"
                value={voteAverageGte}
                onChange={this.handleVoteAverageGteSliderChange}
              />
              <input
                className="button-primary"
                type="submit"
                value="Submit"
                id="voteAverageInput"
              />
            </fieldset>
          </form>

          <MovieTable
            list={list}
            imageBaseUrl={imageBaseUrl}
            posterSize={posterSize}
          />
        </div>
        <div className="footer">
          <img src={TMDBLogo} height="60px;" alt="Powered by The Movie DB" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { voteAverageGte } = this.state;
    this.setState({ voteAverage: voteAverageGte });

    this.fetchConfiguration();
    this.fetchMovies(voteAverageGte);
  }
}

export default App;
