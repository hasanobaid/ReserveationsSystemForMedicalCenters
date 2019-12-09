export class Patientpayment {
  public patientID: string;
  public balance: number;
  public lastpaymentdate: string;
  public lastpaydate: string;

  constructor(patientID: string, balance: number, lastpaymentdate: string, lastpaydate: string) {
    this.patientID = patientID;
    this.balance = balance;
    this.lastpaymentdate = lastpaymentdate;
    this.lastpaydate = lastpaydate;
  }
}
