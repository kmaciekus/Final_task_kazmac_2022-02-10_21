import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";
import "./Navbar.css";

export const NavbarWrapper = ({ className, ...props }) => 
    Element({as: "div", className: classnames("navbar", className), ...props});

export const NavLinks = ({className, ...props}) => 
    Element({as: "nav", className: classnames("navLinks", className), ...props});

export const Logo = ({className, ...props}) =>
    Element({as:"img", className:classnames("img-logo", className), ...props});

export const Item = ({className, ...props}) =>
    Element({as:"span", className: classnames("navbar-item", className), ...props});

export const Navigation = ({className, ...props}) =>
    Element({as:"div", className: classnames("navigation", className), ...props});