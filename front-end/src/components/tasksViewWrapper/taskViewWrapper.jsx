import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import moment from 'moment';
import { ToDoTask, AddTaskInline } from 'components';
import { useToDoContext } from 'common/contexts/toDo';

const NoTasks = Styled.p`
	opacity: 0.8;
	margin: 10vh 40%;
`

const TaskViewWrapper = ({ filterBy }) => {
	const {
		toDos,
		updateTask,
		addTask,
		taskEditorInline,
		toggleActiveEditor
	} = useToDoContext();

	//console.log(moment().format('YYYYMMDD'));

	const editTask = toDo => {
		if (toDo.checked) return;
		updateTask(toDo.id, { editing: true });
		return;
	};

	const dates = {
		today: moment().format('YYYYMMDD'),
		tomorrow: moment().add(1, 'days').format('YYYYMMDD')
	}

	const filterToDo = toDo => {
		if (!filterBy) return true;
		if (!toDo.due) return false;
		return moment(toDo.due).format('YYYYMMDD') === dates[filterBy];
	};

	return (
		<>
			{toDos.filter(filterToDo).map((toDo, i) => {
				if (toDo.editing) {
					return (
						<AddTaskInline
							edit={toDo}
							onSave={addTask}
							onClose={()=> toggleActiveEditor(false)}
						/>
					);
				}
				return (
					<ToDoTask
						onCheck={updateTask}
						onClick={()=> editTask(toDo)}
						data={toDo}
						key={toDo.id}
					/>
				);
			})}
			{!toDos.length && <NoTasks>Enjoy your day off</NoTasks>}
			{taskEditorInline &&
				<AddTaskInline
					onSave={addTask}
					onClose={()=> toggleActiveEditor(false)}
				/>
			}
		</>
	);
}

export default TaskViewWrapper;
