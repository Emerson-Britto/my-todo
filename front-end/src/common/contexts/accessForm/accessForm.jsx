import { useContext } from 'react';
import * as yup from 'yup';
import { request } from 'common/request';
import { AccessFormContext } from './accessForm-provider';

export function useAccessFormContext(){

	const {
		isSignUp,
		isLoading,
		setIsLoading,
		error,
		setError,
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

// sem redirecionamento;
	const onSubmit = async(data) => {
//		setIsLoading(true);
		if (isSignUp) {
			await request.SignUp(data)
				.then(r => {
				})
				.catch(err => {
					console.log(err);
					setError(true);
				});
		}
		return await request.login(data);
	};

	return {
		signUpSchema,
		logInSchema,
		isSignUp,
		changeForm,
		onSubmit
	}
}
