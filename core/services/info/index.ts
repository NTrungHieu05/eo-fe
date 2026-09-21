import API from '../axiosInstance';
import { ENDPOINTS } from '@constants';

const { get, post } = API;

export const getheaderInfo = async () => {
  return get(ENDPOINTS.SKILL_HEADER);
};

export const getListExam = async (id) => {
  return get(`${ENDPOINTS.TOPIC_EXAM}/${id}`);
};

export const getListCard = async (id) => {
  return get(`${ENDPOINTS.EXAM_CARD}/${id}`);
};

export const getListCardMiniTest = async () => {
  return get(ENDPOINTS.MINI_TEST_CARD);
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

export const getAdminListCard = async () => {
  return get(`${ENDPOINTS.ADMIN_CARD}`);
};

export const postCardImport = async (postData: any) => {
  return post(ENDPOINTS.ADMIN_CARD_IMPORT, postData);
};

export const postUploadFile = async (postData: any) => {
  return post(ENDPOINTS.ADMIN_UPLOAD, postData);
};
