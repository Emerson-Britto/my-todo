import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import faker from 'faker';
import { DataStorage } from 'common/storage';
import { request } from 'common/request';
import { ToDoContext } from './toDo-provider';

export function useToDoContext(){

	const {
		toDos,
		setToDos,
		isLoading,
		setIsLoading,
		taskEditorInline,
		setTaskEditorInline
	} = useContext(ToDoContext);
	const navigate = useNavigate();


// =============================================================

	const syncTasks = async() => {
		setIsLoading(true);
		try {
			const res = await request.viewAllTask();
			setToDos(res);
		} catch(err) {
			if (err.response.status === 401) {
				DataStorage.delToken();
				navigate('/');
			};
		} finally {
			setIsLoading(false);
		}
	};

	const updateTask = async(id, data) => {
		let newList = [...toDos];
		let toDoIndex = toDos.findIndex(td => td.id === id);
		newList[toDoIndex] = {
			...newList[toDoIndex],
			...data
		};
		setToDos(newList);
		const res = await request.updateTask(data);
		if (res.status != 200) {
			syncTasks();
		}
	}

	const deleteTask = async(data) => {
		const newList = toDos.filter(td => td.id != data.id);
		const res = await request.deleteTask(data.id)
			.catch(err => {
				console.error(err);
				alert('Unable to remove task');
			});
		if (res.status === 200) {
			setToDos(newList);
		}
	};

	const addTask = async(data) => {
		if (data.id) {
			const res = await request.updateTask(data)
			if (res.status === 200) syncTasks();
			return;
		}
		const createAt = new Date();
		data['editing'] = false;
//		data['id'] = faker.datatype.uuid();
		data['createAt'] = createAt.toLocaleDateString();
		const res = await request.createTask(data);
		if (res.status === 200) {
			syncTasks();
		}
	};

	const toggleActiveEditor = value => {
		value
			? setTaskEditorInline(value)
			: setTaskEditorInline(current=> !current)
	};

	useEffect(()=>{
		if (toDos.length) return;
		syncTasks();
	},[]);

	return {
		toDos,
		updateTask,
		addTask,
		isLoading,
		deleteTask,
		taskEditorInline,
		toggleActiveEditor
	}
}