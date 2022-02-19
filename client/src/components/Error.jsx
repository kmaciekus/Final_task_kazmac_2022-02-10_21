import React from "react";
import { FormField } from "../ui/FormFIeld/FormField";

export const Error = ({error1, error2 }) => {
	return (
		<FormField>
			<div style={{ color: "red" }}>{error1 || error2}</div>
		</FormField>
	);
};
