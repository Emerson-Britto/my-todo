import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import Istatic from 'common/istatic';
import { Action } from 'components';
import { useToDoContext } from 'common/contexts/toDo';

const View = Styled.section`
	display: flex;
	flex-direction: column;
`
const TaskEditor = Styled.section`
	display: flex;
	flex-direction: column;
	width: 98.5%;
	padding: 6px;
	border-radius: 8px;
	background-color: rgba(0, 0, 0, 0.4);
	border: 1px solid transparent;
	transition: 400ms;
	:hover {
		border: 1px solid gray;
	}
`
const DefaultInputStyles = Styled.input`
	border: none;
	outline: none;
	background-color: transparent;
	color: #fff;
	padding: 8px 10px;
`
const TitleInput = Styled(DefaultInputStyles)`
	margin-top: 5px;
	font-size: 0.9em;
`
const DescInput = Styled(DefaultInputStyles)`
	color: #919494;
`
const LabelInput = Styled(DefaultInputStyles)`
	color: #919494;
`
const OtherOptions = Styled.section`
	display: flex;
	margin: 5px 0;
`
const DefineDate = Styled.label`
	display: flex;
	align-items: center;
	border-radius: 10px;
	border: 1px solid green;
	background-color: transparent;
	color: #fff;
	font-size: 0.8em;
	padding: 4px 10px;
	cursor: pointer;
`
const Actions = Styled.section`
	display: flex;
`
const DefaultButtonStyles = Styled.button`
	border: 1px solid gray;
	padding: 8px 10px;
	cursor: pointer;
	border-radius: 8px;
	color: #fff;
	font-size: 0.9em;
	margin: 10px 10px 0 0;
	${(props) => (`
		background-color: ${props.color || 'transparent'};
		border: ${props.color? '0' : '1px'} solid gray;
	`)}
`
const TaskEditorActionBtn = Styled(DefaultButtonStyles)`
	//styles..
`

const AddTaskInline = ({onSave, onClose, edit}) => {
	const { updateTask } = useToDoContext();
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDesc, setTaskDesc] = useState('');
	const [taskLabel, setTaskLabel] = useState('');
	const [date, setDate] = useState('');

	const clearFields = () => {
		setTaskTitle('');
		setTaskDesc('');
		setTaskLabel('');
		setDate('');
	};

	const saveTask = () => {
		if (!taskTitle) return;
		const labels = taskLabel.split(/,\s|,/ig);
		if (edit) {
			onSave({
				...edit,
				editing: false,
				title: taskTitle,
				desc: taskDesc,
				labels: labels[0].length? labels : [],
				due: date || null
			});
			clearFields();
			return;
		}
		onSave({
			checked: false,
			title: taskTitle,
			desc: taskDesc,
			labels: labels[0].length? labels : [],
			due: date || null
		});
		clearFields();
	};

	useEffect(()=>{
	  if (edit) {
	  	setTaskTitle(edit.title);
			setTaskDesc(edit.desc);
			setTaskLabel(edit.labels.join(', '));
			setDate(edit.due || '');
	  }
	},[])

	return (
		<View>
			<TaskEditor>
				<TitleInput
					type='text'
					value={taskTitle}
					onChange={e => setTaskTitle(e.target.value)}
					placeholder='e.g. learn Portuguese every 2 day'
				/>
				<DescInput
					type='text'
					value={taskDesc}
					onChange={e => setTaskDesc(e.target.value)}
					placeholder='Description'
				/>
				<LabelInput
					type='text'
					value={taskLabel}
					onChange={e => setTaskLabel(e.target.value)}
					placeholder='Label:  meet, school, house'
				/>
				<OtherOptions>
					<DefineDate htmlFor='input:date'>
						<Action size='20px' src={Istatic.iconUrl('calendar_month')} alt='define date'/>
						{date || 'No Date'}
					</DefineDate>
				</OtherOptions>
			</TaskEditor>
			<Actions>
				<TaskEditorActionBtn
					onClick={saveTask}
					color='#2444B4'
				>
						Add Task
				</TaskEditorActionBtn>
				<TaskEditorActionBtn
					onClick={() => {
						if (edit) {
							updateTask(edit.id, { editing: false });
							return;
						}
						onClose();
					}}
				>
					Cancel
				</TaskEditorActionBtn>
			</Actions>
			<input
				id='input:date'
				style={{
					'width': '0',
					'height': '0',
					'opacity': '0'
				}}
				value={date}
				onChange={e => setDate(e.target.value)}
				type='date'
			/>
		</View>
	);
}

export default AddTaskInline;
