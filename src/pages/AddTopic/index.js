import React, { useState } from 'react';
import { Container} from './styled';

const { ipcRenderer } = window.require('electron');

export default function Main() {
    const [topicText, setTopicText] = useState('');

const handleExit = () => {
    ipcRenderer.send('closeAddTopic', '');
}

const handleSubmit = (topicTitle) => {
    ipcRenderer.send('addTopic', topicText);
}
    return (
        <Container>
            <label>Insert New Topic</label>
            <input type="text" onChange={(e) => setTopicText(e.currentTarget.value)}></input>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={handleExit}>Cancel</button>
        </Container>

    );
}
