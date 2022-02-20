import React from "react";
import { Option } from "./Option";
import { FormField } from "../ui/FormFIeld/FormField";

export const SelectField = ({ label, options, name, onChange, ...rest }) => {
	if (options) {
		return (
			<FormField>
				<label htmlFor={name}>{label || name}</label>
				<select onChange={onChange}>
					<Option name={label} value={null} />
					{options.map((option) => (
						<Option
							key={option.id}
							name={`${option.name} ${option.date.split("T")[0]}`}
							value={option.id}
							id={option.id}
						/>
					))}
				</select>
			</FormField>
		);
	}
	return (
		<FormField>
			<label htmlFor={name}>{label || name}</label>
			<select>
				<Option name={label} value={null} />
			</select>
		</FormField>
	);
};
