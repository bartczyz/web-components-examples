class Shareable extends HTMLDivElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .share-popup {
                    background: #000;
                }
            </style>
            <slot></slot>
            <div class="share-popup"></div>
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
