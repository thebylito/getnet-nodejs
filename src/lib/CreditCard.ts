import { handleError } from '../exceptions/GetnetException';
import { GetnetService } from '../services';
import {
  BillingAddress,
  DocumentTypes,
  ProductTypes,
  Shippingddress,
} from '../types/Customer';
import { CardBrands } from './Card';

type BankSlipStatusTypes = 'PENDING';

type TransactionTypes =
  | 'FULL'
  | 'INSTALL_NO_INTEREST'
  | 'INSTALL_WITH_INTEREST';

export interface CreditCardPaymentRequest {
  seller_id: string;
  amount: number;
  currency: string;
  order: {
    order_id: string;
    sales_tax: number;
    product_type: ProductTypes;
  };
  customer: {
    customer_id: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    document_type: DocumentTypes;
    document_number: string;
    phone_number: string;
    billing_address: BillingAddress;
  };
  device?: {
    ip_address: string;
    device_id: string;
  };
  shippings: {
    first_name: string;
    name: string;
    email: string;
    phone_number: string;
    shipping_amount: 3000;
    address: Shippingddress;
  }[];
  sub_merchant?: {
    identification_code: string;
    document_type: DocumentTypes;
    document_number: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  credit: {
    delayed: boolean;
    pre_authorization: boolean;
    save_card_data: boolean;
    transaction_type: TransactionTypes;
    number_installments: number;
    soft_descriptor: string;
    dynamic_mcc: number;
    card: {
      number_token: string;
      expiration_month: string;
      expiration_year: string;
      cardholder_name?: string;
      security_code?: string;
      brand?: CardBrands;
    };
  };
}

interface CreditCardPaymentResponse {
  seller_id: string;
  payment_id: string;
  amount: number;
  currency: string;
  order_id: string;
  status: BankSlipStatusTypes;
  boleto: {
    boleto_id: string;
    bank: number;
    status_code: number;
    status_label: string;
    typeful_line: string;
    bar_code: string;
    issue_date: string;
    expiration_date: string;
    our_number: string;
    document_number: string;
    _links: {
      href: string;
      rel: string;
      type: string;
    }[];
  };
}

export default class CreditCard {
  public static async create(
    params: CreditCardPaymentRequest
  ): Promise<CreditCardPaymentResponse> {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<CreditCardPaymentResponse>(
      '/v1/payments/boleto',
      params
    );
    const { status, data } = response;
    if (status === 201 && data) {
      const baseUrl = api.getBaseURL();
      const { _links } = data.boleto;

      const linksWithBaseUrl = _links.map((link) => ({
        ...link,
        href: `${baseUrl}${link.href}`,
      }));

      return {
        ...data,
        boleto: {
          ...data.boleto,
          _links: linksWithBaseUrl,
        },
      };
    }
    throw handleError(response);
  }
}
