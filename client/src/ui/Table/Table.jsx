import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";
import "./Table.css";

export const Table = ({className, ...props}) => 
	Element({as: "table", className: classnames("table", className), ...props});

export const THead = ({className, ...props}) =>
	Element({as: "thead", className: classnames("thead", className), ...props});

export const TBody = ({className, ...props}) =>
	Element({as: "tbody", className: classnames("tbody", className), ...props});
