import React from "react";
import { FormField } from "../ui/FormFIeld/FormField";

export const Field = ({ label, ...rest }) => {
	const { name, type, placeholder, defaultValue } = rest;
	return (
		<FormField>
			<label htmlFor={name}>{label || name}</label>
			<input
				type={type || "text"}
				name={name}
				placeholder={placeholder || name}
				defaultValue={defaultValue}
				{...rest}
			/>
		</FormField>
	);
};
