import { ResultBean } from '@/bean/ResultBean';

export abstract class BaseController {
  ok (data: any = {}, message = 'success') {
    return new ResultBean({data, message, code: 0});
  }
  
  error (data: any = {}, message = 'error', code = 1) {
    return new ResultBean({data, message, code});
  }

  error400 (data: any = {}, message = '参数错误', code = 400) {
    return new ResultBean({data, message, code});
  }
}
