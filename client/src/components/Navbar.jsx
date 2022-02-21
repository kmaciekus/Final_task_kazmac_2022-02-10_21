import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../authHook/useAuth";
import { useMenu } from "../menuHook/menuContext";

import {
	Logo,
	NavbarWrapper,
	NavLinks,
	Item,
	Navigation,
} from "../ui/Navbar/Navbar";
import { Menu } from "./Menu";
import letterE from "../assets/e-solid.svg";
import letterK from "../assets/k-solid.svg";

export const Navbar = () => {
	const { token, logout } = useAuth();
	const { toggleMenu, setToggleMenu } = useMenu();

	const menuSwitch = () => {
		setToggleMenu(!toggleMenu);
	};
	const links = !token ? (
		<Navigation className="navbar-links">
			<Link to="/login">
				<Item>Login</Item>
			</Link>
			<Link to="/register">
				<Item>Register</Item>
			</Link>
		</Navigation>
	) : (
		<Navigation className="navbar-links">
			<Link to="/">
				<Item>Home</Item>
			</Link>
			<Link to="/guests">
				<Item>Guests</Item>
			</Link>
			<Link to="/events/add">
				<Item>Add Event</Item>
			</Link>
			<Link to="/guests/add">
				<Item>Add Guest</Item>
			</Link>
			<Link to="/login">
				<Item onClick={logout}>Logout</Item>
			</Link>
		</Navigation>
	);
  return (
	<NavbarWrapper>
		<NavLinks>
			<Link to="/" className="logo-wrapper">
				<Logo src={letterK} />
				<Logo src={letterE} />
				<Item className="logo-title">vents</Item>
			</Link>
			<Item className="page-title">Event Planner</Item>
			{links}
			<Menu menuSwitch={menuSwitch} toggleMenu={toggleMenu} />
		</NavLinks>
	</NavbarWrapper>
  )
}
