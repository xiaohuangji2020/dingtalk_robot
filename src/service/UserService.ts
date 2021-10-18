import { service } from 'daruk';
import { User } from '@/entities/User';
import localCache from '@/config/LocalCache';

@service()
export class UserService {

  public async getAllUser() {
    const options = { cache: true };
    const users: User[] = await User.find(options);
    localCache.userObj = {};
    users.forEach(user => {
      localCache.userObj[user.userId] = user.userName;
    });
    return users;
  }

  public async updateUsers(users: User[]) {
    const existUsers =  await User.find();
    const existUserMap = new Map<string, User>();
    existUsers.forEach(existUsers => {
      existUserMap.set(existUsers.dingtalkId, existUsers);
    });

    const usersNeedUpdate: User[] = [];
    users.forEach(user => {
      const existUser = existUserMap.get(user.dingtalkId);
      if (!existUser) {
        usersNeedUpdate.push(user);
        return;
      }
      if (user.userName === existUser.userName) {
        return;
      }
      user.userId = existUser.userId;
      user.userName = existUser.userName;
      usersNeedUpdate.push(user);
    });
    const res = await User.save(usersNeedUpdate);
    return res;
  }
}
