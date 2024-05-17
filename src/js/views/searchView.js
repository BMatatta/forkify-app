class SearchView {
  _parentEL = document.querySelector('.search');
  _errorMsg = 'No recipes found for your query. Try again!';
  _successMSG = '';

  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEL.querySelector('.search__field').value = '';
  }

  addHendlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
