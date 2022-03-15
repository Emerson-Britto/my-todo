import React, { createContext, useState } from 'react';

export const ToDoContext = createContext();
ToDoContext.displayName = 'ToDo';

export default function ToDoProvider({ children }){
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [taskEditorInline, setTaskEditorInline] = useState(false);

	return (
		<ToDoContext.Provider value={{
			toDos,
			setToDos,
			isLoading,
			setIsLoading,
			taskEditorInline,
			setTaskEditorInline
		}}>
			{ children }
		</ToDoContext.Provider>
	)
}