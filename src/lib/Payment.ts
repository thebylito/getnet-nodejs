import BankSlip from './BankSlip';

export interface PaymentMin {
  seller_id?: string;
  amount: number;
  currency?: string;
}

interface PaymentContructor {}

export default class Payment {
  constructor({}: PaymentContructor) {}

  public static BankSlip = BankSlip;
  public static Boleto = BankSlip;
}
