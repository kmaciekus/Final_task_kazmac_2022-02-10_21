import React from 'react'
import { OptionEl } from "../ui/OptionEl";

export const Option = ({id, name}) => {
    return (
        <OptionEl value={id}>{name}</OptionEl>
    )
}
