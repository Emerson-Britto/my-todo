import { useContext } from 'react';
import * as yup from 'yup';
import { AccessFormContext } from './accessForm-provider';

export function useAccessFormContext(){

	const {
		isSignUp,
		setIsSignUp,
		mail,
		setMail,
		password,
		setPassword,
		rePassword,
		setRePassword
	} = useContext(AccessFormContext);


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
	    .required()
	    .matches(password, "password no matches")
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

	const onSubmit = data => {
		console.log({ data });
	};

	return {
		signUpSchema,
		logInSchema,
		isSignUp,
		changeForm,
		onSubmit
	}
}
