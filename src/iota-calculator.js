import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import '@webcomponents/webcomponentsjs/webcomponents-sd-ce';
import numeral from 'numeral';

class IotaCalculator extends PolymerElement {
  static get template() {
    return `
    <style>
      .title {
        margin-bottom: 4px;
        margin-left: 4px;
      }

      .calculator {
        display: flex;
        flex-direction: column;
        padding: 24px;
        margin-bottom: 8px;
        border-radius: 6px;
        background-color: #fff;

      }

      .input-wrapper {
        margin-bottom: 8px;
      }

      .input {
        display: block;
        width: 100%;
        padding: 12px;
        font-size: 24px;
        background-color: #fff;
        border: 1px solid var(--app-border-color);
        border-radius: 2px;
        box-sizing: border-box;
      }

      .unit-button-group {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 8px;
      }

      .unit-button {
        cursor: pointer;
        font-size: 1em;
        font-family: 'Lato', sans-serif;
        display: inline-block;
        outline: 0;
        border: none;
        background-color: var(--app-border-color);
        padding: 12px 20px;
        text-transform: none;
        text-shadow: none;
        line-height: 1em;
        text-align: center;
        user-select: none;
        border-radius: 0;
        margin-left: 8px;
      }

      .unit-button[active] {
        background-color: var(--app-accent-color);
        color: #fff;
      }

      .icon {
        text-align: center;
        margin: 16px 0;
      }

      .calculatedPrice {
        font-size: 32px;
        text-align: center;
      }

      .calculatedCurrency {
        font-size: 13px;
        margin-left: 0.5em;
      }

    </style>
    <div class="title">Calculator</div>
    <div class="calculator">
      <div class="input-wrapper">
        IOTA <input class="input" type="number" placeholder="" value="{{amount}}" on-change="handleAmountChange">
      </div>
      <div class="unit-button-group">
        <button class="unit-button" data-coefficient="mi" on-click="handleUnitChange">Mi</button>
        <button class="unit-button" data-coefficient="gi" on-click="handleUnitChange">Gi</button>
        <button class="unit-button" data-coefficient="ti" on-click="handleUnitChange">Ti</button>
        <button class="unit-button" data-coefficient="pi" on-click="handleUnitChange">Pi</button>
        </div>
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="18 14 12 20 6 14"></polyline></svg>
      </div>      
      <div class="calculatedPrice">[[calculatedPrice]]<span class="calculatedCurrency">[[calculatedCurrency]]</span></div>
    </div>
    `;
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this.shadowRoot.querySelectorAll('.unit-button').forEach(element => {
      if (element.getAttribute('data-coefficient') === this.unit) {
        element.setAttribute('active', true);
      }
    });
  }

  static get properties() {
    return {
      unitPrice: {
        type: Number,
        value: 0,
        notify: true,
      },
      unit: {
        type: String,
        notify: true,
        value: window.localStorage.getItem('iotaUnit') || 'mi',
      },
      calculatedCurrency: {
        type: String,
      },
      amount: {
        type: Number,
        value: window.localStorage.getItem('iotaAmount') || 1000,
        notify: true,
      },
      calculatedPrice: {
        type: String,
        computed: 'calculatePrice(unitPrice, amount, unit)',
      },
    };
  }

  calculatePrice(unitPrice, amount, unit) {
    return numeral(unitPrice * amount / 1000000 * this.coefficient(unit)).format('0,0');
  }

  handleAmountChange(e) {
    this.amount = e.target.value;
    window.localStorage.setItem('iotaAmount', this.amount);
  }

  coefficient(unit) {
    const systemOfUnits = {
      ki: 1000,
      mi: 1000000,
      gi: 1000000000,
      ti: 1000000000000,
      pi: 1000000000000000,
    };
    return systemOfUnits[unit] || 1;
  }

  handleUnitChange(e) {
    this.shadowRoot.querySelectorAll('.unit-button').forEach(element => {
      element.removeAttribute('active');
    });
    e.target.setAttribute('active', true);
    this.unit = e.target.getAttribute('data-coefficient');
    window.localStorage.setItem('iotaUnit', this.unit);
  }
}

window.customElements.define('iota-calculator', IotaCalculator);
