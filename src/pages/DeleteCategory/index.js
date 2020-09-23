import React, { useState, useEffect } from 'react';
import { Container} from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');


export default function Main() {
const [categories, setCategories] = useState([]);

useEffect(() => {

    dbInstance.readBT()
      .then(allCategorylists => {
        setCategories(allCategorylists);
      })

  }, []);


const handleClick = (category) => {
    ipcRenderer.send('deleteCategory', category);
};

    return (
        <Container>
            <form>
                <h2>Select category to delete</h2>
                <h3><strong>Warning:</strong> All topics will be deleted</h3>
                {categories.length !== 0 ? (
                    categories.map((topic) => (
                        <button type="button" key={topic._id} onClick={() => handleClick(topic)}>{topic.topictext}</button>
                )) ) :
                (
                    <div></div>
                )
                }
            </form>
        </Container>
    );
}
