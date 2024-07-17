import Genre from "./Genre";

export default interface Game {
  _id?: string;
  title: string;
  genre?: Genre;
  genreId?: string;
  gameId?: string;
  numberInStock: number | string;
  dailyRentalRate: number | string;
  __v?: number;
}
