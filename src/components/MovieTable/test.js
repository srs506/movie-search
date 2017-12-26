import React from 'react';
import ReactDOM from 'react-dom';
import MovieTable from './index';
import renderer from 'react-test-renderer';

const movies = [
  {
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
  },
  {
    vote_count: 1630,
    id: 181808,
    video: false,
    vote_average: 7.4,
    title: 'Star Wars: The Last Jedi',
    popularity: 765.561888,
    poster_path: '/xGWVjewoXnJhvxKW619cMzppJDQ.jpg',
    original_language: 'en',
    original_title: 'Star Wars: The Last Jedi',
    genre_ids: [28, 12, 14, 878],
    backdrop_path: '/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg',
    adult: false,
    overview:
      'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    release_date: '2017-12-13',
    basePosterPath: 'https://image.tmdb.org/t/p/w154'
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieTable movies={movies} />, div);
});
