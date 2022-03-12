import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';

const ActionBtn = Styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	${(props) => (`
		display: ${props.show ? '' : 'none'};
		margin: ${props.margin || '0'};
	`)}
`
const ActionImg = Styled.img`
	${(props) => (`
		width: ${props.size || '26px'};
		padding: ${props.padding || '0'};
	`)}
`

const Action = ({ src, alt, size, margin, padding, show=true }) => {

	return (
		<ActionBtn
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
