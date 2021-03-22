export type DocumentTypes = 'CPF' | 'CNPJ';

export type ProductTypes =
  | 'cash_carry'
  | 'digital_content'
  | 'digital_goods'
  | 'digital_physical'
  | 'gift_card'
  | 'physical_goods'
  | 'renew_subs'
  | 'shareware'
  | 'service';

export interface CustomerAddress {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export type BillingAddress = CustomerAddress;
export type Shippingddress = CustomerAddress;
