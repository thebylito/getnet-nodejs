import BankSlip from './BankSlip';
import CreditCard from './CreditCard';
import Pix from './Pix';

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
  public static Pix = Pix;
  public static CreditCard = CreditCard;
}
