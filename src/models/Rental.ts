export default interface Rental {
  customerId: string;
  gameId: string;
  dateOut: Date;
  dateReturned: Date;
  rentalFee: number;
}
