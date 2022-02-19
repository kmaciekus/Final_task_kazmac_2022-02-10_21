import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";
import "./Header.css";

export const Head = ({className, ...props}) => 
    Element({as: "header", className: classnames("header", className), ...props});

export const HeaderTitle = ({className, ...props}) =>
    Element({as: "h1", className: classnames("header-title", className), ...props});


