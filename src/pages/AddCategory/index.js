import React, { useState } from 'react';
import { Container} from './styled';

const { ipcRenderer } = window.require('electron');


export default function Main() {
const [categoryText, setCategoryText] = useState('');

const handleExit = () => {
    ipcRenderer.send('closeAddCategory', '');
}

const handleSubmit = () => {
    if (categoryText === '') return;
    ipcRenderer.send('addCategory', categoryText);
}
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <label>Insert New Category</label>
                <input autoFocus type="text" onChange={(e) => setCategoryText(e.currentTarget.value)}></input>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleExit}>Cancel</button>
            </form>
        </Container>

    );
}
