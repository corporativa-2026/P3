export default function log(request, response) {
  console.log(new Date(), `Recebendo nova requisição ==>
    Method: ${request.method}
    URL: ${request.url}
    Headers: ${JSON.stringify(request.headers)}
  `);
}
