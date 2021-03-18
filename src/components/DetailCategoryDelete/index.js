import React, { useState } from 'react';
import EllipsisText from 'react-ellipsis-text';
import Proptype from 'prop-types';

import { Button, ButtonConfirm } from './styled';

const { ipcRenderer } = window.require('electron');
export default function DetailCategoryDelete({ topic }) {
  const [askDelete, setAskDelete] = useState(false);

  const askDeleteCat = () => {
    setAskDelete(true);
  };

  const handleClick = (category) => {
    ipcRenderer.send('deleteCategory', category);
  };

  return askDelete === false ? (
    <Button type="button" key={topic._id} onClick={askDeleteCat}>
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

DetailCategoryDelete.propTypes = {
  topic: Proptype.shape({
    topictext: Proptype.string,
    _id: Proptype.string,
  }).isRequired,
};
