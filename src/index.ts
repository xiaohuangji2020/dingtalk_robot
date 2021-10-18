import { DarukServer } from 'daruk';
import '@/config/Connection';
import init from '@/config/Init';

(async () => {
  const myapp = DarukServer({
    loggerOptions: { level: 'error' }
  });
  await myapp.loadFile('./controller');
  await myapp.loadFile('./service');
  await myapp.binding();
  myapp.listen(3001);

  init();
  
  console.log('--------------------------------------------------------------------');
  console.log('-----------------------------success--------------------------------');
  console.log('--------------------------------------------------------------------');
})();
