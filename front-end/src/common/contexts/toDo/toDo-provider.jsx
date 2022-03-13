import React, { createContext, useState } from 'react';

export const ToDoContext = createContext();
ToDoContext.displayName = 'ToDo';

export default function ToDoProvider({ children }){
	const [toDos, setToDos] = useState([]);
	const [taskEditorInline, setTaskEditorInline] = useState(false);

	return (
		<ToDoContext.Provider value={{
			toDos,
			setToDos,
			taskEditorInline,
			setTaskEditorInline
		}}>
			{ children }
		</ToDoContext.Provider>
	)
}