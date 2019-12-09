export class Quantom {
  public qname: string;
  public qID: number;
  public cityID: number;


  constructor(qname: string,
              qID: number,
              cityID: number) {
    this.qID = qID;
    this.qname = qname;
    this.cityID = cityID;
  }
}
