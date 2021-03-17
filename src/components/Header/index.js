import React from 'react';

import { Nav, NavHeader, NavLeft, NavRight } from './styled';
import Logo from '../../img/devhelp.png';

export default function Header() {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <img src={Logo} alt="EasyDesk" />
        </NavLeft>
        <NavRight />
      </NavHeader>
    </Nav>
  );
}
