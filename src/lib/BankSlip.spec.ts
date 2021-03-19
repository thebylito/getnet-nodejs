import '../utils/setupTests';
import { credentials } from '../utils/setupTests';
import test from 'ava';
import { Payment } from '../index';
import { BankSlipCreate } from './BankSlip';
import { DateTime } from 'luxon';

const mock: BankSlipCreate = {
  seller_id: credentials.sellerId,
  amount: 100,
  currency: 'BRL',
  order: {
    order_id: '6d2e4380-d8a3-4ccb-9138-c289182818a3',
    sales_tax: 0,
    product_type: 'service',
  },
  boleto: {
    our_number: '000001946598',
    document_number: '170500000019763',
    expiration_date: DateTime.local().plus({ days: 7 }).toFormat('dd/MM/yyyy'),
    instructions: 'Não receber após o vencimento',
    provider: 'santander',
  },
  customer: {
    first_name: 'João',
    name: 'João da Silva',
    document_type: 'CPF',
    document_number: '12345678912',
    billing_address: {
      street: 'Av. Brasil',
      number: '1000',
      complement: 'Sala 1',
      district: 'São Geraldo',
      city: 'Porto Alegre',
      state: 'RS',
      postal_code: '90230060',
    },
  },
};

// ----
test('Create a BankSplit/Boleto', async (t) => {
  const bankSplit = await Payment.BankSlip.create(mock);
  t.is(bankSplit.amount, mock.amount);
});
