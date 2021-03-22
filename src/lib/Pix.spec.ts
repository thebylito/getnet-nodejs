import '../utils/setupTests';
import { credentials, customer, order } from '../utils/setupTests';
import test from 'ava';
import Getnet from '../index';
import { PixPaymentRequest } from './Pix';

const mock: PixPaymentRequest = {
  amount: 100,
  currency: 'BRL',
  customer_id: customer.customer_id,
  order_id: order.id,
};

// ----
test('Create a Pix payment', async (t) => {
  Getnet.setConfig(credentials.homolog);
  Getnet.setEnv('homolog');

  const bankSplit = await Getnet.Payment.Pix.create(mock);
  t.not(bankSplit.payment_id, null);
});
