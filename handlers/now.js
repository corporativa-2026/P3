const countries = { // timezone offset
  'BR': -3, // BRazil
  'IT': +1, // ITaly
  'CV': +1, // Cape Verde
};

export default function now(request, response) {
  const currentDateTime = new Date();
  const url = new URL(request.url, `http://${request.headers['host']}`);
  const country = url.searchParams.get('country');

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  if (country) {
    if (country.toUpperCase() in countries) {
      response.write('Time in ' + country + ' is ' +
        (currentDateTime.getUTCHours() + countries[country]) +
        ' hours and ' + currentDateTime.getMinutes() + ' minutes');
    } else {
      response.statusCode = 400;
      response.write(`Country ${country} is not supported.`);
    }
  } else {
    response.write('Time UTC is ' +
      currentDateTime.getUTCHours() + ' hours and ' +
      currentDateTime.getMinutes() + ' minutes');
  }

  response.end();
}
