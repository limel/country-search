import refs from './refs';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import postTmpl from '../template/postTmpl.hbs';
defaultModules.set(PNotifyMobile, {});

export default {
  input: refs.searchInput,
  output: refs.output,
  options: {
    title: 'Very many matches pls enter a full name of a country',
    text: 'Something terrible happened.',
    styling: 'brighttheme',
    mouseReset: 'true',
    type: 'error',
    sticker: false,
    animation: 'fade',
    animateSpeed: '400ms',
  },
  get value() {
    return this.input.value;
  },
  fetch() {
    const url = `https://restcountries.eu/rest/v2/name/${this.value}`;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        switch (true) {
          case data.length === 1:
            this.output.innerHTML = '';
            console.log(...data);
            const markupPost = postTmpl(...data);
            this.output.insertAdjacentHTML('beforeend', markupPost);
            break;
          case data.length <= 10:
            console.log('найдено меньше 10 стран ');
            break;
          default:
            this.callError();
            break;
        }
      })
      .catch(error => {
        // return alert(options);
      });
  },
  callError() {
    alert(this.options);
  },
};
function renderMarkup(hits) {
  const markup = template(hits);
  refs.container.insertAdjacentHTML('beforeend', markup);
}
