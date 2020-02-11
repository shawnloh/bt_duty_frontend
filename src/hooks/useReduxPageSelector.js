import { useSelector } from 'react-redux';
import { Map } from 'immutable';

function useReduxPageSelector(pages, selector) {
  const state = useSelector(storeState => {
    if (typeof pages === 'string') {
      return storeState.pages[pages].get(selector);
    }
    const foundPage = pages.reduce((storePages, page) => {
      if (storePages && storePages[page] !== 'undefined') {
        return storePages[page];
      }
      return Map();
    }, storeState.pages);

    return foundPage.get(selector);
  });

  return state;
}

export default useReduxPageSelector;
