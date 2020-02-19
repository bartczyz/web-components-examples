/*
TODO:
- create a separate method for displaying the modal
- make sure that we hide the popup after we click outside the popup area
- add Social Media buttons (create a separate component?)
*/

class Shareable extends HTMLDivElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._sharePopup;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                }
                .share-popup {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    background: #000;
                    padding: 10px;
                }
            </style>
            <slot></slot>
            <div class="share-popup">
                <button>Twitter</button>
            </div>
        `;
    }

    connectedCallback() {
        this._sharePopup = this.shadowRoot.querySelector('.share-popup');

        this.addEventListener('mouseup', event => {
            this._sharePopup.style.display = "block";
            this._getSelectionText();
        });
    }

    _getSelectionText() {
        let text = '';

        if (window.getSelection) {
            const currentSelection = window.getSelection().getRangeAt(0).getBoundingClientRect();
            text = window.getSelection().toString();

            this._sharePopup.style.left = currentSelection.left + (currentSelection.width / 2) + "px";
            this._sharePopup.style.top = currentSelection.top + window.pageYOffset - 45 + "px";
        } else if ( document.selection && document.selection.type != 'Control' ) {
            text = document.selection.getRange().text;
        }

        return text;
    }
}

customElements.define('x-shareable', Shareable, { extends: 'div' });
