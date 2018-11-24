import React from 'react';
import { css } from 'emotion'

const getLayout = index => {
  return css`
    flex: 1 0 ${index === 0 ? '100%' : '400px'};
  `;
}

const theme = (() => {
  const calculatePadding = n => n * 24;
  return {
    calcPadding: (n = 1) => calculatePadding(n),
  }
})();

const containerStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: ${1128 + theme.calcPadding(2)}px;
  margin: 0 auto;
  padding: 0 ${theme.calcPadding()}px
`;

export const BlogArchiveLayout = props => {
  const { children } = props;


  return (
    <div className={containerStyle}>
      {children({getLayout})}
    </div>
  )
}
