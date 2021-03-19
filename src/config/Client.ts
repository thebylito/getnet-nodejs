import { GetnetEnvs } from '..';

export class ClientConfig {
  #sellerId: string = null;
  #clientId: string = null;
  #secret: string = null;
  #env: GetnetEnvs = 'sandbox';

  get sellerId() {
    return this.#sellerId;
  }

  set sellerId(value) {
    this.#sellerId = value;
  }

  get clientId() {
    return this.#clientId;
  }

  set clientId(value) {
    this.#clientId = value;
  }

  get secret() {
    return this.#secret;
  }

  set secret(value) {
    this.#secret = value;
  }

  get env() {
    return this.#env;
  }

  set env(value) {
    this.#env = value;
  }

  get basicAuthtoken() {
    const clientSecret = `${this.#clientId}:${this.#secret}`;
    // @ts-ignore
    const buffer = new Buffer.from(clientSecret);
    return buffer.toString('base64');
  }
}

export default class Singleton {
  private static instance: ClientConfig;

  private constructor() {}

  public static getInstance(): ClientConfig {
    if (!Singleton.instance) {
      Singleton.instance = new ClientConfig();
    }

    return Singleton.instance;
  }
}
