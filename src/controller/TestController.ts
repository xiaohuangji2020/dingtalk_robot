import { controller, all, DarukContext } from 'daruk';
import { BaseController } from './BaseController';

@controller()
export class TestController extends BaseController {

  @all('/test')
  public async index(ctx: DarukContext) {
    console.log('ctx', ctx);
    ctx.body = `done ${Date.now()}`;
  }
}
