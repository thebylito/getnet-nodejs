import { handleError } from '../exceptions/GetnetException';
import { GetnetService } from '../services';
import { PixPaymentStatus } from '../types/Payment';

interface PixPaymentResponse {
  payment_id: string;
  status: PixPaymentStatus;
  description: string;
  additional_data: {
    transaction_id: string;
    qr_code: string;
    creation_date_qrcode: string;
    expiration_date_qrcode: string;
    psp_code: string;
  };
}

export interface PixPaymentRequest {
  amount: number;
  currency: string;
  order_id: string;
  customer_id: string;
}

export default class Pix {
  public static async create(
    params: PixPaymentRequest
  ): Promise<PixPaymentResponse> {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<PixPaymentResponse>(
      '/v1/payments/qrcode/pix',
      params
    );
    const { status, data } = response;
    if (status === 200 && data) {
      return data;
    }
    throw handleError(response);
  }
}
