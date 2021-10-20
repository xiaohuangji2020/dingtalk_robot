import { controller, inject, get, DarukContext } from 'daruk';
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
    console.log(data);
    await ctx.render('robot', {title: '钉钉robot配置', data});
  }

}
