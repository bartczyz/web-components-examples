/*
TODO:
- make sure that we hide the popup after we click outside the popup area
- add Social Media buttons (create a separate component?)
*/

class Shareable extends HTMLDivElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._showPopup = false;
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
            this._render();
        });
    }

    _render() {
        this._getSelectionText();   
    }

    _calculatePopupPosition(position) {
        if(position.width) {
            this._sharePopup.style.left = position.left + (position.width / 2) + "px";
            this._sharePopup.style.top = position.top + window.pageYOffset - 45 + "px";
            this._sharePopup.style.display = "block";
        } else {
            this._sharePopup.style.display = "none";
        }
    }

    _getSelectionText() {
        let text = '';

        if (window.getSelection) {
            const getSelectionPosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
            this._calculatePopupPosition(getSelectionPosition);
            text = window.getSelection().toString();   
        }

        return text;
    }
}

customElements.define('x-shareable', Shareable, { extends: 'div' });
