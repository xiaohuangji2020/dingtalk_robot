import { service } from 'daruk';
import { $http } from '@/plugins/ajax';
import { dingtalkCache } from '@/config/LocalCache';
import { User } from '@/entities/User';

@service()
export class DingtalkService {
  public async getDepartmentUserList (dept_id = 1) {
    // const access_token = await this.getAccessToken();
    const access_token = '3f26a236278838b5b5fafb275fcd5648';
    const params = { access_token, dept_id, cursor: 0, size: 100 };
    const list = [];
    do {
      const { data } = await this.doGetDepartmentUserList(params);
      if (data.errcode === 0) {
        list.push(...(data.result?.list || []));
        if (data.result.has_more) {
          params.cursor = 100;
        } else {
          break;
        }
      }
    } while (true);
    return this.formatDingtalkUsersToUsers(list);
  }

  public async getDepartmentUserListPage (dept_id = 1, cursor = 0, size = 100) {
    const access_token = await this.getAccessToken();
    const params = { access_token, dept_id, cursor, size };
    const { data } = await this.doGetDepartmentUserList(params);
    const list = [];
    if (data.errcode === 0) {
      list.push(...(data.result?.list || []));
    }
    return this.formatDingtalkUsersToUsers(list);
  }

  private doGetDepartmentUserList (params) {
    return $http('https://oapi.dingtalk.com/topapi/user/listsimple', { method: 'post', params });
  }

  private formatDingtalkUsersToUsers (list) {
    const users: User[] = [];
    list.forEach(dingtalkUser => {
      const user = new User();
      user.dingtalkId = dingtalkUser.userid;
      user.userName = dingtalkUser.name;
      users.push(user);
    });
    return users;
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
