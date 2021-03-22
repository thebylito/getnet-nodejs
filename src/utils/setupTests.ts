import test from 'ava';
import getnet from '../index';

export const credentials = {
  homolog: {
    sellerId: '298bfe6b-75f7-4ee0-a007-9fcfa1357b77',
    clientId: '450ea0ce-fcdf-481c-b08a-1ce6c65a62fb',
    secret: '63bf0973-c0c4-46c3-90d3-2024d3fad799',
  },
  sandbox: {
    sellerId: '26a84a2d-4979-4880-b9f9-f790b1aea047',
    clientId: '3be99a8b-2cdf-400a-bfaf-d9201ba62c36',
    secret: 'd6febec9-ebcc-4488-9a28-9576d0bd61b6',
  },
};

test.before(() => {
  getnet.setConfig(credentials.sandbox);
  getnet.setEnv('sandbox');
});

export const customer = {
  customer_id: 'customer_1',
};

export const order = {
  id: 'order1',
};
