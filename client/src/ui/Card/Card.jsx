import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";
import "./Card.css"

export const Card = ({ className, ...props }) =>
	Element({ as: "div", className: classnames("card", className), ...props });

export const CardTextHolder = ({className, ...props}) => 
    Element({as: "div", className: classnames("content-wrapper"), ...props});

export const CardTitle = ({className, ...props}) =>
    Element({as: "h4", className: className, ...props});

export const CardInfoText = ({className, ...props}) => 
    Element({as: "p", className:className, ...props});
