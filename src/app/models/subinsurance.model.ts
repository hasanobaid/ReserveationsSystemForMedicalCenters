export class Subinsurance {
  public subinsuranceID: number;
  public insuranceID: number;
  public membership: string;
  public discount: number;

  constructor(subinsuranceID: number,
              insuranceID: number,
              discount: number,
              membership: string) {
    this.subinsuranceID = subinsuranceID;
    this.insuranceID = insuranceID;
    this.membership = membership;
    this.discount = discount;
  }

}
