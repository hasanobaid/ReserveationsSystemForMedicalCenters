export class Appointment {
  public appID: number;
  public clinicID: number;
  public empID: number;
  public patientID: number;
  public checkin: number;
  public adate: string;
  public slottime: string;
  public rempID: number;


  constructor(appID: number, clinicID: number, empID: number, patientID: number, checkin: number, adate: string, slottime: string) {
    this.appID = appID;
    this.clinicID = clinicID;
    this.empID = empID;
    this.patientID = patientID;
    this.checkin = checkin;
    this.adate = adate;
    this.slottime = slottime;
  }
}
