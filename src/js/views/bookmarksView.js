import View from './View';
import previewView from './previewView';
import icons from '../../img/icons.svg';
import previewView from './previewView';
class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet. Find a recipe and bookmark it!';
  _successMSG = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new bookmarksView();
