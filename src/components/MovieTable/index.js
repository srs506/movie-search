import * as React from 'react';
import './index.css';

class MovieTable extends React.Component {
  render() {
    const { list, imageBaseUrl, posterSize } = this.props;

    return (
      list && (
        <table>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img
                    src={`${imageBaseUrl}${posterSize}${item.poster_path}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

export default MovieTable;
