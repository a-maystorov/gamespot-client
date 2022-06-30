import Genre from './Genre';

export default interface Game {
  _id?: string;
  title: string;
  genre?: Genre;
  genreId?: string;
  numberInStock: number | string;
  dailyRentalRate: number | string;
}
