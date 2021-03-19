import test from 'ava';
import getnet from '../index';

test.before(() => {
  const sellerId = '26a84a2d-4979-4880-b9f9-f790b1aea047';
  const clientId = '3be99a8b-2cdf-400a-bfaf-d9201ba62c36';
  const secret = 'd6febec9-ebcc-4488-9a28-9576d0bd61b6';
  getnet.config({ sellerId, clientId, secret });
});
