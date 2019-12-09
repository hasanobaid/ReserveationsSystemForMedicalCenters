export class Vacation {
  public clinicID: number;
  public empID: number;
  public vdate: Date;
  public start: string;
  public end: string;
  public note: string;

  constructor(clinicID: number,
              empID: number,
              vdate: Date,
              start: string,
              end: string,
              note: string) {

    this.clinicID = clinicID;
    this.empID = empID;
    this.vdate = vdate;
    this.start = start;
    this.end = end;
    this.note = note;

  }

}
