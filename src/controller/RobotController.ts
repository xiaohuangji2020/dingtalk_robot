import { controller, post, inject, DarukContext } from 'daruk';
import { BaseController } from './BaseController';
import { RobotService } from '@/service/RobotService';

@controller()
export class RobotController extends BaseController {

  @inject('RobotService')
  private robotService: RobotService;

  @post('/robot/message')
  public async message(ctx: DarukContext) {
    // console.log('message', ctx.request.body);
    ctx.body = `done ${Date.now()}`;
  }
}
