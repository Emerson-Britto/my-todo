import React, { createContext, useState } from 'react';

export const AccessFormContext = createContext();
AccessFormContext.displayName = 'AccessForm';

export default function AccessFormProvider({ children }){
	
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');


	return (
		<AccessFormContext.Provider value={{
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
		}}>
			{ children }
		</AccessFormContext.Provider>
	)
}