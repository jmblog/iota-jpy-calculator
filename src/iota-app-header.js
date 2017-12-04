import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

class IotaAppHeader extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 98px;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.1em;
          border-bottom: 1px solid var(--app-border-color);
          background-color: #fff;
        }
        @media (max-width: 767px) {
          :host {
            height: 72px;
            font-size: 20px;
          }
        }
      </style>
      <div>IOTA/JPY Calculator</div>
    `;
  }
}

window.customElements.define('iota-app-header', IotaAppHeader);
