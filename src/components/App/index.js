import * as React from 'react';
import MovieTable from '../MovieTable';
import MovieSearchForm from '../MovieSearchForm';
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
      voteAverage: DEFAULT_VOTE_AVG_GTE,
      imageBaseUrl: null,
      posterSize: null
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchConfiguration = this.fetchConfiguration.bind(this);
    this.setConfiguration = this.setConfiguration.bind(this);
    this.setMovieList = this.setMovieList.bind(this);
    this.onVoteAverageChange = this.onVoteAverageChange.bind(this);
    this.onMovieSearchSubmit = this.onMovieSearchSubmit.bind(this);
  }

  setMovieList(result) {
    const { imageBaseUrl, posterSize } = this.state;

    const movies = result.results;

    // Add the basePosterPath property to each movie so we don't
    // have to pass extra props to our table
    movies.forEach(element => {
      element.basePosterPath = `${imageBaseUrl}${posterSize}`;
    });

    this.setState({
      movieList: movies
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

  onVoteAverageChange(event) {
    const { value } = event.target;

    let fixedValue = value;

    if (value > 10) {
      fixedValue = 10;
    }
    if (value < 0) {
      fixedValue = 0;
    }

    this.setState({
      voteAverage: fixedValue
    });
  }

  onMovieSearchSubmit(event) {
    this.fetchMovies(this.state.voteAverage);
    event.preventDefault();
  }

  render() {
    const { movieList, voteAverage } = this.state;
    const movies = movieList || [];

    return (
      <div className="container">
        <div className="main">
          <MovieSearchForm
            voteAverage={voteAverage}
            onSubmit={this.onMovieSearchSubmit}
            onVoteAverageChange={this.onVoteAverageChange}
          />

          <MovieTable movies={movies} />
        </div>
        <div className="footer">
          <img src={TMDBLogo} height="60px;" alt="Powered by The Movie DB" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { voteAverage } = this.state;
    this.setState({ voteAverage: voteAverage });

    this.fetchConfiguration();
    this.fetchMovies(voteAverage);
  }
}

export default App;
