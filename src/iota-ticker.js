import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import numeral from 'numeral';

class IotaTicker extends PolymerElement {
  static get template() {
    return `
      <style>
      .ticker {
        display: flex;
        flex-direction: column;
        font-weight: 300;
        padding: 24px;
        margin-bottom: 8px;
        border-radius: 6px;
        background-color: #fff;
      }

      .ticker-label {
        color: var(--app-secondary-color);
        padding-bottom: 16px;
      }

      .ticker-price {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        font-size: 48px;
        line-height: 1;
        color: var(--app-accent-color);
      }

      .ticker-price-decimal {
        margin-left: 4px;
        font-size: 24px;
      }

      .ticker-price-per {
        margin-left: 16px;
        color: var(--app-secondary-color);
        font-size: 16px;
      }
      </style>
      <div class="ticker">
      <div class="ticker-label">IOTA / JPY</div>
      <div class="ticker-price">
        <span>¥ [[priceInteger]]</span>
        <span class="ticker-price-decimal">[[priceDecimal]]</span>
        <span class="ticker-price-per">/ 1 Mi</span>
      </div>
    </div>
    `;
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      price: {
        type: Number,
        value: 0,
        notify: true,
      },
      priceInteger: {
        type: String,
        value: 0,
        readOnly: true,
        computed: 'computeInteger(price)',
      },
      priceDecimal: {
        type: String,
        value: 0,
        readOnly: true,
        computed: 'computeDecimal(price)',
      },
    };
  }

  computeInteger(price) {
    return numeral(price).format('0,0');
  }

  computeDecimal(price) {
    return numeral(price).format('.00');
  }
}

window.customElements.define('iota-ticker', IotaTicker);
