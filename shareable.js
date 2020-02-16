class Shareable extends HTMLDivElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <slot></slot>
        `;
    }

    connectedCallback() {
        this.addEventListener('mouseup', event => {
            console.log(this._getSelectionText());
        });
    }

    _getSelectionText() {
        let text = '';

        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if ( document.selection && document.selection.type != 'Control' ) {
            text = document.selection.getRange().text;
        }

        return text;
    }
}

customElements.define('x-shareable', Shareable, { extends: 'div' });