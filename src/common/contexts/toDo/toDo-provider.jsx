import React, { createContext, useState } from 'react';

export const ToDoContext = createContext();
ToDoContext.displayName = 'ToDo';

export default function ToDoProvider({ children }){
	const [toDos, setToDos] = useState([]);

	return (
		<ToDoContext.Provider value={{
			toDos,
			setToDos
		}}>
			{ children }
		</ToDoContext.Provider>
	)
}