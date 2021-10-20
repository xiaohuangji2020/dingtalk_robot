import { controller, get, DarukContext } from 'daruk';
import { BaseController } from './BaseController';

@controller()
export class DingtalkController extends BaseController {

  @get('/dingtalk/getPeople')
  public async index(ctx: DarukContext) {
    ctx.body = this.ok();
  }
}
