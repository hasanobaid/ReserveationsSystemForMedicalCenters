export class Employee {
  public firstname: string;
  public secondname: string;
  public thirdname: string;
  public lastname: string;
  public jobID: string;
  public sID: string;
  public dateofbirth: Date;
  public gender: string;
  public emergencynumber: string;
  public phonenumber: string;
  public mobilenumber: string;
  public address: string;
  public email: string;
  public username: string;
  public empID: string;
  public password: string;
  public cityID: string;
  public qID: string;

  constructor(firstname: string,
              secondname: string,
              thirdname: string,
              lastname: string,
              cityID: string,
              qID: string,
              jobID: string,
              sID: string,
              dateofbirth: Date,
              email: string,
              phonenumber: string,
              mobilenumber: string,
              address: string,
              gender: string,
              emergencynumber: string,
              username: string,
              empID: string,
              password: string) {
    this.firstname = firstname;
    this.secondname = secondname;
    this.thirdname = thirdname;
    this.lastname = lastname;
    this.cityID = cityID;
    this.qID = qID;
    this.jobID = jobID;
    this.sID = sID;
    this.dateofbirth = dateofbirth;
    this.email = email;
    this.phonenumber = phonenumber;
    this.mobilenumber = mobilenumber;
    this.address = address;
    this.gender = gender;
    this.emergencynumber = emergencynumber;
    this.username = username;
    this.empID = empID;
    this.password = password;

  }


}
