import React, { useState } from 'react';
import { Container} from './styled';

const { ipcRenderer } = window.require('electron');


export default function Main() {
const [topicText, setTopicText] = useState('');

const handleExit = () => {
    ipcRenderer.send('closeAddTopic', '');
}

const handleSubmit = () => {
    if (topicText === '') return;
    ipcRenderer.send('addTopic', topicText);
}
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <label>Insert New Topic</label>
                <input autoFocus type="text" onChange={(e) => setTopicText(e.currentTarget.value)}></input>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleExit}>Cancel</button>
            </form>
        </Container>

    );
}
