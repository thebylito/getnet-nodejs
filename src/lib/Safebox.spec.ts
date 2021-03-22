import '../utils/setupTests';
import test from 'ava';
import Getnet from '../index';

const custumer = {
  id: 'customer_1',
};

// ----
test('Create a number_token', async (t) => {
  const card1 = await Getnet.Card.tokenize({
    card_number: '5155901222280001',
    customer_id: custumer.id,
  });
  t.not(card1, null);
});

// ----
test('Create a tokenized card and send it to safebox', async (t) => {
  const card1 = await Getnet.Card.tokenize({
    card_number: '5155901222280001',
    customer_id: custumer.id,
  });
  t.not(card1, null);
  const card = {
    number_token: card1.number_token,
    brand: 'Mastercard',
    cardholder_name: 'JOAO DA SILVA',
    expiration_month: '12',
    expiration_year: '20',
    customer_id: custumer.id,
    cardholder_identification: '12345678912',
    verify_card: false,
    security_code: '123',
  };
  const safeboxCard = await Getnet.Safebox.createCard(card);
  t.is(safeboxCard.number_token, card.number_token);
});

// ----
test('Get all cards from an customer', async (t) => {
  const cards = await Getnet.Safebox.getAllCardsByCustomerId(custumer.id);
  t.is(Array.isArray(cards), true);
});

// ----
test('Get one card from an customer', async (t) => {
  const cards = await Getnet.Safebox.getAllCardsByCustomerId(custumer.id);
  const cardToFind = cards[0];

  const card = await Getnet.Safebox.getCardById(cardToFind.card_id);
  t.is(card.card_id, cardToFind.card_id);
  t.is(card.cardholder_name, cardToFind.cardholder_name);
  t.is(card.last_four_digits, cardToFind.last_four_digits);
  t.is(card.expiration_month, cardToFind.expiration_month);
});

// ----
test('Delete one card from an customer', async (t) => {
  const cards = await Getnet.Safebox.getAllCardsByCustomerId(custumer.id);
  const deleteCard = Getnet.Safebox.removeCardById(cards[0].card_id);
  await t.notThrowsAsync(deleteCard);
});
