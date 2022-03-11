import React/*, { useState, useEffect }*/ from 'react';
import { useAccessFormContext } from 'common/contexts/accessForm';
import Styled from 'styled-components';
import { FormWrapper } from 'components';

const Form = Styled.form`
	display: flex;
	flex-direction: column;
`
const InputField = Styled.div`
	display: flex;
	flex-direction: column;
	margin: 6px 0;
`
const InputLabel = Styled.label`
	margin: 10px 0;
`
const DataInput = Styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid #404250;
  color: #fff;
  padding: 0 10px;
  border-radius: 10px;
  width: 330px;
  height: 25px;
  :focus {
	  border-bottom: 2px solid #858586;
	}
`
const SubmitBtn = Styled.button`
  margin: 20px 0;
  border: none;
  cursor: pointer;
  color: #e0dfde;
  font-size: 1.1em;
  background-color: transparent;
  padding: 5px 10px;
  border: 2px solid #e0dfde;
  transition: 300ms;
	:hover {
	  background-color: #e0dfde;
	  color: #000;
	}
`

const AccessForm = (props) => {
	const { isSignUp, formData } = useAccessFormContext();

	if (isSignUp) {
		return(
		<FormWrapper>
			<Form>
				<InputField>
					<InputLabel htmlFor='input:mail'>E-mail</InputLabel>
					<DataInput
						id='input:mail'
						type='email'
						value={formData.mail}
						onChange={(e)=> formData.setMail(e.target.value)}
						placeholder='mymail@todo.com'
					/>
				</InputField>
				<InputField>
					<InputLabel htmlFor='input:password'>Password</InputLabel>
					<DataInput
						id='input:password'
						type='password'
						value={formData.password}
						onChange={(e)=> formData.setPassword(e.target.value)}
					/>
				</InputField>
				<InputField>
					<InputLabel htmlFor='input:password'>Re-Password</InputLabel>
					<DataInput
						id='input:password'
						type='password'
						value={formData.rePassword}
						onChange={(e)=> formData.setRePassword(e.target.value)}
					/>
				</InputField>
				<SubmitBtn>Sign Up</SubmitBtn>
			</Form>
		</FormWrapper>
		);
	}

	return (
		<FormWrapper>
			<Form>
				<InputField>
					<InputLabel htmlFor='input:mail'>E-mail</InputLabel>
					<DataInput
						id='input:mail'
						type='email'
						value={formData.mail}
						onChange={(e)=> formData.setMail(e.target.value)}
						placeholder='mymail@todo.com'
					/>
				</InputField>
				<InputField>
					<InputLabel htmlFor='input:password'>Password</InputLabel>
					<DataInput
						id='input:password'
						type='password'
						value={formData.password}
						onChange={(e)=> formData.setPassword(e.target.value)}
					/>
				</InputField>
				<SubmitBtn>Log In</SubmitBtn>
			</Form>
		</FormWrapper>
	);
}

export default AccessForm;
