import * as http from 'http';


namespace System.Net {
  export class WebClient {



    
  }
}

async function request (url: string) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(res.statusCode);
        return;
      }

      res.setEncoding('utf8');
      let data = '';
      res
        .on('data', chunk => data += chunk)
        .on('end', () => resolve(data))
        .on('error', reject);
    });
  });
}