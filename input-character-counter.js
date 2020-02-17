class InputCharacterCounter extends HTMLInputElement {
  constructor() {
    super();
    this._counter;
  }

  connectedCallback() {
    this._counter = document.createElement("div");
    this._counter.style.fontSize = "11px";

    if (this.getAttribute("maxlength")) {
      this._counter.innerText = `0/${this.getAttribute("maxlength")}`;
    } else {
      this._counter.innerText = `0`;
    }

    this.insertAdjacentElement("afterend", this._counter);
    this.addEventListener("keyup", this._countCharacters);
  }

  _countCharacters(event) {
    if (this.getAttribute("maxlength")) {
      const maxlength = this.getAttribute("maxlength");
      this._counter.innerText = `${event.target.value.length}/${maxlength}`;

      if (maxlength == event.target.value.length) {
        this._counter.style.color = "red";
      }
    } else {
      this._counter.innerHTML = `${event.target.value.length}`;
    }
  }
}

customElements.define("x-character-counter", InputCharacterCounter, {
  extends: "input"
});
