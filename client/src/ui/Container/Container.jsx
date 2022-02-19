import { classnames } from "../../utils/Classnames";
import { Element } from "../Element";
import "./Container.css";

export const Container = ({ className, ...props }) =>
	Element({
		as: "div",
		className: classnames("container", className),
		...props,
	});
