/*
TODO:
- make sure that we hide the popup after we click outside the popup area
- show twitter icon only if the selection is not exceeding 280 characters
*/

class Shareable extends HTMLDivElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._showPopup = false;
    this._selectionText;
    this._twitterIcon = `<svg aria-hidden="true" style="height:20px;" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>`;
    this._emailIcon = `<svg aria-hidden="true" style="height:20px;" focusable="false" data-prefix="fas" data-icon="envelope-open" class="svg-inline--fa fa-envelope-open fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z"></path></svg>`;
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
                    padding: 3px 10px;
                    border-radius: 3px;
                    -webkit-box-shadow: 0 8px 6px -6px black;
                    -moz-box-shadow: 0 8px 6px -6px black;
                    box-shadow: 0 8px 6px -6px black;
                }
                a {
                    color: #fff;
                    height: 100%;
                    display: inline-block;
                    padding: 6px;
                    vertical-align: middle;
                    height: 20px;
                }
                a:hover {
                    background: #1a1919;
                }
            </style>
            <slot></slot>
            <div class="share-popup">
                <a class="share-popup__twitter" target="_blank" rel="noopener noreferrer" title="Share on Twitter">${this._twitterIcon}</a>
                <a href="mailto:?subject=Checkout this article&body=URL to the article." title="Send via e-mail">${this._emailIcon}</a>
            </div>
        `;
  }

  connectedCallback() {
    this._sharePopup = this.shadowRoot.querySelector(".share-popup");

    this.addEventListener("mouseup", event => {
      this._render();
    });
  }

  _render() {
    this._getSelectionText();
  }

  _calculatePopupPosition(position) {
    if (position.width) {
      this._sharePopup.style.left = position.left + position.width / 2 + "px";
      this._sharePopup.style.top =
        position.top + window.pageYOffset - 45 + "px";
      this._sharePopup.style.display = "block";
    } else {
      this._sharePopup.style.display = "none";
    }
  }

  _getSelectionText() {
    this._selectionText = "";

    if (window.getSelection) {
      const getSelectionPosition = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();
      this._calculatePopupPosition(getSelectionPosition);
      this._selectionText = window.getSelection().toString();

      this.shadowRoot
        .querySelector(".share-popup__twitter")
        .setAttribute(
          "href",
          `https://twitter.com/intent/tweet?status=${this._selectionText}`
        );
    }
  }
}

customElements.define("x-shareable", Shareable, { extends: "div" });
