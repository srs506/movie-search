import React from 'react';
import ReactDOM from 'react-dom';
import MovieTableRow from './index';
import renderer from 'react-test-renderer';

const movie = {
  vote_count: 4804,
  id: 346364,
  video: false,
  vote_average: 7.2,
  title: 'It',
  popularity: 851.149606,
  poster_path: '/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
  original_language: 'en',
  original_title: 'It',
  genre_ids: [18, 14, 27, 53],
  backdrop_path: '/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg',
  adult: false,
  overview:
    'In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.',
  release_date: '2017-09-05',
  basePosterPath: 'https://image.tmdb.org/t/p/w154'
};

it('renders without crashing', () => {
  const tableBody = document.createElement('tbody');
  ReactDOM.render(<MovieTableRow movie={movie} />, tableBody);
});
