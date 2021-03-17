import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { FaEdit, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Proptype from 'prop-types';
import Prism from 'prismjs';
import './prism.css';

import { MainContainer } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function DetailTopic({ title, id, topicgroup }) {
  const [editing, setEditing] = useState(false);
  const [editcomment, setEditComment] = useState(false);
  const [editBT, setEditBT] = useState(false);
  const [currentElement, setCurrentElement] = useState('');
  const [detail, setDetail] = useState([]);
  const [order, setOrder] = useState(0);
  const [currentID, setCurrentID] = useState('');
  const [myType, setMyType] = useState('');

  useEffect(() => {
    Prism.highlightAll();

    dbInstance.readTopicDetail(id).then((allTopics) => {
      setDetail(allTopics);
    });

    if (detail.length > 0)
      dbInstance.readTopicMax(id).then((topicMax) => {
        setOrder(Number(topicMax[0].order));
      });

    ipcRenderer.on('editComment', () => {
      setEditBT(true);
    });
  }, [id, detail.length]);

  function handleInsert(type) {
    const commentBox = document.createElement('textarea');
    document.getElementById('detailtopic').appendChild(commentBox);
    setEditing(true);
    setCurrentElement(commentBox);
    setMyType(type);
  }

  const handleDeleteAsk = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'inline');
    e.currentTarget.remove();
  };

  const handleDeleteComment = (comment) => {
    ipcRenderer.send('deleteComment', comment._id);
  };

  const handleEditComment = (comment) => {
    const commentBox = document.createElement('textarea');
    commentBox.value = comment.topictext;
    document.getElementById('detailtopic').appendChild(commentBox);
    setEditing(true);
    setCurrentElement(commentBox);
    setEditComment(true);
    setCurrentID(comment._id);
  };

  const handleEditUp = (comment) => {
    dbInstance.upComment(comment).then((topic) => {
      let lastComment;

      if (topic !== null) {
        lastComment = topic._id;
      } else {
        lastComment = null;
      }

      if (lastComment !== null)
        ipcRenderer.send('upTopicComment', {
          lastComment,
          actualComment: comment._id,
          order: comment.order,
        });
    });
  };

  const handleEditDown = (comment) => {
    dbInstance.downComment(comment).then((topic) => {
      let nextComment;

      if (topic !== null) {
        nextComment = topic._id;
      } else {
        nextComment = null;
      }

      if (nextComment !== null)
        ipcRenderer.send('downTopicComment', {
          nextComment,
          actualComment: comment._id,
          order: comment.order,
        });
    });
  };

  const handleSave = () => {
    if (!editcomment) {
      ipcRenderer.send('addTopicComment', {
        text: currentElement.value,
        topicparent: id,
        order: order + 1,
        topicgroup,
        topictype: myType,
      });
    } else {
      ipcRenderer.send('updateComment', {
        topictext: currentElement.value,
        _id: currentID,
      });
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setCurrentID(0);
    currentElement.remove();
  };

  return (
    <MainContainer>
      <h1>{topicgroup}</h1>
      <h2>{title}</h2>
      <section id="detailtopic">
        {detail.length !== 0 ? (
          detail.map((topic) => (
            <span key={topic._id}>
              {topic.topictype === 'comment' && (
                <section>
                  <Markdown source={topic.topictext} />
                  {editBT && (
                    <>
                      <FaArrowUp
                        size="10"
                        color="yellow"
                        title="Move Up"
                        cursor="pointer"
                        onClick={() => handleEditUp(topic)}
                      />
                      <FaArrowDown
                        size="10"
                        color="yellow"
                        title="Move Down"
                        cursor="pointer"
                        onClick={() => handleEditDown(topic)}
                      />
                      <FaEdit
                        size="10"
                        color="yellow"
                        title="Modify"
                        cursor="pointer"
                        onClick={() => handleEditComment(topic)}
                      />
                      <FaTimesCircle
                        size="10"
                        color="yellow"
                        title="Delete"
                        cursor="pointer"
                        onClick={handleDeleteAsk}
                      />
                      <FaTimesCircle
                        size="10"
                        color="red"
                        title="Confirm Delete"
                        display="none"
                        cursor="pointer"
                        onClick={() => handleDeleteComment(topic)}
                      />
                    </>
                  )}
                </section>
              )}
              {(topic.topictype === 'code' ||
                topic.topictype === 'code js') && (
                <div>
                  <pre>
                    <code className="language-javascript">
                      {topic.topictext}
                    </code>
                  </pre>
                  {editBT && (
                    <>
                      <FaArrowUp
                        size="10"
                        color="yellow"
                        title="Move Up"
                        cursor="pointer"
                        onClick={() => handleEditUp(topic)}
                      />
                      <FaArrowDown
                        size="10"
                        color="yellow"
                        title="Move Down"
                        cursor="pointer"
                        onClick={() => handleEditDown(topic)}
                      />
                      <FaEdit
                        size="10"
                        color="yellow"
                        title="Modify"
                        cursor="pointer"
                        onClick={() => handleEditComment(topic)}
                      />
                      <FaTimesCircle
                        size="10"
                        color="yellow"
                        title="Delete"
                        cursor="pointer"
                        onClick={handleDeleteAsk}
                      />
                      <FaTimesCircle
                        size="10"
                        color="red"
                        title="Confirm Delete"
                        display="none"
                        cursor="pointer"
                        onClick={() => handleDeleteComment(topic)}
                      />
                    </>
                  )}
                </div>
              )}
              {topic.topictype === 'code css' && (
                <div>
                  <pre>
                    <code className="language-css">{topic.topictext}</code>
                  </pre>
                  {editBT && (
                    <>
                      <FaArrowUp
                        size="10"
                        color="yellow"
                        title="Move Up"
                        cursor="pointer"
                        onClick={() => handleEditUp(topic)}
                      />
                      <FaArrowDown
                        size="10"
                        color="yellow"
                        title="Move Down"
                        cursor="pointer"
                        onClick={() => handleEditDown(topic)}
                      />
                      <FaEdit
                        size="10"
                        color="yellow"
                        title="Modify"
                        cursor="pointer"
                        onClick={() => handleEditComment(topic)}
                      />
                      <FaTimesCircle
                        size="10"
                        color="yellow"
                        title="Delete"
                        cursor="pointer"
                        onClick={handleDeleteAsk}
                      />
                      <FaTimesCircle
                        size="10"
                        color="red"
                        title="Confirm Delete"
                        display="none"
                        cursor="pointer"
                        onClick={() => handleDeleteComment(topic)}
                      />
                    </>
                  )}
                </div>
              )}
              {topic.topictype === 'code html' && (
                <div>
                  <pre>
                    <code className="language-html">{topic.topictext}</code>
                  </pre>
                  {editBT && (
                    <>
                      <FaArrowUp
                        size="10"
                        color="yellow"
                        title="Move Up"
                        cursor="pointer"
                        onClick={() => handleEditUp(topic)}
                      />
                      <FaArrowDown
                        size="10"
                        color="yellow"
                        title="Move Down"
                        cursor="pointer"
                        onClick={() => handleEditDown(topic)}
                      />
                      <FaEdit
                        size="10"
                        color="yellow"
                        title="Modify"
                        cursor="pointer"
                        onClick={() => handleEditComment(topic)}
                      />
                      <FaTimesCircle
                        size="10"
                        color="yellow"
                        title="Delete"
                        cursor="pointer"
                        onClick={handleDeleteAsk}
                      />
                      <FaTimesCircle
                        size="10"
                        color="red"
                        title="Confirm Delete"
                        display="none"
                        cursor="pointer"
                        onClick={() => handleDeleteComment(topic)}
                      />
                    </>
                  )}
                </div>
              )}
              {topic.topictype === 'code json' && (
                <div>
                  <pre>
                    <code className="language-json">{topic.topictext}</code>
                  </pre>
                  {editBT && (
                    <>
                      <FaArrowUp
                        size="10"
                        color="yellow"
                        title="Move Up"
                        cursor="pointer"
                        onClick={() => handleEditUp(topic)}
                      />
                      <FaArrowDown
                        size="10"
                        color="yellow"
                        title="Move Down"
                        cursor="pointer"
                        onClick={() => handleEditDown(topic)}
                      />
                      <FaEdit
                        size="10"
                        color="yellow"
                        title="Modify"
                        cursor="pointer"
                        onClick={() => handleEditComment(topic)}
                      />
                      <FaTimesCircle
                        size="10"
                        color="yellow"
                        title="Delete"
                        cursor="pointer"
                        onClick={handleDeleteAsk}
                      />
                      <FaTimesCircle
                        size="10"
                        color="red"
                        title="Confirm Delete"
                        display="none"
                        cursor="pointer"
                        onClick={() => handleDeleteComment(topic)}
                      />
                    </>
                  )}
                </div>
              )}
            </span>
          ))
        ) : (
          <div>Without comments available</div>
        )}
      </section>
      <div>
        {editing ? (
          <>
            <span>
              <button type="button" onClick={handleSave}>
                Save
              </button>
            </span>
            <span>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </span>
          </>
        ) : (
          <>
            <span>
              <button type="button" onClick={() => handleInsert('comment')}>
                Insert Comment
              </button>
            </span>
            <span>
              <button
                type="button"
                className="midButton"
                onClick={() => handleInsert('code js')}
              >
                Insert Code JavaScript
              </button>
            </span>
            <span>
              <button
                type="button"
                className="midButton"
                onClick={() => handleInsert('code css')}
              >
                Insert Code CSS
              </button>
            </span>
            <span>
              <button
                type="button"
                className="midButton"
                onClick={() => handleInsert('code html')}
              >
                Insert Code HTML
              </button>
            </span>
            <span>
              <button
                type="button"
                className="midButton"
                onClick={() => handleInsert('code json')}
              >
                Insert Code JSON
              </button>
            </span>
          </>
        )}
      </div>
    </MainContainer>
  );
}

DetailTopic.propTypes = {
  title: Proptype.string.isRequired,
  id: Proptype.string.isRequired,
  topicgroup: Proptype.string.isRequired,
};
