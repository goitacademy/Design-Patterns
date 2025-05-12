import axios from 'axios';

interface IHttpClient {
  get<T>(url: string): Promise<T>;
}

class AxiosHttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }
}

class FetchHttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Помилка запиту: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}


class ApiClient {
  constructor(private httpClient: IHttpClient) { }

  async getData(url: string) {
    return await this.httpClient.get<any>(url);
  }
}

const client = new ApiClient(new FetchHttpClient());
client.getData('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11')
  .then(data => console.log(data));
