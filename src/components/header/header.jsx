import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import Istatic from 'common/istatic';

const View = Styled.section`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	width: 100vw;
	height: 7vh;
	background-color: #000614;
`
const LeftSide = Styled.div`
	display: flex;
	align-items: center;
`
const Branding = Styled.h1`
	font-weight: bold;
	font-size: 1.3em;
	padding: 12px 0;
	margin: 0 20px;
`
const SearchInput = Styled.input`
	border: none;
	height: 40%;
	color: #fff;
	padding: 5px 10px;
	border-radius: 7px;
	background-color: #0A0E21;
`
const RightSide = Styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const NotificationIcon = Styled.img`
	padding: 5px;
	cursor: pointer;
`
const ProfileImg = Styled.img`
	border-radius: 50%;
	width: 35px;
	margin: 0 40px 0 15px;
	cursor: pointer;
`

const Header = () => {

	return (
		<View>
			<LeftSide>
				<Branding>ToDO √</Branding>
				<SearchInput placeholder='Search'/>
			</LeftSide>
			<RightSide>
				<NotificationIcon src={Istatic.iconUrl('notifications')} alt='notifications'/>
				<ProfileImg src={Istatic.path('/static/imgs/defaultProfile/profile_default_blue.png')} alt='profile image'/>
			</RightSide>
		</View>
	);
}

export default Header;
