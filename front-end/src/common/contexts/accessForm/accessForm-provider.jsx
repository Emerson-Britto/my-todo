import React, { createContext, useState } from 'react';

export const AccessFormContext = createContext();
AccessFormContext.displayName = 'AccessForm';

export default function AccessFormProvider({ children }){
	
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [requestFailed, setRequestFailed] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');


	return (
		<AccessFormContext.Provider value={{
			isSignUp,
			isLoading,
			setIsLoading,
			requestFailed,
			setRequestFailed,
			setIsSignUp,
			mail,
			setMail,
			password,
			setPassword,
			rePassword,
			setRePassword
		}}>
			{ children }
		</AccessFormContext.Provider>
	)
}