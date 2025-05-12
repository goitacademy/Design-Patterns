import axios from 'axios';

class ApiClient {
  async getData(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
}

const client = new ApiClient();
client.getData('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11')
  .then(data => console.log(data));
