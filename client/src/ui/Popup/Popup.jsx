import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";
import "./Popup.css";

export const PopupWrapper = ({className, ...props}) =>
	Element({as: "div", className: classnames("popup", className), ...props});

export const PopupInner = ({className, ...props}) => 
	Element({as: "div", className: classnames("popup-inner", className), ...props});


