import { controller, post, inject, DarukContext } from 'daruk';
import { BaseController } from './BaseController';
import { RobotService } from '@/service/RobotService';
import { ActionViewService } from '@/service/ActionViewService';
import { MessageHandlerService } from '@/service/MessageHandlerService';

@controller()
export class RobotController extends BaseController {

  @inject('ActionViewService')
  private actionViewService: ActionViewService;

  @inject('MessageHandlerService')
  private messageHandlerService: MessageHandlerService;

  @inject('RobotService')
  private robotService: RobotService;

  @post('/actionview/push')
  public async actionViewPush(ctx: DarukContext) {
    console.log('message', ctx.request.body);
    const actionViewItem = this.actionViewService.handleActionViewPush(ctx.request.body);
    if (!actionViewItem) {
      ctx.body = this.error();
      return;
    }
    const message = this.messageHandlerService.handleActionViewNotice(actionViewItem);
    console.log(JSON.stringify(message));
    this.robotService.sendMessage(message);
    ctx.body = `done ${Date.now()}`;
  }
}
