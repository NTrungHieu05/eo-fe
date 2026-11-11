import API from '../axiosInstance';
import { ENDPOINTS } from '@constants';

const { get, post } = API;

export const getheaderInfo = async () => {
  return get(ENDPOINTS.SKILL_HEADER);
};

export const getListExam = async (id) => {
  return get(`${ENDPOINTS.TOPIC_EXAM}/${id}`);
};

export const getListQuestion = async (id) => {
  return get(`${ENDPOINTS.EXAM_QUESTION}/${id}`);
};

export const getListQuestionMiniTest = async () => {
  return get(ENDPOINTS.MINI_TEST_QUESTION);
};

export const getPracticeTestById = async (id: string) => {
  return get(`${ENDPOINTS.MINI_TEST_QUESTION}/${id}`);
};

export const getListExamAdmin = async () => {
  return get(`${ENDPOINTS.ADMIN_EXAM}`);
};

export const getListSkillAdmin = async () => {
  return get(`${ENDPOINTS.ADMIN_SKILL}`);
};

export const getListTopicAdmin = async () => {
  return get(`${ENDPOINTS.ADMIN_TOPIC}`);
};

export const getListUser = async () => {
  return get(`${ENDPOINTS.ADMIN_USERS}`);
};

export const getAdminListQuestion = async () => {
  return get(`${ENDPOINTS.ADMIN_QUESTION}`);
};

export const postQuestionImport = async (postData: any) => {
  return post(ENDPOINTS.ADMIN_QUESTION_IMPORT, postData);
};

export const postUploadFile = async (postData: any, type = 0) => {
  return post(`${ENDPOINTS.ADMIN_UPLOAD}?type=${type}`, postData);
};
