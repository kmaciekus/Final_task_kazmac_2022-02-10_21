import { classnames } from "../../utils/Classnames";
import { Element } from "../Element";
import "./Button.css";

export const Button = ({className, ...props}) =>
    Element({
        as: "button",
        className: classnames("button", className),
        ...props,
    });