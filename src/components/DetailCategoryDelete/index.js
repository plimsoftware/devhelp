import React, { useState } from 'react';
import EllipsisText from 'react-ellipsis-text';
import Proptype from 'prop-types';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function DetailCategoryDelete({ topic }) {
  const [askDelete, setAskDelete] = useState(false);

  const askDeleteCat = () => {};

  const handleClick = (category) => {
    ipcRenderer.send('deleteCategory', category);
  };

  return (
    <button type="button" key={topic._id} onClick={() => handleClick(topic)}>
      <EllipsisText text={topic.topictext} length={40} />
    </button>
  );
}

DetailCategoryDelete.propTypes = {
  topic: Proptype.shape({
    topictext: Proptype.string,
    _id: Proptype.string,
  }).isRequired,
};
