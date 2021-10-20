import ejs from 'koa-ejs';
import { join } from 'path';
import { Daruk, defineMiddleware, MiddlewareClass } from 'daruk';

@defineMiddleware('koa-ejs')
export class KoaEjs implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    ejs(daruk.app, {
      root: join(daruk.options.rootPath, './views'),
      viewExt: 'ejs',
      cache: false,
    });
  }
}
