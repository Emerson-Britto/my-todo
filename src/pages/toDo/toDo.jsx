import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { Header } from 'components';

const ViewPort = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	width: 100vw;
	margin: 20vh 0;
`

const ToDo = () => {

	return (
		<ViewPort>
			<Header/>
			<p>dfdfsfsffsf</p>
			<p>dfdfsfsffsf</p>
			<p>dfdfsfsffsf</p>
		</ViewPort>
	);
}

export default ToDo;
