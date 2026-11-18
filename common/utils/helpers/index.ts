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

export const isGroupedQuestion = (question) =>
  Boolean(question?.isQuestionGroup) ||
  (Array.isArray(question?.childQuestions) && question.childQuestions.length > 0);

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

export const getQuestionId = (question) => question?.id || question?._id;

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

// Chuẩn hoá tên Part/đề lấy từ DB: "Phần 1:Mô Tả Tranh" -> "Phần 1: Mô Tả Tranh", gộp khoảng trắng thừa.
export const formatName = (name?: string) =>
  String(name ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s*:\s*/g, ': ')
    .trim();

// --- Nộp bài: đáp án chỉ có sau khi server chấm ---

const leafKey = (questionId: string, childIndex?: number | null) =>
  `${questionId}#${childIndex === null || childIndex === undefined ? '' : childIndex}`;

/** Gom đáp án đã chọn thành body cho POST /exam/submit. */
export const buildSubmitAnswers = (questions: any[] = []) => {
  const answers: Array<{ questionId: string; childIndex: number | null; answer: string }> = [];
  questions.forEach((question) => {
    const questionId = getQuestionId(question);
    if (!questionId) return;
    if (isGroupedQuestion(question)) {
      (question.childQuestions || []).forEach((child, childIndex) => {
        if (child?.userAnswer?.[0]) {
          answers.push({ questionId, childIndex, answer: child.userAnswer[0] });
        }
      });
    } else if (question?.userAnswer?.[0]) {
      answers.push({ questionId, childIndex: null, answer: question.userAnswer[0] });
    }
  });
  return answers;
};

/** Gắn đáp án đúng và giải thích server trả về vào danh sách câu để màn xem lại hiển thị. */
export const applyAnswerKey = (questions: any[] = [], results: any[] = []) => {
  const byKey = new Map<string, any>();
  (results || []).forEach((result) => byKey.set(leafKey(result.questionId, result.childIndex), result));
  const withKey = (item, result) =>
    result
      ? {
          ...item,
          answer: {
            ...item?.answer,
            texts: result.correctAnswers || [],
            hint: result.hint ?? item?.answer?.hint,
          },
        }
      : item;
  return questions.map((question) => {
    const questionId = getQuestionId(question);
    if (isGroupedQuestion(question)) {
      return {
        ...question,
        childQuestions: (question.childQuestions || []).map((child, childIndex) =>
          withKey(child, byKey.get(leafKey(questionId, childIndex)))
        ),
      };
    }
    return withKey(question, byKey.get(leafKey(questionId, null)));
  });
};

/** Ngược với buildSubmitAnswers: gắn lại đáp án đã lưu (bài làm dở) vào danh sách câu. */
export const applySavedAnswers = (questions: any[] = [], answers: any[] = []) => {
  const byKey = new Map<string, string>();
  (answers || []).forEach((item) => {
    if (item?.questionId && item?.answer) {
      byKey.set(leafKey(item.questionId, item.childIndex), item.answer);
    }
  });
  const withAnswer = (item, answer) => (answer ? { ...item, userAnswer: [answer] } : item);
  return questions.map((question) => {
    const questionId = getQuestionId(question);
    if (isGroupedQuestion(question)) {
      return {
        ...question,
        childQuestions: (question.childQuestions || []).map((child, childIndex) =>
          withAnswer(child, byKey.get(leafKey(questionId, childIndex)))
        ),
      };
    }
    return withAnswer(question, byKey.get(leafKey(questionId, null)));
  });
};

// --- Tìm kiếm ở trang quản trị: không phân biệt hoa thường, không cần gõ dấu, bỏ thẻ HTML ---
export const normalizeSearch = (value: any) =>
  String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const flattenSearchFields = (fields: any[]): any[] =>
  fields.reduce(
    (acc, field) => (Array.isArray(field) ? acc.concat(flattenSearchFields(field)) : acc.concat(field)),
    []
  );

/** Đúng khi mọi từ trong `keyword` đều xuất hiện trong ít nhất một trường. Từ khóa rỗng luôn đúng. */
export const matchesSearch = (keyword: string, ...fields: any[]) => {
  const normalizedKeyword = normalizeSearch(keyword);
  if (!normalizedKeyword) {
    return true;
  }
  const haystack = normalizeSearch(
    flattenSearchFields(fields)
      .filter((field) => field !== null && field !== undefined)
      .join(' ')
  );
  return normalizedKeyword.split(' ').every((word) => haystack.includes(word));
};
