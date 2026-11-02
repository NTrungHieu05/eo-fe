import { forIn, isEmpty } from 'lodash';
import moment from 'moment';
import Config from '@root/config';

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
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      return JSON.parse(window.localStorage[key] || '{}');
    } catch (err) {
      return {};
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

export const isQuestionGroupCard = (card) =>
  Boolean(card?.isQuestionGroup) ||
  (Array.isArray(card?.childCards) && card.childCards.length > 0);

export const sortAnswer = (a, b) => {
  const aValue = String(a ?? '').replace(/["()]/g, '');
  const bValue = String(b ?? '').replace(/["()]/g, '');

  // Compare the values
  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  } else {
    return 0;
  }
};

export const getCardId = (card) => card?.id || card?._id;

export const sameAnswerText = (left?: string, right?: string) => {
  const a = String(left ?? '').trim();
  const b = String(right ?? '').trim();
  return a.length > 0 && a === b;
};

export const answersMatch = (userAnswer?: string[], texts?: string[]) =>
  (texts || []).some((text) => sameAnswerText(userAnswer?.[0], text));

export const isLetterHint = (hint?: string) => /^[A-D]$/i.test(String(hint ?? '').trim());

export const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  const host = (Config.IMAGE_HOST || '').replace(/\/$/, '');
  return `${host}${url.startsWith('/') ? url : `/${url}`}`;
};

/**
 * Same anchors as exam.service.exam.ToeicScore on the backend.
 * 0 correct = 5, 100 correct = 495, step 5. Listening and Reading differ.
 */
const LISTENING_ANCHORS: Array<[number, number]> = [
  [0, 5],
  [10, 45],
  [20, 90],
  [30, 140],
  [40, 190],
  [50, 245],
  [60, 300],
  [70, 355],
  [80, 410],
  [90, 460],
  [95, 485],
  [100, 495],
];

const READING_ANCHORS: Array<[number, number]> = [
  [0, 5],
  [10, 35],
  [20, 75],
  [30, 120],
  [40, 170],
  [50, 220],
  [60, 275],
  [70, 330],
  [80, 390],
  [90, 445],
  [96, 480],
  [100, 495],
];

const scaleSection = (correct: number, anchors: Array<[number, number]>) => {
  const raw = Math.max(0, Math.min(100, Math.round(Number(correct) || 0)));
  if (raw <= anchors[0][0]) return anchors[0][1];
  for (let i = 1; i < anchors.length; i += 1) {
    const [highRaw, highScore] = anchors[i];
    const [lowRaw, lowScore] = anchors[i - 1];
    if (raw <= highRaw) {
      const ratio = (raw - lowRaw) / (highRaw - lowRaw);
      const rounded = Math.round((lowScore + ratio * (highScore - lowScore)) / 5) * 5;
      return Math.max(5, Math.min(495, rounded));
    }
  }
  return 495;
};

export const toeicListeningScore = (correct: number) => scaleSection(correct, LISTENING_ANCHORS);

export const toeicReadingScore = (correct: number) => scaleSection(correct, READING_ANCHORS);

export const toeicSectionScore = toeicListeningScore;

export const toeicTotalScore = (listeningCorrect: number, readingCorrect: number) =>
  toeicListeningScore(listeningCorrect) + toeicReadingScore(readingCorrect);

export const splitFullName = (fullName = '') => {
  const displayName = String(fullName || '').trim();
  const parts = displayName.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { firstName: displayName, lastName: '', displayName };
  }
  return {
    lastName: parts[0],
    firstName: parts.slice(1).join(' '),
    displayName,
  };
};

export const parseDob = (dob) => {
  if (!dob) {
    return null;
  }
  const parsed = moment(dob, ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'], true);
  return parsed.isValid() ? parsed : null;
};
