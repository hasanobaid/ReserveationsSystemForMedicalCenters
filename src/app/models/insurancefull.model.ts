export class Insurancefull {
  public insuranceID: number;
  public insurancecompany: string;
  public subinsuranceID: number;
  public membership: string;
  public discount: number;
  public updatedate: Date;

  constructor(
    insuranceID: number,
    insurancecompany: string,
    subinsuranceID: number,
    discount: number,
    membership: string,
    updatedate: Date) {
    this.subinsuranceID = subinsuranceID;
    this.insuranceID = insuranceID;
    this.membership = membership;
    this.discount = discount;
    this.insurancecompany = insurancecompany;
    this.updatedate = updatedate;
  }

}
