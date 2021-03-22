import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { FaEdit, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  BsCardImage,
  BsLink,
  BsListOl,
  BsListUl,
  BsTable,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import { IoLogoJavascript } from 'react-icons/io';
import Proptype from 'prop-types';
import Prism from 'prismjs';
import './prism.css';

import {
  MainContainer,
  Comment,
  Options,
  OptionButton,
  Button,
} from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function DetailTopic({ title, id, topicgroup, setPage }) {
  const [editing, setEditing] = useState(false);
  const [editcomment, setEditComment] = useState(false);
  const [editBT, setEditBT] = useState(false);
  const [currentElement, setCurrentElement] = useState('');
  const [detail, setDetail] = useState([]);
  const [order, setOrder] = useState(0);
  const [currentID, setCurrentID] = useState('');
  const [myType, setMyType] = useState('');
  const [commentText, setCommentText] = useState('');

  const commentRef = useRef();

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

  function handleInsert() {
    setEditing(true);
  }

  const handleDeleteAsk = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'inline');
    e.currentTarget.remove();
  };

  const handleBack = () => {
    setPage('ListTopics');
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
  };

  const handleBold = () => {
    const startPos = commentRef.current.selectionStart;
    const endPos = commentRef.current.selectionEnd;
    const initString = commentText.substring(0, startPos);
    const middleString = commentText.substring(startPos, endPos);
    const restString = commentText.substring(endPos, commentText.length);
    const newValue = `${initString}**${middleString}**${restString}`;
    setCommentText(newValue);
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
            </span>
          ))
        ) : (
          <div>Without comments available</div>
        )}
        {editing && (
          <>
            <Options>
              <OptionButton onClick={handleBold}>
                <BsTypeBold size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeItalic size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeUnderline size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeH1 size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeH2 size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeH3 size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTypeStrikethrough size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsListOl size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsListUl size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsCardImage size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsLink size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <IoLogoJavascript size="15" color="black" />
              </OptionButton>
              <OptionButton>
                <BsTable size="15" color="black" />
              </OptionButton>
            </Options>
            <Comment
              ref={commentRef}
              placeholder="Insert your comment!"
              value={commentText}
              onChange={(e) => setCommentText(e.currentTarget.value)}
            />
            <strong>Preview:</strong>
            <Markdown source={commentText} />
          </>
        )}
      </section>
      <div>
        {editing ? (
          <>
            <span>
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
            </span>
            <span>
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </span>
          </>
        ) : (
          <>
            <span>
              <Button type="button" onClick={() => handleInsert('comment')}>
                Insert Comment
              </Button>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
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
  setPage: Proptype.func.isRequired,
};
