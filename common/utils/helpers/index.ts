import { forIn, isEmpty } from 'lodash';

export const reactLocalStorage = {
  set: function (key: any, value: any) {
    window.localStorage[key] = value;
    return window.localStorage[key];
  },
  get: function (key: any, defaultValue: any) {
    return window.localStorage[key] || defaultValue;
  },
  setObject: function (key: any, value: any) {
    window.localStorage[key] = JSON.stringify(value);
    return window.localStorage[key];
  },
  getObject: function (key: any) {
    if (typeof window !== 'undefined') {
      return JSON.parse(window?.localStorage[key] || '{}');
    }
  },
  getArray: function (key: any) {
    if (typeof window !== 'undefined') {
      return JSON.parse(window?.localStorage[key] || '[]');
    }
  },
  clear: function () {
    forIn(window.localStorage, (value: string, objKey: string) => {
      if (objKey.startsWith('toeic-')) {
        window.localStorage.removeItem(objKey);
      }
    });
    return;
  },
  removeItem: function (key: any) {
    return window.localStorage.removeItem(key);
  },
};

export const getUrlParameter = (name: string, currentLocation: string) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(currentLocation || location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export function buildUrlWithParams(url, params, removeEncode?: boolean) {
  let ret = '';
  if (isEmpty(params)) return url;
  url += '?';
  for (var d in params) {
    if (params[d] || params[d] === 0) {
      if (removeEncode) {
        ret += d + '=' + params[d] + '&';
      } else {
        // if (isArray(params[d])) {
        //   forEach(params[d], (item) => {
        //     ret += encodeURIComponent(d) + '=' + encodeURIComponent(item) + '&';
        //   });
        // } else {
        ret += encodeURIComponent(d) + '=' + encodeURIComponent(params[d]) + '&';
        // }
      }
    }
  }
  ret = ret.replace(/&$/, '');
  return url + ret;
}

export const sortAnswer = (a, b) => {
  // Remove the double quotes and parentheses from the values for comparison
  const aValue = a.replace(/["()]/g, '');
  const bValue = b.replace(/["()]/g, '');

  // Compare the values
  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  } else {
    return 0;
  }
};
