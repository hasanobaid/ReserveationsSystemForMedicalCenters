export declare enum ReadMode {
  arrayBuffer = 0,
  binaryString = 1,
  dataURL = 2,
  text = 3,
}
export interface ReadFile {
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  readMode: ReadMode;
  content: any;
  underlyingFile: File;
}
