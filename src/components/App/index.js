import * as React from 'react';
import Table from '../Table';
import './index.css';

const PATH_BASE = `https://api.themoviedb.org/3`;
const PATH_DISCOVER = '/discover';
const PATH_MOVIE = '/movie';
const PARAM_API = 'api_key=';
const API_KEY = '1835ac896829a73f680b0d9f6094d57a';
const PARAM_VOTE_AVG_GTE = 'vote_average.gte=';
const DEFAULT_VOTE_AVG_GTE = '6.0';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      voteAverageGte: DEFAULT_VOTE_AVG_GTE
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.setMovieList = this.setMovieList.bind(this);
  }

  setMovieList(result) {
    this.setState({
      result: result
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

  render() {
    const { result } = this.state;
    const list = (result && result.results) || [];

    console.log(list);

    return (
      <div className="container">
        <div className="main">
          <Table list={list} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { voteAverageGte } = this.state;
    this.setState({ voteAverage: voteAverageGte });
    this.fetchMovies(voteAverageGte);
  }
}

export default App;
