import { service } from 'daruk';
import localCache from '@/config/LocalCache';

@service()
export class ConfigService {

  public getConfig () {
    const config = {
      role: localCache.roleObj,
      user: localCache.userObj,
    };
    return config;
  }
}
