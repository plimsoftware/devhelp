import React, { useState } from 'react';

import { Container} from './styled';
import Menu from '../../components/Menu';
import Welcome from '../../components/Welcome';
import ListTopics from '../../components/ListTopics';
import DetailTopic from '../../components/DetailTopic';
import Header from '../../components/Header';

export default function Main() {
    const [currentPage, setCurrentPage] = useState('Home');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    return (
        <Container>
        <Header />
            <div className="split left">
                <div className="centered">
                    <Menu setPage={(page) => setCurrentPage(page)} setCategory={(category) => setCategory(category)}/>
                </div>
            </div>
            <div className="split right">
                {currentPage === 'Home'? <Welcome /> : <></>}
                {currentPage === 'ListTopics'? <ListTopics
                    category={category}
                    setPage={(page) => setCurrentPage(page)}
                    setTitle={(title) => setTitle(title)}
                    />
                     : <></>}
                {currentPage === 'DetailTopic'? <DetailTopic category={category} title={title} setPage={(page) => setCurrentPage(page)}/> : <></>}
            </div>
        </Container>

    );
}
