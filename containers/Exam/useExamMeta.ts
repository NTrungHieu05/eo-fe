import { getListExam } from '@api';
import { useToeicContext } from '@contexts/toeicContext';
import { formatName } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const firstQuery = (value) => (Array.isArray(value) ? value[0] : value);

/** Tên kỹ năng, Part và đề đang làm, lấy theo /study/[topicCode]/[examCode]. */
export const useExamMeta = () => {
  const router = useRouter();
  const topicId = firstQuery(router.query.topicCode);
  const examId = firstQuery(router.query.examCode);
  const { topics } = useToeicContext();
  const [topicData, setTopicData] = useState<any>(null);

  useEffect(() => {
    if (!topicId) {
      return undefined;
    }
    let active = true;
    getListExam(topicId)
      .then((resp: any) => {
        if (active && !resp?.data?.error) {
          setTopicData(resp?.data?.responseData || null);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [topicId]);

  return useMemo(() => {
    const skill = (topics || []).find((item) => (item?.topics || []).some((topic) => topic.topicId === topicId));
    const exam = (topicData?.exams || []).find((item) => item.id === examId);
    return {
      topicId,
      skillName: formatName(skill?.name),
      partName: formatName(topicData?.name),
      examName: formatName(exam?.name),
    };
  }, [topics, topicData, topicId, examId]);
};
