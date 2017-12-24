import * as React from 'react';
import Table from '../Table';
import './index.css';

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
      posterSizes: null
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchConfiguration = this.fetchConfiguration.bind(this);
    this.setConfiguration = this.setConfiguration.bind(this);
    this.setMovieList = this.setMovieList.bind(this);
  }

  setMovieList(result) {
    this.setState({
      movieList: result
    });
  }

  setConfiguration(result) {
    console.log(result.images);
    const { secure_base_url, poster_sizes } = result.images;

    this.setState({
      imageBaseUrl: secure_base_url,
      posterSizes: poster_sizes
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

  render() {
    const { movieList, imageBaseUrl, posterSizes } = this.state;
    const list = (movieList && movieList.results) || [];

    return (
      <div className="container">
        <div className="main">
          <Table
            list={list}
            imageBaseUrl={imageBaseUrl}
            posterSize={(posterSizes && posterSizes[0]) || null}
          />
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
