import { controller, get, DarukContext } from 'daruk';
import { BaseController } from './BaseController';

@controller()
export class WorkbenchController extends BaseController {

  @get('/workbench')
  public async index(ctx: DarukContext) {
    await ctx.render('index', {
      title: 'actionview to 钉钉提醒机器人 配置'
    });
  }
}
