import { useContext, useEffect } from 'react';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { DataStorage } from 'common/storage';
import { request } from 'common/request';
import { AccessFormContext } from './accessForm-provider';

export function useAccessFormContext(){

	const {
		isSignUp,
		isLoading,
		setIsLoading,
		requestFailed,
		setRequestFailed,
		setIsSignUp,
		password,
		setPassword,
		rePassword,
		setRePassword
	} = useContext(AccessFormContext);
	const navigate = useNavigate();


// =============================================================

	const signUpSchema = yup.object({
	  mail: yup.string().email().required(),
	  password: yup
	    .string()
	    .required()
	    .matches(
	      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/,
	      `Mininus one uppercase and lowercase letter, one number and special character`
	    )
	    .matches(rePassword, "password no matches")
	    .min(8),
	  rePassword: yup
	    .string()
	    .oneOf([yup.ref('password'), null], 'Passwords must match')
	    .required()
	    .min(8)
	});

	const logInSchema = yup.object({
	  mail: yup.string().email().required(),
	  password: yup
	    .string()
	    .required()
	    .matches(
	      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/,
	      "Mininus one uppercase and lowercase letter, one number and special character"
	    )
	    .min(8)
	});

	const changeForm = () => {
		setIsSignUp(current => !current);
	};

	const onSubmit = async(data) => {
		setIsLoading(true);
		try {
			if (isSignUp) {
				await request.SignUp({newUser: data})
			}
			const res = await request.login(data)
			if (res.status === 200) {
				setIsLoading(false);
				navigate('/app/inbox');
			}
		} catch(err) {
			console.error(err.response.data.error.msg);
			setRequestFailed(err.response.data.error.msg);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(()=>{
		setTimeout(()=> {setRequestFailed('')} , 6000);
	},[requestFailed]);

	return {
		signUpSchema,
		logInSchema,
		isSignUp,
		changeForm,
		onSubmit,
		requestFailed,
		isLoading
	}
}

//{
//  "mail": "emersonb987@gmail.com",
//  "password": "#A3hjkk%vb89#"
//}