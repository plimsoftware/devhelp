import React, { useState } from 'react';

import { Container} from './styled';
import Menu from '../../components/Menu';
import ListCases from '../../components/ListCases';
import Header from '../../components/Header';

export default function Main() {
    const [currentPage, setCurrentPage] = useState('Home');

    return (
        <Container>
        <Header />
            <div className="split left">
                <div className="centered">
                    <Menu setPage={(page) => setCurrentPage(page)} />
                </div>
            </div>
            <div className="split right">
                {currentPage === 'Home'? <ListCases /> : <></>}
            </div>
        </Container>

    );
}
