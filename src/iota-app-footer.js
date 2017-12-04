import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

class IotaAppFooter extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return `
      <style>
      :host {
        font-size: 13px;
        color: var(--app-secondary-color);
      }

      ul {
        padding-left: 1.5em;
      }

      li {
        margin-bottom: 1em;
      }

      .donation {
        padding: 8px 4px;
      }

      pre {
        margin-top: 0.3em;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: auto;
        font-size: 13px;
      }

      address {
        text-align: center;
        font-style: normal;        
      }
      </style>
      <div class="disclaimer">
        <ul>
          <li>本ウェブサイトで表示しているIOTA/JPYの価格は、<a href="https://www.cryptocompare.com/">cryptocompare.com</a> が提供するマーケットデータから算出した概算値です。実際の取引価格とは異なります。</li>
          <li>当ウェブサイトは、当ウェブサイトに含まれる情報もしくは内容をご利用されたことで直接・間接的に生じた損失に関し、一切責任を負わないものとします。</li>
        </ul>
      </div>
      <div class="donation">
        <p>Feel like giving me ☕️ or 🍺 ?</p>
        IOTA Address:
        <pre>ZMSIPJODCKDCVLAKMF9ECFVREWKRPRHVUKP9GBKMCWGEYFCOBTIJWRLVNPHPCYUJKGQRGZANUJVXXALVXCJD9SXYC9</pre>
      </div>
      <address>&copy; ${new Date().getFullYear()} Yoshihide Jimbo. All rights reserved.</address>
      `;
  }
}

window.customElements.define('iota-app-footer', IotaAppFooter);
