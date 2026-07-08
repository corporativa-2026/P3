import { startServer, registerHandler, registerFilter } from './web/server.js';

import health from './handlers/health.js';
import now from './handlers/now.js';
import log from './filters/log.js';
import auth from './filters/auth.js';


registerFilter(log);
registerFilter(auth, 'authentication');

registerHandler({
  method: 'GET',
  path: '/health',
  accept: ['text/plain', 'application/json', 'application/xml', 'text/html']
}, health);

registerHandler({
  method: 'GET',
  path: '/now',
  accept: ['text/pain'],
}, now);

const port = 8080;

startServer(port).then(() => { // resolve
  console.log(`Server running at http://localhost:${port}`);
}).catch((error) => { // reject
  console.error('Server cannot start: ', error);
});
