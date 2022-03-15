import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAccessFormContext } from 'common/contexts/accessForm';
import Styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import Istatic from 'common/istatic';
import { FormWrapper, SignUpForm, InputError } from 'components';
import { DataStorage } from 'common/storage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = Styled.form`
	display: flex;
	flex-direction: column;
`
const InputField = Styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 6px 0;
`
const InputLabel = Styled.label`
	width: 330px;
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
	display: ${(props) => (props.show ? "" : "none")};
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
const Loading = Styled.img`
	display: ${(props) => (props.show ? "" : "none")};
	width: 30px;
	margin: 20px auto;
`
const ErrorLog = Styled.h1`
	display: ${(props) => (props.show ? "" : "none")};
	text-align: center;
	padding: 10px 20px;
  border: 2px solid #830000;
  border-radius: 8px;
  background-color: #0f0000;
`

const AccessForm = (props) => {
	const auth = DataStorage.hasToken();
	const {
		isSignUp,
		logInSchema,
		onSubmit,
		requestFailed,
		isLoading
	} = useAccessFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
    	email: '',
    	password: ''
    },
    resolver: yupResolver(logInSchema),
  });

  const onError = err => {
  	console.error(err);
  };

  if (auth) {
  	return <Navigate to="/app/inbox" replace />;
  }

	if (isSignUp) {
		return(
			<SignUpForm/>
		);
	}

	return (
		<FormWrapper>
			<Form onSubmit={handleSubmit(onSubmit, onError)}>
				<InputField>
					<InputLabel htmlFor='input:mail'>Mail</InputLabel>
					<DataInput
						id='input:mail'
						type='email'
						{...register('mail')}
						placeholder='mymail@todo.com'
					/>
					{errors?.mail?.message && <InputError errMsg={errors.mail.message}/>}
				</InputField>
				<InputField>
					<InputLabel htmlFor='input:password'>Password</InputLabel>
					<DataInput
						id='input:password'
						type='password'
						{...register('password')}
					/>
					{errors?.password?.message && <InputError errMsg={errors.password.message}/>}
				</InputField>
				<SubmitBtn show={!isLoading}>Log In</SubmitBtn>
				<Loading
					show={isLoading}
					src={Istatic.animatedSvgUrl('loading-jump_black')}
					alt='loading'
				/>
			</Form>
	    <ErrorLog show={requestFailed}>
	    	{requestFailed}
	    </ErrorLog>
		</FormWrapper>
	);
}

export default AccessForm;
