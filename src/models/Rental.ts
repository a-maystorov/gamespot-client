import Customer from './Customer';
import Game from './Game';

export default interface Rental {
  _id: string;
  customer: Customer;
  game: Game;
  dateOut: Date;
  dateReturned?: Date;
  rentalFee?: number;
}
