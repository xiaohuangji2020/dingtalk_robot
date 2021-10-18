import { service } from 'daruk';
import { ActionViewBean } from '@/bean/ActionViewBean';
import localCache from '@/config/LocalCache';

@service()
export class ActionViewService {

  public handleActionViewPush (obj) {
    if (!this.validate(obj)) {
      return;
    }
    // id
    const no = obj.no;
    // 项目
    const projectKey = obj.project_key;
    const projectName = localCache.actionViewProjectKeyToNameObj[obj.project_key];
    // 类型
    const type = obj.type;
    const typeName = localCache.actionViewTypeProjectKeyUnionIdToNameObj[obj.project_key + obj.type];
    // 指派人
    const assignee = obj.assignee;
    const assigneeDingtalkId = this.getDingtalkId(assignee.email);
    const assigneeName = assignee.name;
    // 报告人
    const reporter = obj.reporter;
    const reporterId = reporter.id;
    const reporterName = reporter.name;
    // 标题
    const title = obj.title;
    // 描述
    const descriptions = obj.descriptions;

    const item = new ActionViewBean({no, projectKey, projectName, type, typeName,
      assigneeDingtalkId, assigneeName, reporterId, reporterName, title, descriptions});
    return item;
  }

  private validate (obj) {
    if (!obj) return false;
    // 没开启这种类型的通知
    if (!localCache.actionViewTypeProjectKeyUnionIdToNameObj[obj.project_key + obj.type]) return false;
    if (!obj.type) return false;
    if (!obj.assignee) return false;
    if (!obj.reporter) return false;
    if (!obj.title) return false;
    if (!obj.descriptions) return false;

    return true;
  }

  private getDingtalkId (email) {
    const dingtalkId = localCache.userEmailToDingtalkObj[email] || '';
    return dingtalkId;
  }
}
