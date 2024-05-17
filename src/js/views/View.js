import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * Kako pisat dokumentaciju
   *
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] bracketi znači da je opcionalno - if false create markup string instead of rendering to the DOM
   * @returns  {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Bruno
   * @todo do something
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //Konventira string koji imamo u markapu u objekt DOM-a
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // isEqualNode uzima dva DOM elementa i uspoređuje imaju li ista svojstva
      // Node.nodeValue daje content texta ako se u njemu nalazi teks, inace je null

      //Mjenjanje samo teksta
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //Mjenjanje atributa
      if (!newEl.isEqualNode(currEl)) {
        //.atributes vraća sve atribute nodea, ovdje mjenjamo sve attribute starog nodea sa novim
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMsg) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(message = this._successMSG) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="src/img/${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
