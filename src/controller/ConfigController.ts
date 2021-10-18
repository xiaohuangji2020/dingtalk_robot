import { controller, inject, get, DarukContext } from 'daruk';
import { BaseController } from './BaseController';
import { ConfigService } from '@/service/ConfigService';

@controller()
export class ConfigController extends BaseController {

  @inject('ConfigService')
  private configService: ConfigService;

  @get('/config/list')
  public async index(ctx: DarukContext) {
    const config = this.configService.getConfig();
    ctx.body = this.ok(config);
  }
}
