import View from './View';
import previewView from './previewView';
import icons from '../../img/icons.svg';
class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found for your query. Try again!';
  _successMSG = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultView();
