import React, { useState, useEffect } from 'react';
import { FaEdit, FaTimesCircle } from 'react-icons/fa';

import { MainContainer } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function DetailTopic({ title, id, topicgroup }) {
  const [editing, setEditing] = useState(false);
  const [editcomment, setEditComment] = useState(false);
  const [editBT, setEditBT] = useState(false);
  const [currentElement, setCurrentElement] = useState('');
  const [detail, setDetail] = useState([]);
  const [order, setOrder] = useState(1);
  const [currentID, setCurrentID] = useState('');

  useEffect(() => {

    dbInstance.readTopicDetail(id)
      .then(allTopics => {
        setDetail(allTopics);
    });

    if (detail.length > 0 ) dbInstance.readTopicMax(id)
      .then(topicMax => {
        setOrder(Number(topicMax[0].order) + 1);
    });

    ipcRenderer.on('editComment', (event, arg) => {
      setEditBT(true);
    });

  }, [id, detail.length]);


  const handleInsertComment = ()=> {
    const commentBox = document.createElement('textarea');
    document.getElementById('detailtopic').appendChild(commentBox);
    setEditing(true);
    setCurrentElement(commentBox);
  };

  const handleInsertCode = ()=> {};

  const handleDeleteComment = (comment) => {
    ipcRenderer.send('deleteComment', comment._id);
  }

  const handleEditComment = (comment) => {
    const commentBox = document.createElement('textarea');
    commentBox.value = comment.topictext;
    document.getElementById('detailtopic').appendChild(commentBox);
    setEditing(true);
    setCurrentElement(commentBox);
    setEditComment(true);
    setCurrentID(comment._id);
  }

  const handleSave = ()=> {
    if (!editcomment){
      ipcRenderer.send('addTopicComment', {
        text: currentElement.value,
        topicparent: id,
        order: order,
        topicgroup: topicgroup
      });
    } else {
      ipcRenderer.send('updateComment', {
        topictext: currentElement.value,
        _id: currentID
      });
    }
  };

  const handleCancel = ()=> {
    setEditing(false);
    currentElement.remove();
  };
  
    return (
      <MainContainer>
        <h1>{title}</h1>
        <section id="detailtopic">
          {detail.length !== 0 ? (
              detail.map((topic) => (
                <span>
                  <p key={topic._id}>{topic.topictext}  {editBT && 
                  <>
                    <FaEdit size="10" color="yellow" title="Modify" cursor="pointer" onClick={() => handleEditComment(topic)} />
                    <FaTimesCircle size="10" color="yellow" title="Delete" cursor="pointer" onClick={() => handleDeleteComment(topic)}/>
                  </>}</p>
                </span>
              )) ) :
            (
              <div></div>
            )
          }
        </section>
        <div>
        {editing ? (
          <>
            <span><button type="button" onClick={handleSave}>Save</button></span>
            <span><button type="button" onClick={handleCancel}>Cancel</button></span>
          </>
        ):(
          <>
            <span><button type="button" onClick={handleInsertComment}>Insert Comment</button></span>
            <span><button type="button" onClick={handleInsertCode}>Insert Code</button></span>
          </>
        )}
        
        </div>
      </MainContainer>
    );
}
