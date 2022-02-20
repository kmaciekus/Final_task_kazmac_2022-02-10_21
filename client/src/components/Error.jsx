import React from "react";
import { FormField } from "../ui/FormFIeld/FormField";

export const Error = ({error}) => {
	if(error.length>1) {
		return (
			<FormField>
				{error.map((e) => <div style={{ color: "red" }}>{`Error: ${e.msg} in field: ${e.param}`}</div>)}
			</FormField>
		)
	}
	return (
		<FormField>
			<div style={{ color: "red" }}>{`Error: ${error.msg} in field: ${error.param}`}</div>
		</FormField>
	);
};
