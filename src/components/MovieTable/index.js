import * as React from 'react';
import './index.css';

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
                  <td>{item.vote_average}</td>
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
