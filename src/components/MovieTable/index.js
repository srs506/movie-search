import * as React from 'react';
import './index.css';
import { Star } from 'react-feather';

class MovieTable extends React.Component {
  render() {
    const { list, imageBaseUrl, posterSize } = this.props;
    let releaseYear = null;

    return (
      list && (
        <table>
          <tbody>
            {list.map(function(item) {
              releaseYear = new Date(item.release_date).getFullYear();

              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={`${imageBaseUrl}${posterSize}${item.poster_path}`}
                      alt={`Poster for '${item.title}'`}
                      width="92px;"
                      className="posterImage"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="voteAverage">
                      <Star className="voteAverageIcon" />
                      {item.vote_average}
                    </div>
                  </td>
                  <td>{releaseYear}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
    );
  }
}

export default MovieTable;
