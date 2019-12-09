export class Patient {
  public firstname: string;
  public secondname: string;
  public thirdname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public dateofbirth: Date;
  public phonenumber: string;
  public mobilenumber: string;
  public insuranceID: string;
  public subinsuranceID: string;
  public insurancenumber: number;
  public gender: string;
  public address: string;
  public cityID: string;
  public qID: string;
  public patientID: number;
  public fatherID: string;
  public motherID: string;
  public relation: string;

  constructor(firstname: string, secondname: string, thirdname: string, lastname: string, email: string, password: string,
              dateofbirth: Date, phonenumber: string, mobilenumber: string, insuranceID: string, subinsuranceID: string,
              insurancenumber: number, gender: string, address: string, cityID: string, qID: string,
              patientID: number, fatherID: string, motherID: string, relation: string) {
    this.firstname = firstname;
    this.secondname = secondname;
    this.thirdname = thirdname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.dateofbirth = dateofbirth;
    this.phonenumber = phonenumber;
    this.mobilenumber = mobilenumber;
    this.insuranceID = insuranceID;
    this.subinsuranceID = subinsuranceID;
    this.insurancenumber = insurancenumber;
    this.gender = gender;
    this.address = address;
    this.cityID = cityID;
    this.qID = qID;
    this.patientID = patientID;
    this.fatherID = fatherID;
    this.motherID = motherID;
    this.relation = relation;
  }

  getID() {
    return this.patientID;
  }
}
