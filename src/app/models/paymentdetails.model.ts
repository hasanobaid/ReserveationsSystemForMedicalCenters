export class Paymentdetails {
  public patientID: string;
  public empID: string;
  public amount: string;
  public senddate: string;
  public paymenttype: string;
  public paymnetID: string;

  constructor(patientID: string, empID: string, amount: string, senddate: string, paymenttype: string, paymnetID: string) {
    this.patientID = patientID;
    this.empID = empID;
    this.amount = amount;
    this.senddate = senddate;
    this.paymenttype = paymenttype;
    this.paymnetID = paymnetID;
  }
}
