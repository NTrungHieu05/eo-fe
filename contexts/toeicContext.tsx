import { getheaderInfo } from '@api';
import { PUBLIC_ROUTER, ROUTES } from '@constants';
import Config from '@root/config';
import { reactLocalStorage } from '@utils';
import { isEmpty, isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
interface ToeicContextProps {
  topics: Array<TopicType>;
  topicsFailed: boolean;
  setUserInfos: (data) => void;
  userInfos: any;
}
type TopicItemType = {
  topicId: string;
  topicName: string;
  slug: string;
};
type TopicType = {
  id: string;
  name: string;
  topics: Array<TopicItemType>;
};

export const ToeicContext = React.createContext<ToeicContextProps>({
  topics: [],
  topicsFailed: false,
  userInfos: {},
  setUserInfos: () => {},
});

export const ToeicContextProvider = (props) => {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [topicsFailed, setTopicsFailed] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const fetchHeaderInfo = async () => {
    try {
      const resp = await getheaderInfo();
      const error = resp.data?.error;
      const respData = resp.data?.responseData;
      if (!error && respData) {
        setTopics(respData);
        setTopicsFailed(false);
      } else {
        setTopicsFailed(true);
      }
    } catch (error) {
      setTopicsFailed(true);
    }
  };
  useEffect(() => {
    fetchHeaderInfo();
  }, []);
  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get(Config.AUTH_TOKEN_KEY);
    const UserData = reactLocalStorage.getObject(Config.USER_KEY) || {};
    if (!isEqual(UserData, userInfos)) {
      setUserInfos(UserData);
    }
    if (!PUBLIC_ROUTER.includes(router.pathname) && (!accessToken || isEmpty(UserData))) {
      reactLocalStorage.clear();
      cookies.remove(Config.AUTH_TOKEN_KEY, { path: '/' });
      router.push(ROUTES.WELCOME);
    }
  }, [router.pathname]);
  return (
    <ToeicContext.Provider
      value={{
        topics,
        topicsFailed,
        userInfos,
        setUserInfos,
      }}
    >
      {React.Children.toArray(props.children)}
    </ToeicContext.Provider>
  );
};

export const useToeicContext = () => useContext(ToeicContext);
