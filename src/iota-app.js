import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { DomIf } from '@polymer/polymer/lib/elements/dom-if';
import '@webcomponents/webcomponentsjs/webcomponents-sd-ce';
import axios from 'axios';
import io from 'socket.io-client';
import lazyResources from './lazy-resources.json';

class IotaApp extends PolymerElement {
  static get template() {
    return `
      <style>
      :host {
        --app-primary-color: #303030;
        --app-secondary-color: #808b92;
        --app-accent-color: #009fff;
        --app-border-color: #e5e5e5;
        display: block;
        position: relative;
        min-height: 100vh;
        color: var(--app-primary-color);
        background-color: #f5f5f5;
        padding-bottom: 18px;
      }

      .container {
        margin: 24px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 420px;
      }

      @media (max-width: 767px) {
        .container {
          max-width: 300px;
        }        
      }
      </style>

      <iota-app-header></iota-app-header>
      <template is="dom-if" if="[[iot_jpy]]">
        <div class="container">
          <iota-ticker price="[[iot_jpy]]"></iota-ticker>
          <iota-ticker-sub price="[[btc_jpy]]" unit="JPY/BTC" format="0,0"></iota-ticker-sub>
          <iota-ticker-sub price="[[iot_btc]]" unit="BTC/Mi"></iota-ticker-sub>
        </div>
        <div class="container">
          <iota-calculator unit-price="[[iot_jpy]]" calculated-currency="JPY"></iota-calculator>
        </div>
        <div class="container">
          <iota-app-footer></iota-app-footer>
        </div>
      </template>
      `;
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      btc_jpy: {
        type: Number,
        value: 0,
        notify: true,
      },
      iot_btc: {
        type: Number,
        value: 0,
        notify: true,
      },
      iot_jpy: {
        type: Number,
        value: 0,
        computed: 'computeIotaJpy(btc_jpy, iot_btc)',
      },
    };
  }

  computeIotaJpy(btc_jpy, iot_btc) {
    return btc_jpy * iot_btc;
  }

  ready() {
    super.ready();
    Promise.all([this._getInitialPrice('btc', 'jpy'), this._getInitialPrice('iot', 'btc')]);
    this._subscribeCryptoCompare();
    // Custom elements polyfill safe way to indicate an element has been upgraded.
    this.removeAttribute('unresolved');
    this._ensureLazyLoaded();
  }

  _ensureLazyLoaded() {
    lazyResources.forEach(resource => {
      const elm = document.createElement('script');
      elm.src = `./${resource}.js`;
      document.body.appendChild(elm);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js', { scope: '/' });
    }
  }

  _getInitialPrice(fromSymbol, toSymbol) {
    axios
      .get('https://min-api.cryptocompare.com/data/price', {
        params: {
          fsym: fromSymbol.toUpperCase(),
          tsyms: toSymbol.toUpperCase(),
        },
      })
      .then(res => {
        console.log(res.data);
        this[`${fromSymbol}_${toSymbol}`] = res.data[toSymbol.toUpperCase()];
      });
  }

  _subscribeCryptoCompare() {
    // https://www.cryptocompare.com/api/#-api-web-socket-current-
    const socket = io.connect('https://streamer.cryptocompare.com/');
    const subscriptions = ['5~CCCAGG~IOT~BTC', '5~CCCAGG~BTC~JPY'];
    socket.emit('SubAdd', { subs: subscriptions });
    socket.on('m', message => {
      const messageType = message.substring(0, message.indexOf('~'));
      if (messageType === '5') {
        // '{SubscriptionId}~{ExchangeName}~{FromCurrency}~{ToCurrency}~{Flag}~{Price}~{LastUpdate}~{LastVolume}~{LastVolumeTo}~{LastTradeId}~{Volume24h}~{Volume24hTo}~{LastMarket}'
        const data = message.split('~');
        const fromCurrency = data[2].toLowerCase();
        const toCurrency = data[3].toLowerCase();
        const flag = data[4];

        // track only PRICEUP and PRICEDOWN
        if (flag === '1' || flag === '2') {
          const price = data[5] || 0;
          this[`${fromCurrency}_${toCurrency}`] = price;
          console.log(`${fromCurrency}_${toCurrency}`, price);
        }
      }
    });
  }
}

window.customElements.define('iota-app', IotaApp);
