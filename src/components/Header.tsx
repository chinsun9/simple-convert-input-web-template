import styled from '@emotion/styled';
import React from 'react';

const Style = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 1.6rem;
  box-shadow: 0 1px 0 0 #e5e5e5;
`;

function Header() {
  return (
    <Style>
      <h2>♻️ simple convert input</h2>
    </Style>
  );
}

export default Header;
