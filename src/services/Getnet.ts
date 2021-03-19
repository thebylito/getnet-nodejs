import apisauce, { ApisauceInstance } from 'apisauce';
import { Client } from '../config';

const config = {
  sandbox: {
    endpoint: 'https://api-sandbox.getnet.com.br',
  },
  homolog: {
    endpoint: 'https://api-homologacao.getnet.com.br',
  },
  production: {
    endpoint: 'https://api.getnet.com.br',
  },
};

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export type TokenizeUserCard = {
  card_number: string;
  cardholder_name: string;
  expiration_month: string;
  expiration_year: string;
  customer_id: string;
  security_code: string;
};

class GetnetService {
  public readonly api: ApisauceInstance;
  private clientInstance = Client.getInstance();

  constructor() {
    this.api = apisauce.create({
      baseURL: config[this.clientInstance.env].endpoint,
      headers: {
        seller_id: this.clientInstance.sellerId,
      },
    });
  }

  public async init() {
    await this.getBearerToken();
    return this;
  }

  private async getBearerToken() {
    this.api.setHeaders({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${this.clientInstance.basicAuthtoken}`,
    });
    const request = await this.api.post<AuthResponse>(
      '/auth/oauth/v2/token',
      'scope=oob&grant_type=client_credentials'
    );
    if (request.status === 200 && request.data?.access_token) {
      const token = `Bearer ${request.data.access_token}`;
      this.api.setHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });
      return;
    }
    throw request.data;
  }
}

export default class Singleton {
  private static instance: GetnetService;

  private constructor() {}

  public static async getInstance(): Promise<GetnetService> {
    if (!Singleton.instance) {
      Singleton.instance = await new GetnetService().init();
    }
    return Singleton.instance;
  }
}
