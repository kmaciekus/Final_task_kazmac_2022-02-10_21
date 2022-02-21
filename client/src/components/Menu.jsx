import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAuth } from "../authHook/useAuth";
import { Item, NavbarMenuContainer, NavbarMenuItemHolder, Navigation } from "../ui/Navbar/Navbar";

export const Menu = ({menuSwitch, toggleMenu}) => {
	const { token, logout } = useAuth();
	const menuMask = <div className="mask" onClick={menuSwitch}></div>
	const menu = !token ? (
		<NavbarMenuContainer>
			<NavbarMenuItemHolder>
				<Link to="/login">
					<Item onClick={menuSwitch}>Login</Item>
				</Link>
			</NavbarMenuItemHolder>
			<NavbarMenuItemHolder>
				<Link to="/register">
					<Item onClick={menuSwitch}>Register</Item>
				</Link>
			</NavbarMenuItemHolder>
		</NavbarMenuContainer>
	) : (
		<NavbarMenuContainer>
			<NavbarMenuItemHolder>
				<Link to="/">
					<Item onClick={menuSwitch}>Home</Item>
				</Link>
			</NavbarMenuItemHolder>
			<NavbarMenuItemHolder>
				<Link to="/guests">
					<Item onClick={menuSwitch}>Guests</Item>
				</Link>
			</NavbarMenuItemHolder>
			<NavbarMenuItemHolder>
				<Link to="/events/add">
					<Item onClick={menuSwitch}>Add Event</Item>
				</Link>
			</NavbarMenuItemHolder>
			<NavbarMenuItemHolder>
				<Link to="/guests/add">
					<Item onClick={menuSwitch}>Add Guest</Item>
				</Link>
			</NavbarMenuItemHolder>
			<NavbarMenuItemHolder>
				<Link to="/login" onClick={menuSwitch}>
					<Item onClick={logout}>Logout</Item>
				</Link>
			</NavbarMenuItemHolder>
		</NavbarMenuContainer>
	)

	const menuBar = (
		<Navigation className="navbar-menu">
			<FaBars onClick={menuSwitch}/>
		</Navigation>
	)

	return (
		<>
			{menuBar}
			{toggleMenu && menu}
			{toggleMenu && menuMask}
		</>
	);
};
