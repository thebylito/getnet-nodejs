import { Client } from './config';

export { default as Safebox, SafeboxCard } from './lib/Safebox';
export { default as Card } from './lib/Card';
export { default as Payment } from './lib/Payment';
export { BankSlipCreate } from './lib/BankSlip';
// export { default as Safebox } from './Safebox';
// export { default as Payment } from './Payment';

const client = Client.getInstance();

interface Config {
  sellerId: string;
  clientId: string;
  secret: string;
}

export type GetnetEnvs = 'sandbox' | 'homolog' | 'production';

const setConfig = ({ sellerId, clientId, secret }: Config) => {
  client.sellerId = sellerId;
  client.clientId = clientId;
  client.secret = secret;
};

const setEnv = (env: GetnetEnvs) => (client.env = env);

export default {
  setConfig,
  client,
  setEnv,
};
