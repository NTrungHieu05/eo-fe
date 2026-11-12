export type ExamSection = 'listening' | 'reading';

export const sectionOf = (question): ExamSection => {
  const part = Number(question?.partNumber);
  if (part >= 1 && part <= 4) {
    return 'listening';
  }
  if (part >= 5 && part <= 7) {
    return 'reading';
  }
  const number = Number(question?.questionNo || question?.childQuestions?.[0]?.questionNo || 0);
  return number > 100 ? 'reading' : 'listening';
};

export const PARTS: Record<number, { title: string; kind: string; section: ExamSection }> = {
  1: { title: 'Part 1', kind: 'Mô tả tranh', section: 'listening' },
  2: { title: 'Part 2', kind: 'Hỏi – đáp', section: 'listening' },
  3: { title: 'Part 3', kind: 'Hội thoại', section: 'listening' },
  4: { title: 'Part 4', kind: 'Bài nói ngắn', section: 'listening' },
  5: { title: 'Part 5', kind: 'Hoàn thành câu', section: 'reading' },
  6: { title: 'Part 6', kind: 'Hoàn thành đoạn văn', section: 'reading' },
  7: { title: 'Part 7', kind: 'Đọc hiểu', section: 'reading' },
};

export const partOf = (question) => {
  const part = Number(question?.partNumber);
  if (part >= 1 && part <= 7) {
    return part;
  }
  return sectionOf(question) === 'listening' ? 1 : 5;
};

export type PaletteItem = {
  key: string;
  questionNo: number;
  questionIndex: number;
  answered: boolean;
};

export type PartGroup = {
  part: number;
  from: number;
  to: number;
  items: PaletteItem[];
};

export const partGroups = (listQuestion: any[] = [], section?: ExamSection): PartGroup[] => {
  const groups: PartGroup[] = [];
  listQuestion.forEach((question, questionIndex) => {
    if (section && sectionOf(question) !== section) {
      return;
    }
    const part = partOf(question);
    let group = groups.find((item) => item.part === part);
    if (!group) {
      group = { part, from: 0, to: 0, items: [] };
      groups.push(group);
    }
    const leaves = question?.isQuestionGroup ? question.childQuestions || [] : [question];
    leaves.forEach((leaf) => {
      const questionNo = Number(leaf?.questionNo);
      if (!questionNo) {
        return;
      }
      group.from = group.from ? Math.min(group.from, questionNo) : questionNo;
      group.to = Math.max(group.to, questionNo);
      group.items.push({
        key: String(leaf?._id || leaf?.id || `${questionIndex}-${questionNo}`),
        questionNo,
        questionIndex,
        answered: leaf?.userAnswer?.length > 0,
      });
    });
  });
  return groups;
};

export type SectionBound = {
  from: number;
  to: number;
  index: number;
};

export const sectionBounds = (listQuestion: any[] = []) => {
  const bounds: Record<ExamSection, SectionBound | null> = {
    listening: null,
    reading: null,
  };
  listQuestion.forEach((question, index) => {
    const section = sectionOf(question);
    const leaves = question?.isQuestionGroup ? question.childQuestions || [] : [question];
    leaves.forEach((leaf) => {
      const number = Number(leaf?.questionNo);
      if (!number) {
        return;
      }
      const current = bounds[section];
      if (!current) {
        bounds[section] = { from: number, to: number, index };
        return;
      }
      current.from = Math.min(current.from, number);
      current.to = Math.max(current.to, number);
    });
  });
  return bounds;
};
