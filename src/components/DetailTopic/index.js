import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
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
} from 'react-icons/bs';
import { IoIosCloseCircle, IoIosSave, IoLogoJavascript } from 'react-icons/io';
import Proptype from 'prop-types';
import Prism from 'prismjs';
import './prism.css';

import {
  MainContainer,
  Comment,
  Options,
  OptionButton,
  Button,
  SpaceButton,
  OptionsTable,
  OptionsTablecolumn,
  InputTable,
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
  const [commentText, setCommentText] = useState('');
  const [runOnce, setRunOnce] = useState(false);
  const [numColumn, setNumColumn] = useState(1);
  const [numRow, setNumRow] = useState(1);

  const commentRef = useRef();

  let startPos;
  let endPos;
  let initString;
  let middleString;
  let restString;

  const setStartEndValue = () => {
    startPos = commentRef.current.selectionStart;
    endPos = commentRef.current.selectionEnd;
    initString = commentText.substring(0, startPos);
    middleString = commentText.substring(startPos, endPos);
    restString = commentText.substring(endPos, commentText.length);
  };

  useEffect(() => {
    ipcRenderer.on('reload', () => setRunOnce(false));
    Prism.highlightAll();

    if (runOnce === false) {
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
      setRunOnce(true);
    }
  }, [id, detail.length, runOnce]);

  function handleInsert() {
    setEditing(true);
    setTimeout(() => commentRef.current.focus(), 1000);
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
    if (commentText === '') return;

    if (!editcomment) {
      ipcRenderer.send('addTopicComment', {
        text: commentText,
        topicparent: id,
        order: order + 1,
        topicgroup,
        topictype: 'comment',
      });

      setEditing(false);
      setRunOnce(true);
      setCurrentID(0);
      setCommentText('');
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
    setCommentText('');
    setNumColumn(1);
    setNumRow(1);
  };

  const handleBold = () => {
    setStartEndValue();
    const newValue = `${initString}**${middleString}**${restString}`;
    setCommentText(newValue);
  };

  const handleItalic = () => {
    setStartEndValue();
    const newValue = `${initString}*${middleString}*${restString}`;
    setCommentText(newValue);
  };

  const handleH1 = () => {
    setStartEndValue();
    const newValue = `${initString}\n# ${middleString}\n${restString}`;
    setCommentText(newValue);
  };

  const handleH2 = () => {
    setStartEndValue();
    const newValue = `${initString}\n## ${middleString}\n${restString}`;
    setCommentText(newValue);
  };

  const handleH3 = () => {
    setStartEndValue();
    const newValue = `${initString}\n### ${middleString}\n${restString}`;
    setCommentText(newValue);
  };

  const handleStrike = () => {
    setStartEndValue();
    const newValue = `${initString}~~${middleString}~~${restString}`;
    setCommentText(newValue);
  };

  const handleOL = () => {
    setStartEndValue();
    const newValue = `${initString}\n 1. \n 2. \n 3. \n${middleString}${restString}`;
    setCommentText(newValue);
  };

  const handleUL = () => {
    setStartEndValue();
    const newValue = `${initString}\n * \n * \n * \n${middleString}${restString}`;
    setCommentText(newValue);
  };

  const handleJS = () => {
    setStartEndValue();
    const newValue = `${initString}\n \`\`\`js \n\n \`\`\` \n${middleString}${restString}`;
    setCommentText(newValue);
  };

  const handleImage = () => {
    setStartEndValue();
    const newValue = `${initString}\n![alt text](Insert URL to image "Insert image text")\n${middleString}${restString}`;
    setCommentText(newValue);
  };

  const handleLink = () => {
    setStartEndValue();
    const newValue = `${initString}\n[Insert text](Insert URL)\n${middleString}${restString}`;
    setCommentText(newValue);
  };

  const handleTable = () => {
    setStartEndValue();
    let newValue = '\n';

    // Columns
    for (let x = 1; x <= numColumn; x++) {
      if (x === 1) {
        newValue += `|  title ${x}  |`;
      } else {
        newValue += `  title ${x}  |`;
      }
    }

    newValue += '\n';

    // Break
    for (let x = 1; x <= numColumn; x++) {
      if (x === 1) {
        newValue += `|-----------|`;
      } else {
        newValue += `-----------|`;
      }
    }

    newValue += '\n';

    // Rows
    for (let y = 1; y <= numRow; y++) {
      for (let x = 1; x <= numColumn; x++) {
        if (x === 1) {
          newValue += `|   data    |`;
        } else {
          newValue += `   data    |`;
        }
      }
      newValue += '\n';
    }

    const finalValue = `${initString}${newValue}${middleString}${restString}`;
    setCommentText(finalValue);
  };

  const handleClearALL = () => {
    setCommentText('');
    setNumColumn(1);
    setNumRow(1);
    commentRef.current.value = commentText;
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
                  <div id="topic">
                    <ReactMarkdown source={topic.topictext} />
                  </div>
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
              <OptionButton onClick={handleItalic}>
                <BsTypeItalic size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleH1}>
                <BsTypeH1 size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleH2}>
                <BsTypeH2 size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleH3}>
                <BsTypeH3 size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleStrike}>
                <BsTypeStrikethrough size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleOL}>
                <BsListOl size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleUL}>
                <BsListUl size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleImage}>
                <BsCardImage size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleLink}>
                <BsLink size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleJS}>
                <IoLogoJavascript size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleTable}>
                <BsTable size="15" color="black" />
              </OptionButton>
              <OptionsTable>
                <OptionsTablecolumn>
                  Col:
                  <InputTable
                    type="number"
                    value={numColumn}
                    onChange={(e) => {
                      if (e.currentTarget.value < 1) {
                        setNumColumn(1);
                      } else {
                        setNumColumn(e.currentTarget.value);
                      }
                    }}
                  />
                </OptionsTablecolumn>
                <OptionsTablecolumn>
                  Row:
                  <InputTable
                    type="number"
                    value={numRow}
                    onChange={(e) => {
                      if (e.currentTarget.value < 1) {
                        setNumRow(1);
                      } else {
                        setNumRow(e.currentTarget.value);
                      }
                    }}
                  />
                </OptionsTablecolumn>
              </OptionsTable>
              <SpaceButton />
              <OptionButton onClick={handleClearALL}>Clear ALL</OptionButton>
              <OptionButton onClick={handleSave}>
                <IoIosSave size="15" color="black" />
              </OptionButton>
              <OptionButton onClick={handleCancel}>
                <IoIosCloseCircle size="15" color="black" />
              </OptionButton>
            </Options>
            <Comment
              ref={commentRef}
              spellCheck="false"
              placeholder="Insert your comment!"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.currentTarget.value);
                Prism.highlightAll();
              }}
            />
            <strong>Preview:</strong>
            <section>
              <ReactMarkdown source={commentText} />
            </section>
          </>
        )}
      </section>
      <div>
        {editing ? (
          <></>
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
