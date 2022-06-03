import Genre from './Genre';

export default interface Game {
  _id: number;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
}
