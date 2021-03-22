import '../utils/setupTests';
import test from 'ava';
import Getnet from '../index';

const custumer = {
  id: 'customer_1',
};

// ----
test('Verify an card by card_number', async (t) => {
  const card = await Getnet.Card.tokenize({
    card_number: '5155901222280001',
    customer_id: custumer.id,
  });
  const verify = await Getnet.Card.verify({
    number_token: card.number_token,
    expiration_month: '12',
    expiration_year: '20',
    cardholder_name: 'JOAO DA SILVA',
  });
  t.is(verify.status, 'VERIFIED');
});
