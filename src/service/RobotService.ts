import { service, inject } from 'daruk';
import { dingtalkCache } from '@/config/LocalCache';
import { DingtalkService } from '@/service/DingtalkService';
import { UserService } from '@/service/UserService';
import { $http } from '@/plugins/ajax';
import localCache from '@/config/LocalCache';
import URL from '@/constant/URL';
import { Robot } from '@/entities/Robot';

@service()
// 发消息在这里
export class RobotService {

  @inject('DingtalkService')
  private dingtalkService: DingtalkService;

  @inject('UserService')
  private userService: UserService;
  
  public async sendMessageByWebhook (sessionWebhook: string, message: any) {
    try {
      await $http.post(sessionWebhook, message);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  public async sendMessage (message: any) {
    try {
      await $http.post('https://api.dingtalk.com/v1.0/robot/oToMessages/batchSend', message, {
        headers: {
          'x-acs-dingtalk-access-token': 'f77ff24c596e39f0b8585f957e94a655'
        }
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }

  public async getRobotInfo () {
    const appKey = localCache.robotObj.appKey;
    const appSecret = localCache.robotObj.appSecret;
    if (!appKey || !appSecret) {
      return {appKey, appSecret};
    }
    const token = await this.getAccessToken(appKey, appSecret);
    return {appKey, appSecret, token};
  }

  public async refreshAccessToken () :Promise<string> {
    const appKey = localCache.robotObj.appKey;
    const appSecret = localCache.robotObj.appSecret;
    if (!appKey || !appSecret) {
      return '';
    }
    const access_token = await this.getAccessTokenNoCache(appKey, appSecret);
    return access_token;

  }

  private async getAccessToken (appKey :string, appSecret :string) :Promise<string> {
    if (dingtalkCache.access_token && dingtalkCache.access_token_expire > Date.now() + 10000) {
      return dingtalkCache.access_token;
    }
    const access_token = await this.getAccessTokenNoCache(appKey, appSecret);
    return access_token;
  }

  private async getAccessTokenNoCache (appKey :string, appSecret :string) :Promise<string>{
    const res = await $http.post(URL.accessToken, {appKey, appSecret});
    dingtalkCache.access_token = res.data.accessToken;
    dingtalkCache.access_token_expire = res.data.expireIn * 1000 + Date.now();
    return dingtalkCache.access_token;
  }

  public async updateAppInfo (appKey :string, appSecret :string) {
    const robot = new Robot();
    robot.appKey = appKey;
    robot.appSecret = appSecret;
    robot.id = localCache.robotObj.id;
    const res = await Robot.save(robot);
    localCache.robotObj.appKey = appKey;
    localCache.robotObj.appSecret = appSecret;
    return res;
  }
}
