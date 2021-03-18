import React, { useState, useEffect } from 'react';

import { Container } from './styled';
import DetailCategoryDelete from '../../components/DetailCategoryDelete';

const { remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function Main() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dbInstance.readBT().then((allCategorylists) => {
      setCategories(allCategorylists);
    });
  }, []);

  return (
    <Container>
      <form>
        <h2>Select category to delete</h2>
        <h3>
          <strong>Warning:</strong> All topics will be deleted
        </h3>
        {categories.length !== 0 ? (
          categories.map((topic) => <DetailCategoryDelete topic={topic} />)
        ) : (
          <div>Without categories to delete</div>
        )}
      </form>
    </Container>
  );
}
