import * as React from 'react';
import TMDBLogo from './tmdbLogo.png';

const Footer = props => {
  return (
    <div className="footer">
      <img src={TMDBLogo} height="60px;" alt="Powered by The Movie DB" />
    </div>
  );
};

export default Footer;
