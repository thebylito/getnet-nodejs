import test from 'ava';
import getnet from './index';
import { credentials } from './utils/setupTests';

test('configures the sellerId, clientId and the secret', (t) => {
  const { sellerId, clientId, secret } = credentials.sandbox;

  getnet.setConfig({ sellerId, clientId, secret });
  t.is(getnet.client.sellerId, sellerId);
  t.is(getnet.client.clientId, clientId);
  t.is(getnet.client.secret, secret);
});

test('defines the getnet api`s environment', (t) => {
  getnet.setEnv('sandbox');
  t.is(getnet.client.env, 'sandbox');
  getnet.setEnv('production');
  t.is(getnet.client.env, 'production');
  getnet.setEnv('homolog');
  t.is(getnet.client.env, 'homolog');
});
