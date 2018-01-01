import * as React from 'react';
import MovieTable from '../MovieTable';
import MovieSearchForm from '../MovieSearchForm';
import Footer from '../Footer';
import './index.css';
import * as Moment from 'moment';

const now = Moment();

// Api setup
const PATH_BASE = `https://api.themoviedb.org/3`;
const PATH_DISCOVER = '/discover';
const PATH_MOVIE = '/movie';
const PATH_CONFIGURATION = '/configuration';
const PARAM_API = 'api_key=';
const API_KEY = '1835ac896829a73f680b0d9f6094d57a';

// API parameters
const PARAM_VOTE_AVG_GTE = 'vote_average.gte=';
const DEFAULT_VOTE_AVG_GTE = '6.0';
const PARAM_RELEASE_DATE_LTE = 'primary_release_date.lte=';
const DEFAULT_RELEASE_DATE_LTE = now.format('YYYY');
const PARAM_RELEASE_DATE_GTE = 'primary_release_date.gte=';
const DEFAULT_RELEASE_DATE_GTE = now.subtract(10, 'years').format('YYYY');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      movieList: null,
      voteAverage: DEFAULT_VOTE_AVG_GTE,
      imageBaseUrl: null,
      posterSize: null,
      releaseDateGte: DEFAULT_RELEASE_DATE_GTE,
      releaseDateLte: DEFAULT_RELEASE_DATE_LTE
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchConfiguration = this.fetchConfiguration.bind(this);

    this.setConfiguration = this.setConfiguration.bind(this);
    this.setMovieList = this.setMovieList.bind(this);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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

  fetchMovies(voteAverage, releaseDateGte, releaseDateLte, page = 0) {
    return fetch(
      `${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?${PARAM_API}${API_KEY}&${PARAM_VOTE_AVG_GTE}${voteAverage}&${PARAM_RELEASE_DATE_GTE}${releaseDateGte}&${PARAM_RELEASE_DATE_LTE}${releaseDateLte}`
    )
      .then(response => response.json())
      .then(result => this.setMovieList(result))
      .catch(e => e);
  }

  fetchConfiguration() {
    return fetch(`${PATH_BASE}${PATH_CONFIGURATION}?${PARAM_API}${API_KEY}`)
      .then(response => response.json())
      .then(result => this.setConfiguration(result))
      .catch(e => e);
  }

  onSearchSubmit(event) {
    const { voteAverage, releaseDateGte, releaseDateLte } = this.state;

    this.fetchMovies(voteAverage, releaseDateGte, releaseDateLte);
    event.preventDefault();
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  onReleaseDateGteChange(event) {
    const { value } = event.target;

    this.setState({
      releaseDateGte: value
    });
  }

  render() {
    const {
      movieList,
      voteAverage,
      releaseDateGte,
      releaseDateLte
    } = this.state;
    const movies = movieList || [];

    return (
      <div className="container">
        <div className="main">
          <MovieSearchForm
            onSubmit={this.onSearchSubmit}
            onInputChange={this.onInputChange}
            voteAverage={voteAverage}
            releaseDateGte={releaseDateGte}
            releaseDateLte={releaseDateLte}
          />

          <MovieTable movies={movies} />

          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { voteAverage, releaseDateGte, releaseDateLte } = this.state;
    this.setState({ voteAverage, releaseDateGte, releaseDateLte });

    this.fetchConfiguration().then(() => {
      this.fetchMovies(voteAverage, releaseDateGte, releaseDateLte);
    });
  }
}

export default App;
