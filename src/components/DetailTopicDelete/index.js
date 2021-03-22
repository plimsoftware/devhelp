import React, { useState } from 'react';
import EllipsisText from 'react-ellipsis-text';
import Proptype from 'prop-types';

import { Button, ButtonConfirm } from './styled';

const { ipcRenderer } = window.require('electron');
export default function DetailTopicDelete({ topic }) {
  const [askDelete, setAskDelete] = useState(false);

  const askDeleteTop = () => {
    setAskDelete(true);
  };

  const handleClick = (_id) => {
    ipcRenderer.send('deleteTopic', _id);
  };

  return askDelete === false ? (
    <Button type="button" key={topic._id} onClick={askDeleteTop}>
      <EllipsisText text={topic.topictext} length={50} />
    </Button>
  ) : (
    <ButtonConfirm
      type="button"
      key={topic._id}
      onClick={() => handleClick(topic)}
    >
      <EllipsisText text={topic.topictext} length={50} />
    </ButtonConfirm>
  );
}

DetailTopicDelete.propTypes = {
  topic: Proptype.shape({
    topictext: Proptype.string,
    _id: Proptype.string,
  }).isRequired,
};
