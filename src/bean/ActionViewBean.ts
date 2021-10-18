export class ActionViewBean {
  no: number;
  projectKey: string;
  projectName: string;
  type: string;
  typeName: string;
  assigneeDingtalkId: string;
  assigneeName: string;
  reporterId: string;
  reporterName: string;
  title: string;
  descriptions: string;

  constructor({no, projectKey, projectName, type, typeName,
    assigneeDingtalkId, assigneeName, reporterId, reporterName, title, descriptions}) {
    this.no = no;
    this.projectKey = projectKey;
    this.projectName = projectName;
    this.type = type;
    this.typeName = typeName;
    this.assigneeDingtalkId = assigneeDingtalkId;
    this.assigneeName = assigneeName;
    this.reporterId = reporterId;
    this.reporterName = reporterName;
    this.title = title;
    this.descriptions = descriptions;
  }
}
