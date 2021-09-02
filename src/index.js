import './styles.css';

import '@pnotify/core/dist/BrightTheme.css';

import debounce from 'lodash.debounce';
import searchService from './js/search-service';
import refs from './js/refs';

refs.searchInput.addEventListener(
  'input',
  debounce(() => {
    searchService.fetch();
  }, 500),
);
