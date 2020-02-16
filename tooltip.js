class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    text-decoration-line: underline;
                    text-decoration-style: dashed;
                    color: #ff8c00;
                    cursor: help;
                }
                div {
                    background-color: grey;
                    color: white;
                    position: absolute;
                    top: 20px;
                    left: 60px;
                    z-index: 10;
                    padding: 5px;
                    border-radius: 3px;
                    width: 200px;
                }
            </style>
            <slot></slot>
            <span> (?)</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        
        const tooltipIcon = this.shadowRoot.querySelector('span');
        this.addEventListener('mouseenter', this._showTooltip.bind(this));
        this.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('x-tooltip', Tooltip);