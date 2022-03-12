import { useContext } from 'react';
import faker from 'faker';
import { ToDoContext } from './toDo-provider';

export function useToDoContext(){

	const {
		toDos,
		setToDos
	} = useContext(ToDoContext);


// =============================================================


	const updateTask = (id, data) => {
		let newList = [...toDos];
		let toDoIndex = toDos.findIndex(td => td.id === id);
		newList[toDoIndex] = {
			...newList[toDoIndex],
			...data
		};
		setToDos(newList);
		return;
	}

	const addTask = data => {
		const createAt = new Date();
		data['id'] = faker.datatype.uuid();
		data['createAt'] = createAt.toLocaleDateString();
		setToDos(currentToDos => [...currentToDos, data]);
	};

	return {
		toDos,
		updateTask,
		addTask
	}
}