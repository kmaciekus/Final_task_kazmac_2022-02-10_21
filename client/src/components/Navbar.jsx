import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../authHook/useAuth";

import {
	Logo,
	NavbarWrapper,
	NavLinks,
	Item,
	Navigation,
} from "../ui/Navbar/Navbar";
import letterE from "../assets/e-solid.svg";
import letterK from "../assets/k-solid.svg";

export const Navbar = () => {
	const { token } = useAuth();
	const links = !token ? (
		<Navigation>
			<Link to="/login">
				<Item>Login</Item>
			</Link>
			<Link to="/register">
				<Item>Register</Item>
			</Link>
		</Navigation>
	) : (
		<Navigation>
			<Link to="/">
				<Item>Home</Item>
			</Link>
			<Link to="/guests">
				<Item>Guests</Item>
			</Link>
			<Link to="/add">
				<Item>Add Event</Item>
			</Link>
			<Link to="/add">
				<Item>Add Guest</Item>
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
		</NavLinks>
	</NavbarWrapper>
  )
}
