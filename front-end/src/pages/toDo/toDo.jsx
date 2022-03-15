import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { DataStorage } from 'common/storage';
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { Header, Action, Today, Inbox, Tomorrow } from 'components';
import Istatic from 'common/istatic';

const ViewPort = Styled.section`
	display: grid;
	grid-template-columns: 18vw 82vw;
	grid-template-rows: 100vh;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	width: 100vw;
	height: 100vh;
	margin: 7.5vh 0 0 0;
`
const NavBar = Styled.aside`
	padding: 5vh 0 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #0A0E23;
`
const Option = Styled(Link)`
	display: flex;
	align-items: center;
	width: 80%;
	margin: 3px 0;
	transition: 300ms;
	padding: 8px 10px;
	border-radius: 7px;
	text-decoration: none;
	cursor: pointer;
	:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
`
const Label = Styled.p`
	//styles..
`
const ErrorLog = Styled.h1`
	display: ${(props) => (props.show ? "" : "none")};
	text-align: center;
	padding: 10px 20px;
  border: 2px solid #830000;
  border-radius: 8px;
  background-color: #0f0000;
`

const ToDo = () => {
	const auth = DataStorage.hasToken();
	if (!auth) {
		return <Navigate to="/" replace/>;
	}

	return (
		<ViewPort>
			<Header/>
			<NavBar>
				<Option to='/app/inbox'>
					<Action
						padding='0 10px'
						margin='0 5px 0 0'
						size='23px'
						id='nav:inbox'
						src={Istatic.iconUrl('inbox')}
						alt='inbox'
					/>
					<Label>Inbox</Label>
				</Option>
				<Option to='/app/today'>
					<Action
						padding='0 10px'
						margin='0 5px 0 0'
						size='23px'
						id='nav:today'
						src={Istatic.iconUrl('today')}
						alt='today'
					/>
					<Label>Today</Label>
				</Option>
				<Option to='/app/tomorrow'>
					<Action
						padding='0 10px'
						margin='0 5px 0 0'
						size='23px'
						id='nav:tomorrow'
						src={Istatic.iconUrl('event')}
						alt='tomorrow'
					/>
					<Label>Tomorrow</Label>
				</Option>
			</NavBar>
	    <Routes>
	      <Route path='inbox' element={<Inbox/>}/>
	      <Route path='today' element={<Today/>}/>
	      <Route path='tomorrow' element={<Tomorrow/>}/>
	    </Routes>
		</ViewPort>
	);
}

export default ToDo;
