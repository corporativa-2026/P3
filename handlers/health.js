export default function health(request, response) {
  const accept = request.headers['accept'];
  let timestamp = new Date().toISOString();
  response.statusCode = 200;
  if ('application/json' === accept) {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({
      timestamp,
      server: 'healthy',
    }));
  } else if ('application/xml' === accept) {
    response.setHeader('Content-Type', 'application/xml');
    response.write(`
      <health timestamp="${timestamp}">
        <server>healthy</server>
      </health>
    `);
  } else if ('text/html' === accept) {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"><title>Health Status</title></head>
      <body>
        Status at ${timestamp}
        <dl>
          <dt>Server</dt>
          <dd>Healthy</dd>
        </dl>
      </body>
      </html>
    `);
  } else {
    response.setHeader('Content-Type', 'text/plain');
    response.write("Server is healthy.");
  }
  response.end();
}
