export class ResultBean {
  code: number;
  message: string;
  data: any;

  constructor({data, message, code}) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
