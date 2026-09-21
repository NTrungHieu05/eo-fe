import { Progress } from 'antd';
import React, { useEffect, useState } from 'react';

export default function TopicListView() {
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    setListTopic([
      {
        id: '614be5e065d71f3a51f67194',
        name: 'PART 1: PHOTOS',
        description: 'Topic 1 description',
        percent: 15,
      },
      {
        id: '614be5ef65d71f3a51f67195',
        name: 'PART 2: QUESTION- RESPONSE',
        description: 'Topic 2 description',
        percent: 8,
      },
      {
        id: '61123a8c1e6e0c7cbe1059c4',
        name: 'PART 3: CONVERSATIONS',
        description: 'Topic 3 description',
        percent: 4,
      },
      {
        id: '6135c39d08e2737191f34a96',
        name: 'PART 4: SHORT TALKS',
        description: 'Topic 4 description',
        percent: 0,
      },
    ]);
  }, []);
  return (
    <div className="sub-topic-list-container-bot" style={{ marginTop: 50 }}>
      <div id="sub-topic-list" className="sub-topic-grid-view">
        {listTopic.map((topic) => (
          <div id={topic.id} className="sub-topic-item sub-active">
            <div className="sub-topic-item-header">
              <div className="sub-topic-item-name dot-1">{topic.name}</div>
            </div>
            <div className="sub-topic-progress">
              <Progress percent={topic.percent} strokeColor={'#4CAF50'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
