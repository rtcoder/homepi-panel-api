class ProgressRing extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute('stroke');
    const radius = this.getAttribute('radius');
    const withText = +this.getAttribute('with-text');
    const fontSize = this.getAttribute('font-size') || '12px';
    const color = this.getAttribute('color') || 'black';
    const fill = this.getAttribute('fill') || 'transparent';
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;

    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
      <svg
        height="${radius * 2}"
        width="${radius * 2}"
       >
         <circle
           stroke="${color}"
           stroke-dasharray="${this._circumference} ${this._circumference}"
           style="stroke-dashoffset:${this._circumference}"
           stroke-width="${stroke}"
           fill="${fill}"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
       ${withText
        ? ` <text
           x="${radius}"
           y="${radius}"
           text-anchor="middle"
           stroke="${color}" 
           font-size="${fontSize}"
           dy=".3em">0%</text>`
        : ''
      }
        </svg>

      <style>
        circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
    `;
  }

  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.querySelector('circle');
    const text = this._root.querySelector('text');
    circle.style.strokeDashoffset = offset;
    if (text) {
      text.innerHTML = `${percent}%`;
    }
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }
}

window.customElements.define('progress-ring', ProgressRing);
