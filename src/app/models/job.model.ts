export class Job {
  public jobID: string;
  public jobname: string;

  constructor(jobID: string, jobname: string) {
    this.jobID = jobID;
    this.jobname = jobname;
  }
}
