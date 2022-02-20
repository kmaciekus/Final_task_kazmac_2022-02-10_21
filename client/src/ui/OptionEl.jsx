import { Element } from './Element';

export const OptionEl = ({className, ...props}) => 
    Element({as:"option", className:className, ...props});