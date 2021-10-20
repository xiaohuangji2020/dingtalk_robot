import { service, inject } from 'daruk';
import { dingtalkCache } from '@/config/LocalCache';
import { DingtalkService } from '@/service/DingtalkService';
import { UserService } from '@/service/UserService';
import { $http } from '@/plugins/ajax';

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
    const appKey = 'dingezxtkqhm27mquovp';
    const appSecret = 'wSDpWBg5HoXbbIcUcaFOK6G2iBugnHoTT4NmabEOuReJ0DlfTetZRRDF8MvOZieD';
    const token = await this.getAccessToken();
    return {appKey, appSecret, token};
  }

  private async getAccessToken () :Promise<string> {
    if (dingtalkCache.access_token && dingtalkCache.access_token_expire > Date.now() + 10000) {
      return dingtalkCache.access_token;
    }
    console.log('--------------------------get access_token--------------------------');
    const res = await $http.post('https://api.dingtalk.com/v1.0/oauth2/accessToken', {
      'appKey' : 'dingezxtkqhm27mquovp',
      'appSecret' : 'wSDpWBg5HoXbbIcUcaFOK6G2iBugnHoTT4NmabEOuReJ0DlfTetZRRDF8MvOZieD'
    });
    dingtalkCache.access_token = res.data.accessToken;
    dingtalkCache.access_token_expire = res.data.expireIn * 1000 + Date.now();
    return dingtalkCache.access_token;
  }
}
