import React, { useState } from 'react';
import Styled from 'styled-components';
import { useParams } from "react-router-dom";
import Moment from 'react-moment';
import { ToDoTask, Action, AddTaskInline } from 'components';
import Istatic from 'common/istatic';
import { useToDoContext } from 'common/contexts/toDo';


const ViewWrapper = Styled.section`
	padding: 10vh 0 0 0;
	display: flex;
	height: 83.5vh;
	justify-content: center;
	background-color: #05060F;
	overflow: scroll;
`
const View = Styled.section`
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	width: 80%;
`
const TodayHeader = Styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Day = Styled.h1`
	font-weight: bold;
	font-size: 1.3em;
	margin: 0 0 30px 0;
`
const DateTime = Styled(Moment)`
	font-size: 0.7em;
	font-weight: normal;
`
const AddTaskBtn = Styled.button`
	border: none;
	border-radius: 8px;
	color: #fff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	cursor: pointer;
	background-color: transparent;
	:hover {
		color: #1571C4;
	}
`
const NoTasks = Styled.p`
	opacity: 0.8;
	margin: 10vh 40%;
`

const ViewToDo = () => {
	const { toDos, updateTask, addTask } = useToDoContext();
	const { category } = useParams();
	const [taskEditorInline, setTaskEditorInline] = useState(false);

	console.log({category});

	return (
		<ViewWrapper>
			<View>
				<TodayHeader>
					<Day>Today <DateTime interval={60000} format="ddd, MMM DD" /></Day>
					<AddTaskBtn onClick={()=> setTaskEditorInline(true)}>
						<Action src={Istatic.iconUrl('add')} alt='add task'/>
						Add Task
					</AddTaskBtn>
				</TodayHeader>
				{toDos.map((toDo, i) => {
					return (
						<ToDoTask onCheck={updateTask} data={toDo} key={toDo.id}/>
					);
				})}
				{!toDos.length && <NoTasks>Enjoy your day off</NoTasks>}
				{taskEditorInline &&
					<AddTaskInline
						onSave={addTask}
						onClose={()=> setTaskEditorInline(false)}
					/>
				}
			</View>
		</ViewWrapper>
	);
}

export default ViewToDo;
