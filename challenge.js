const headersList = { 
    'Content-type': 'application/json',
};
const headers = new Headers(headersList);

const method = 'GET';

const url = 'https://github.com/mdn/content/issues/12959';

const request = new Request(url, { method, headers });

console.log(headers.get('Content-type'));