export class Payment {
  public patientID: string;
  public balance: number;
  public lastpaymentdate: string;
  public lastpaydate: string;
  public empID: string;
  public amount: string;
  public senddate: string;
  public paymenttype: string;

  constructor(patientID: string, balance: number, lastpaymentdate: string,
              lastpaydate: string, empID: string, amount: string, senddate: string, paymenttype: string) {
    this.patientID = patientID;
    this.balance = balance;
    this.lastpaymentdate = lastpaymentdate;
    this.lastpaydate = lastpaydate;
    this.empID = empID;
    this.amount = amount;
    this.senddate = senddate;
    this.paymenttype = paymenttype;
  }
}
