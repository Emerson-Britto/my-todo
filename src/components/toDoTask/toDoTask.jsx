import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import Istatic from 'common/istatic';
import { Action } from 'components';

const View = Styled.section`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 10px 0;
	border-radius: 8px;
	background-color: #121430;
	cursor: pointer;
`
const CheckBox = Styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	border: 2px solid gray;
	cursor: pointer;
	margin: 0 15px;
	${(props) => (`
		background-color: ${props.checked ? '#1232B4' : 'transparent'};
	`)}
`
const TaskInfors = Styled.section`
`
const TaskTitle = Styled.h3`
	margin: 10px 0;
`
const TaskDesc = Styled.p`
	color: rgba(255, 255, 255, 0.6);
	font-size: 0.9em;
	margin: 5px 0;
`
const TaskLabels = Styled.div`
	display: ${(props) => (props.ifHasLabel ? "flex" : "none")};
	align-items: center;
	margin: 10px 0;
`
const Label = Styled.section`
	display: flex;
	align-items: center;
`
const LabelName = Styled.p`
	font-size: 0.9em;
	${(props) => (`
		color: ${props.color || '#fff'};
	`)}
`

const ToDoTask = ({ data, onCheck }) => {

	return (
		<View>
			<CheckBox
				onClick={()=> onCheck(data.id, {checked: !data.checked})}
				checked={data.checked}
			>
				<Action
					show={data.checked}
					size='100%'
					margin='auto'
					src={Istatic.iconUrl('done')}
					alt='checkbox'
				/>
			</CheckBox>
			<TaskInfors>
				<TaskTitle>{data.title}</TaskTitle>
				<TaskDesc>{data.desc}</TaskDesc>
				<TaskLabels ifHasLabel={!!data.labels.length}>
					{data.labels.map((label, i) => {
						return (
							<Label key={label.name + i}>
								<Action
									size='15px'
									margin='0 3px 0 0'
									src={Istatic.iconUrl('label')}
									alt='label icon'
								/>
								<LabelName>{ label }</LabelName>
							</Label>
						);
					})}
				</TaskLabels>
			</TaskInfors>
		</View>
	);
}

export default ToDoTask;
