import * as genresAPI from './fakeGenreService';

const games = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    title: 'World of Warcraft',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'MMORPG' },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: '2018-01-03T19:04:28.809Z',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    title: 'Final Fantasy XIV',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'MMORPG' },
    numberInStock: 5,
    dailyRentalRate: 2.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    title: 'DOOM 2016',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'FPS' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    title: 'DOOM Eternal',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'FPS' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    title: 'The Witcher I',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'RPG' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    title: 'The Witcher II',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'RPG' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    title: 'The Witcher III',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'RPG' },
    numberInStock: 7,
    dailyRentalRate: 4.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    title: 'Bulletstorm',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'FPS' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    title: 'Final Fantasy XV',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'RPG' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
];

export function getGames() {
  return games;
}

export function getGame(id) {
  return games.find((g) => g._id === id);
}

export function saveGame(game) {
  let gameInDb = games.find((g) => g._id === game._id) || {};
  gameInDb.name = game.name;
  gameInDb.genre = genresAPI.genres.find((genre) => genre._id === game.genreId);
  gameInDb.numberInStock = game.numberInStock;
  gameInDb.dailyRentalRate = game.dailyRentalRate;

  if (!gameInDb._id) {
    gameInDb._id = Date.now();
    games.push(gameInDb);
  }

  return gameInDb;
}

export function deleteGame(id) {
  let gameInDb = games.find((g) => g._id === id);
  games.splice(games.indexOf(gameInDb), 1);
  return gameInDb;
}
