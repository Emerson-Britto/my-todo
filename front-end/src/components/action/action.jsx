import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';

const ActionBtn = Styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	transition: 300ms;
	${(props) => (`
		display: ${props.show ? '' : 'none'};
		margin: ${props.margin || '0'};
	`)}
	:hover {
		opacity: 0.7;
	}
`
const ActionImg = Styled.img`
	${(props) => (`
		width: ${props.size || '26px'};
		padding: ${props.padding || '0'};
	`)}
`

const Action = ({ onClick, src, alt, size, margin, padding, show=true }) => {

	return (
		<ActionBtn
			onClick={onClick}
			show={show}
			size={size}
			margin={margin}
		>
			<ActionImg
				size={size}
				padding={padding}
				src={src}
				alt={alt}
			/>
		</ActionBtn>
	);
}

export default Action;
