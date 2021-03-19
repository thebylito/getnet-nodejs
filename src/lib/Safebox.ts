import { handleError } from '../exceptions/GetnetException';
import { GetnetService } from '../services';

interface CardNumberToken {
  number_token: string;
}

export interface SafeboxCard extends CardNumberToken {
  card_id: string;
  last_four_digits: string;
  expiration_month: string;
  expiration_year: string;
  brand: string;
  cardholder_name: string;
  customer_id: string;
  used_at: string;
  created_at: string;
  updated_at: string;
  status: string;
}

interface SafeboxCreateCard extends CardNumberToken {
  brand: string;
  cardholder_name: string;
  expiration_month: string;
  expiration_year: string;
  customer_id: string;
  cardholder_identification: string;
  verify_card: boolean;
  security_code: string;
}

type SafeboxCardStatus = 'all' | 'active' | 'renewed';

interface SafeboxCreateResponse extends CardNumberToken {
  card_id: string;
}

export default class Safebox {
  public static async createCard(params: SafeboxCreateCard) {
    const { api } = await GetnetService.getInstance();
    const response = await api.post<SafeboxCreateResponse>('/v1/cards', params);
    const { status, data } = response;
    if (status === 201 && data) {
      return data;
    }
    throw handleError(response);
  }

  public static async getAllCardsByCustomerId(
    customer_id: string,
    cards_status: SafeboxCardStatus = 'all'
  ) {
    const { api } = await GetnetService.getInstance();
    const response = await api.get<{ cards: SafeboxCard[] }>('/v1/cards', {
      customer_id,
      status: cards_status,
    });
    const { status, data } = response;
    if (status === 200 && data) {
      return data.cards;
    }
    if (status === 404) {
      return [];
    }
    throw handleError(response);
  }

  public static async getCardById(card_id: string) {
    const { api } = await GetnetService.getInstance();
    const response = await api.get<SafeboxCard>(`/v1/cards/${card_id}`);
    const { status, data } = response;
    if (status === 200 && data) {
      return data;
    }
    throw handleError(response);
  }

  public static async removeCardById(card_id: string) {
    const { api } = await GetnetService.getInstance();
    const response = await api.delete(`/v1/cards/${card_id}`);
    const { status } = response;
    if (status === 204) {
      return true;
    }
    throw handleError(response);
  }
}
