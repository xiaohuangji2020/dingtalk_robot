import { DarukServer } from 'daruk';
import '@/config/Connection';
import init from '@/config/Init';

(async () => {
  const myapp = DarukServer({
    rootPath: __dirname,
    middlewareOrder: ['koa-ejs'],
    loggerOptions: { level: 'error' }
  });
  await myapp.loadFile('./middleware');
  await myapp.loadFile('./controller');
  await myapp.loadFile('./service');
  await myapp.binding();
  
  myapp.listen(3001);

  init();
  
  console.log('--------------------------------------------------------------------');
  console.log('-----------------------------success--------------------------------');
  console.log('--------------------------------------------------------------------');
})();
