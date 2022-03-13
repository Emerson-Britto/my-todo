import { useContext } from 'react';
import faker from 'faker';
import { ToDoContext } from './toDo-provider';

export function useToDoContext(){

	const {
		toDos,
		setToDos,
		taskEditorInline,
		setTaskEditorInline
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
		if (data.id) {
			const newList = toDos.filter(td=> td.id != data.id);
			setToDos(newList);
		}
		const createAt = new Date();
		data['editing'] = false;
		data['id'] = faker.datatype.uuid();
		data['createAt'] = createAt.toLocaleDateString();
		setToDos(currentToDos => [...currentToDos, data]);
	};

	const toggleActiveEditor = value => {
		value
			? setTaskEditorInline(value)
			: setTaskEditorInline(current=> !current)
	};

	return {
		toDos,
		updateTask,
		addTask,
		taskEditorInline,
		toggleActiveEditor
	}
}