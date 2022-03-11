import React from 'react';
import Styled from 'styled-components';

const Switch = Styled.section`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin: 25px auto;
  width: 180px;
  height: 35px;
  border-radius: 10px;
  cursor: pointer;
`
const SwitchLabel = Styled.p`
	color: #000;
	margin: ${(props) => (props.margin || 0)};
`
const SwitchBtn = Styled.button`
  position: absolute;
  background-color: #3F3D3A;
  border: none;
  width: 100px;
  height: 35px;
  font-size: 1em;
  color: #fff;
  border-radius: 10px;
  box-shadow: 5px 0px 30px rgb(0 0 0 /70%);
  cursor: pointer;
  transition: 400ms;
  ${(props) => (
  	props.isSignUp ? "left: 81px" : "left: 0"
  )};
`

const FormSwitch = ({ isSignUp, onSwitch }) => {

	return (
	  <Switch onClick={onSwitch}>
	    <SwitchLabel margin='0 5px'>Log in</SwitchLabel>
	    <SwitchBtn isSignUp={isSignUp}>{ isSignUp? 'Sign Up' : 'Log In' }</SwitchBtn>
	    <SwitchLabel>Sign up</SwitchLabel>
	  </Switch>
	);
}

export default FormSwitch;
