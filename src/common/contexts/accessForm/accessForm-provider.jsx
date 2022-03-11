import React, { createContext, useState } from 'react';

export const AccessFormContext = createContext();
AccessFormContext.displayName = 'AccessForm';

export default function AccessFormProvider({ children }){
	
	const [isSignUp, setIsSignUp] = useState(true);
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');


	return (
		<AccessFormContext.Provider value={{
			isSignUp,
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