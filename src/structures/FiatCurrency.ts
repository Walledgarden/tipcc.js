import BigNumber from 'bignumber.js';
import type { APIFiatCurrency } from '@tipccjs/tipcc-api-types';
import CurrencyFormat from './CurrencyFormat';

/**
 * A class for storing an API fiat currency.
 */
export default class FiatCurrency {
  public code: string;

  public name: string;

  public format: CurrencyFormat;

  /**
   * Create a FiatCurrency.
   * @param payload The currency from the API
   */
  constructor(payload: APIFiatCurrency) {
    this.code = payload.code;
    this.name = payload.name;
    this.format = new CurrencyFormat(payload.format);
  }

  /**
   * Convert a raw value to a BigNumber in human readable format.
   * @param value The raw value
   */
  public convertFromRaw(value: BigNumber): BigNumber {
    return BigNumber(value).shiftedBy(this.format.scale * -1);
  }

  /**
   * Convert a BigNumber value in human readable format to a raw API BigNumber.
   * @param value The amount
   */
  public convertToRaw(value: BigNumber): BigNumber {
    return value.shiftedBy(this.format.scale);
  }
}