export class AppointmentPrice {
  appID: number;
  price: number;

  constructor(appID: number, price: number) {
    this.appID = appID;
    this.price = price;
  }
}
