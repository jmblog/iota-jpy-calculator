import { render } from 'lit-html/lib/lit-extended';

export default (html, component) => {
  return render(html, component.shadowRoot || component.attachShadow({ mode: 'open' }));
};
