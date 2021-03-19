import { handleError } from '../exceptions/GetnetException';
import { GetnetService } from '../services';

export type CardBrands = 'Mastercard' | 'Visa' | 'Amex' | 'Elo' | 'Hipercard';

interface CardNumberToken {
  number_token: string;
}

interface TokenizeCard {
  card_number: string;
  customer_id: string;
}

interface CardVerify {
  number_token: string;
  expiration_month: string;
  expiration_year: string;
  cardholder_name: string;
  brand?: CardBrands;
  security_code?: string;
}

interface CardVerifyResponse {
  status: 'VERIFIED' | 'NOT VERIFIED' | 'DENIED' | 'ERROR';
  verification_id: string;
  authorization_code: string;
}

export default class Card {
  public static async tokenize(params: TokenizeCard): Promise<CardNumberToken> {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<CardNumberToken>('/v1/tokens/card', params);
    const { status, data } = response;
    if (status === 201 && data) {
      return data;
    }
    throw handleError(response);
  }

  public static async verify(params: CardVerify): Promise<CardVerifyResponse> {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<CardVerifyResponse>(
      '/v1/cards/verification',
      params
    );
    const { status, data } = response;
    if (status === 200 && data) {
      return data;
    }
    throw handleError(response);
  }
}
