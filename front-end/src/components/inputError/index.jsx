import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';

const ErrorWrapper = Styled.section`
  width: 85%;
`
const ErrorText = Styled.p`
  font-size: 1em;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin: 5px 0;
`

const InputError = ({ errMsg }) => {
  return (
    <ErrorWrapper>
      <ErrorText>{ errMsg }</ErrorText>
    </ErrorWrapper>
  );
}

export default InputError;
