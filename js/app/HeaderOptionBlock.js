class HeaderOptionBlock {
    constructor(text, value = null) {
        this._html = document.createElement('option');
        this._html.innerHTML = text;
        if (value !== null) this._html.value = value;
        else this._html.value = text;
    }

    get html() {
        return this._html;
    }

}
export default HeaderOptionBlock;