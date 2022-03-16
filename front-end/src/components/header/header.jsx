import React, { useState } from 'react';
import Styled from 'styled-components';
import Istatic from 'common/istatic';
import { useNavigate } from "react-router-dom";
import { DataStorage } from 'common/storage';
import { Action } from 'components';

const View = Styled.header`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	width: 100vw;
	height: 7.5vh;
	background-color: #050818;
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
	background-color: #0A0E25;
`
const RightSide = Styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const ProfileImg = Styled.img`
	border-radius: 50%;
	border: ${(props) => (props.activeLogoutPopUp ? "1px" : "0")} solid #830000;
	width: 35px;
	margin: 0 40px 0 15px;
	cursor: pointer;
`
const LogOutBtn = Styled.button`
	display: ${(props) => (props.show ? "" : "none")};
	position: absolute;
	right: 40px;
	bottom: -30px;
	color: #fff;
	width: 120px;
	padding: 5px 15px;
	font-size: 0.9em;
  border: 2px solid #830000;
  border-radius: 8px;
  background-color: #0f0000;
  cursor: pointer;
`

const Header = () => {
	const navigate = useNavigate();
	const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);

	return (
		<View>
			<LeftSide>
				<Branding>ToDO √</Branding>
				<SearchInput placeholder='Search'/>
			</LeftSide>
			<RightSide>
				<Action
					src={Istatic.iconUrl('notifications')}
					alt='notifications'
				/>
				<ProfileImg
					activeLogoutPopUp={showLogoutPopUp}
					onClick={()=> setShowLogoutPopUp(status => !status)}
					src={Istatic.staticPath('imgs/defaultProfile/profile_default_blue.png')}
					alt='profile image'
				/>
				<LogOutBtn
					onClick={()=> {
						DataStorage.delToken();
						navigate('/');
					}}
					show={showLogoutPopUp}>
					Log out
				</LogOutBtn>
			</RightSide>
		</View>
	);
}

export default Header;
