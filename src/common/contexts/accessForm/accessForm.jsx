import { useContext } from 'react';
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

	const changeForm = () => {
		setIsSignUp(current => !current);
	};

	return {
		formData: {
			mail,
			setMail,
			password,
			setPassword,
			rePassword,
			setRePassword
		},
		isSignUp,
		changeForm
	}
}
