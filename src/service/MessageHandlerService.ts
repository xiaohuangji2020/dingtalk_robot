import { ActionViewBean } from '@/bean/ActionViewBean';
import { service } from 'daruk';

const actionViewUrlPrefix = 'http://actionview.wulianshuntong.com/project/feng/issue?no=';
const robotCode = 'dingezxtkqhm27mquovp';

@service()
// 只负责处理和生成消息，不负责发消息，发消息在robotservice中
export class MessageHandlerService {

  public getHelloMessage () {
    return this.getTextMessage('人工智障在此，作者：圆企鹅');
  }

  public handleActionViewNotice (actionViewItem: ActionViewBean) {
    const content = this.getActionViewNoticeMessageContent(actionViewItem);
    const message = this.getOfficialMarkdownMsg(actionViewItem.assigneeDingtalkId, content, '[ActionView提醒]');
    return message;
  }

  public getActionViewNoticeMessageContent (item: ActionViewBean) {
    let messageContent = '';
    messageContent += `### ActionView Notice (ID: ${item.no})\n\n`;
    messageContent += `类&emsp;型：${item.projectName}-${item.typeName}\n\n`;
    messageContent += `负责人：${item.assigneeName}\n\n`;
    messageContent += `报告人：${item.reporterName}\n\n`;
    messageContent += `标&emsp;题：${item.title}\n\n`;
    messageContent += `描&emsp;述：${item.descriptions}\n\n`;
    messageContent += '&nbsp;\n\n';
    messageContent += `[查看详情](${actionViewUrlPrefix + item.no})\n\n`;
    return messageContent;
  }

  private getTextMessage (content: string) {
    return {
      msgtype: 'text',
      text: { content }
    };
  }

  private getMarkdownMessage (text: string, title: string) {
    return {
      msgtype: 'markdown',
      markdown: { title, text }
    };
  }

  private getActionCardMessageBtn (title: string, actionURL: string) {
    return { title, actionURL };
  }

  private getActionCardMessage (text: string, title: string, btns: Record<string, string>[]) {
    return {
      msgtype: 'actionCard',
      actionCard: {
        title,
        text,
        btnOrientation: '1',
        btns
      },
    };
  }

  public getOfficialActionCardMsg (userId: string, text: string, title: string, singleTitle: string, singleURL: string) {
    const msgParam = {
      title,
      text,
      singleTitle,
      singleURL
    };
    return {
      robotCode,
      userIds: [userId],
      msgKey : 'officialActionCardMsg1',
      msgParam: JSON.stringify(msgParam)
    };
  }

  public getOfficialMarkdownMsg (userId: string, text: string, title: string) {
    const msgParam = {
      title,
      text
    };
    return {
      robotCode,
      userIds: [userId],
      msgKey : 'officialMarkdownMsg',
      msgParam: JSON.stringify(msgParam)
    };
  }

}
