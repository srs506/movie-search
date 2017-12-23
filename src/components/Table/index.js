import * as React from 'react';
import './index.css';

class Table extends React.Component {
  render() {
    const { list } = this.props;

    return (
      list && (
        <table>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

export default Table;
