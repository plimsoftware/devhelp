import React, { useState, useEffect } from 'react';
import EllipsisText from 'react-ellipsis-text';
import { Container } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function Main() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [catSelected, setCatSelected] = useState('');

  useEffect(() => {
    dbInstance.readBT().then((allCategorylists) => {
      setCategories(allCategorylists);
    });
  }, []);

  const handleClick = (topic) => {
    setCategoryName(topic.topictext);
    setCatSelected(topic);
  };

  const handleCancel = () => {
    setCategoryName('');
    setCatSelected('');
  };

  const handleSubmit = () => {
    ipcRenderer.send('updateCategory', {
      _id: catSelected._id,
      topictext: categoryName,
      oldtext: catSelected.topictext,
    });
  };

  return (
    <Container>
      {catSelected === '' ? (
        <>
          <h2>Select category to modify</h2>
          {categories.length !== 0 ? (
            categories.map((topic) => (
              <button
                type="button"
                key={topic._id}
                onClick={() => handleClick(topic)}
              >
                <EllipsisText text={topic.topictext} length={40} />
              </button>
            ))
          ) : (
            <div>Without categories to modify</div>
          )}
        </>
      ) : (
        <>
          <h2>Insert new name</h2>
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.currentTarget.value)}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </>
      )}
    </Container>
  );
}
