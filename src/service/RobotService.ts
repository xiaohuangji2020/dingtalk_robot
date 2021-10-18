import { service, inject } from 'daruk';
import { MessageService } from '@/service/MessageService';
import { DingtalkService } from '@/service/DingtalkService';
import { UserService } from '@/service/UserService';
import { $http } from '@/plugins/ajax';

@service()
export class RobotService {

  @inject('MessageService')
  private messageService: MessageService;

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
}
