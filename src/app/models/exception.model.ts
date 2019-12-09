import {Time} from '@angular/common';

export class Exception {
  public clinicID: number;
  public empID: number;
  public edate: Date;
  public start: string;
  public end: string;
  public note: string;
  public status: boolean;

  constructor(clinicID: number,
              empID: number,
              edate: Date,
              start: string,
              end: string,
              note: string,
              status: boolean) {
    this.clinicID = clinicID;
    this.empID = empID;
    this.edate = edate;
    this.start = start;
    this.end = end;
    this.note = note;
    this.status = status;

  }

}
