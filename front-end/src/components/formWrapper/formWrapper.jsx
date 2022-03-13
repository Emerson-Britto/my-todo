import React from 'react';
import Styled from 'styled-components';
import { useAccessFormContext } from 'common/contexts/accessForm';
import { FormSwitch } from 'components';

const Container = Styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 30vw;
	align-items: center;
	padding: 10px 15px;
  background-color: rgb(0 0 0 /60%);
  border: 2px solid;
  border-image: linear-gradient(135deg, #000, #fff, #000) 1;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin: 10vh auto;
`
const Title = Styled.h1`
	font-weight: bold;
	font-size: 1.5em;
	margin: 15px 0;
`
const SubTitle = Styled.h2`
`

const FormWrapper = ({ children }) => {
	const { isSignUp, changeForm } = useAccessFormContext();

	return (
		<Container>
			<Title>ToDO √</Title>
			<SubTitle>Access Form</SubTitle>
			<FormSwitch isSignUp={isSignUp} onSwitch={changeForm}/>
			{children}
		</Container>
	);
}

export default FormWrapper;
