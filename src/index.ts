export { BankSlipPaymentRequest } from './lib/BankSlip';
export { PixPaymentRequest } from './lib/Pix';
export { SafeboxCard } from './lib/Safebox';
export { default as Card } from './lib/Card';

import { Client } from './config';
import Safebox from './lib/Safebox';
import Payment from './lib/Payment';
import Card from './lib/Card';

const client = Client.getInstance();

interface Config {
  sellerId: string;
  clientId: string;
  secret: string;
}

export type GetnetEnvs = 'sandbox' | 'homolog' | 'production';

export default class Getnet {
  public static client = client;

  public static setEnv = (env: GetnetEnvs) => (client.env = env);

  public static setConfig = ({ sellerId, clientId, secret }: Config) => {
    client.sellerId = sellerId;
    client.clientId = clientId;
    client.secret = secret;
  };

  public static Payment = Payment;
  public static Safebox = Safebox;
  public static Card = Card;
}
