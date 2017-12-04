import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import numeral from 'numeral';

class IotaTickerSub extends PolymerElement {
  static get template() {
    return `
      <style>
      .ticker {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        margin-bottom: 8px;
        padding: 12px 24px;
        background-color: #fff;
        border-radius: 6px;
      }

      .ticker-price {
        font-size: 20px;
        min-width: 110px;
        text-align: right;
      }

      .ticker-unit {
        font-size: 13px;
        margin-left: 1em;
        min-width: 52px;
      }

      .ticker-by {
        color: var(--app-secondary-color);
        font-size: 13px;
        margin-left: 1em;
      }
    </style>
    <div class="ticker">
      <div class="ticker-price">[[formattedPrice]]</div>
      <div class="ticker-unit">[[unit]]</div>
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
      },
      unit: {
        type: String,
      },
      format: {
        type: String,
        value: '',
      },
      formattedPrice: {
        type: String,
        computed: 'formatPrice(price, format)',
      },
    };
  }

  formatPrice(price, format) {
    if (format) {
      return numeral(price).format(format);
    } else {
      return price;
    }
  }
}

window.customElements.define('iota-ticker-sub', IotaTickerSub);
