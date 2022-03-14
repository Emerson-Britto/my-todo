import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { useAccessFormContext } from 'common/contexts/accessForm';
import { FormWrapper, InputError } from 'components';
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

const SignUpForm = () => {
	const { signUpSchema, onSubmit } = useAccessFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
    	email: '',
    	password: '',
    	rePassword: ''
    },
    resolver: yupResolver(signUpSchema),
  });

  // .push('/app/inbox');

  const onError = err => {
  	console.error(err);
  };

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
				<InputField>
					<InputLabel htmlFor='input:password'>Re-Password</InputLabel>
					<DataInput
						id='input:password'
						type='password'
						{...register('rePassword')}
					/>
					{errors?.rePassword?.message && <InputError errMsg={errors.rePassword.message}/>}
				</InputField>
				<SubmitBtn>Sign Up</SubmitBtn>
			</Form>
		</FormWrapper>
	);
}

export default SignUpForm;
