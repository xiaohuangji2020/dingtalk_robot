import { controller, inject, get, DarukContext, post } from 'daruk';
import { BaseController } from './BaseController';
import { RobotService } from '@/service/RobotService';

@controller()
export class WorkbenchController extends BaseController {

  @inject('RobotService')
  private robotService: RobotService;
  
  @get('/workbench')
  public async index(ctx: DarukContext) {
    await ctx.render('index', {title: 'actionview提醒配置'});
  }


  @get('/workbench/robot')
  public async robot(ctx: DarukContext) {
    const data = await this.robotService.getRobotInfo();
    await ctx.render('robot', {title: '钉钉robot配置', data});
  }

  @post('/workbench/robot/save/appInfo')
  public async robotSaveAppInfo(ctx: DarukContext) {
    const appInfo = ctx.request.body;
    await this.robotService.updateAppInfo(appInfo.appKey, appInfo.appSecret);
    ctx.body = this.ok();
  }

  @post('/workbench/robot/refresh/token')
  public async refreshToken(ctx: DarukContext) {
    const token = await this.robotService.refreshAccessToken();
    if (!token) {
      ctx.body = this.error(undefined, '请先配置appKey和appSecret');
    } else {
      ctx.body = this.ok(token);
    }
  }

}
