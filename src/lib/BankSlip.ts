import { handleError } from '../exceptions/GetnetException';
import { GetnetService } from '../services';
import { DocumentTypes, ProductTypes } from '../types/Customer';

type BankSlipStatusTypes = 'PENDING';

interface BankSlipCreateResponse {
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

export interface BankSlipCreate {
  seller_id: string;
  amount: number;
  currency?: string;
  order: {
    order_id: string;
    sales_tax?: number;
    product_type?: ProductTypes;
  };
  boleto: {
    our_number: string;
    document_number: string;
    expiration_date: string;
    instructions: string;
    provider: string;
  };
  customer: {
    first_name?: string;
    name: string;
    document_type: DocumentTypes;
    document_number: string;
    billing_address: {
      street: string;
      number: string;
      complement?: string;
      district: string;
      city: string;
      state: string;
      postal_code: string;
    };
  };
}

export default class BankSlip {
  public static async create(
    params: BankSlipCreate
  ): Promise<BankSlipCreateResponse> {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<BankSlipCreateResponse>(
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

  public static async getLinksById(payment_id: string) {
    const { api } = await GetnetService.getInstance();
    const baseUrl = api.getBaseURL();
    return {
      html: `${baseUrl}/v1/payments/boleto/${payment_id}/html`,
      pdf: `${baseUrl}/v1/payments/boleto/${payment_id}/pdf`,
    };
  }
}
