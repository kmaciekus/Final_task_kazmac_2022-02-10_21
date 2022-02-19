import "./FormField.css";
import { Element } from "../Element";
import { classnames } from "../../utils/Classnames";

export const FormField = ({className, ...props}) =>
    Element({as:"div", className: classnames("form-field", className), ...props});