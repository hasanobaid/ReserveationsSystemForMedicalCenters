export class InsurancePrice {
  public price: number;
  public clinicID: number;
  public insuranceID: number;
  public subinsuranceID: number;

  constructor(price: number,
              clinicID: number,
              insuranceID: number,
              subinsuranceID: number) {
    this.price = price;
    this.clinicID = clinicID;
    this.insuranceID= insuranceID;
    this.subinsuranceID = subinsuranceID ;

  }

}
