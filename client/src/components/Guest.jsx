import React from "react";
import { Button } from "../ui/Button/Button";

export const Guest = ({ guest, onClick, type }) => {
	const { id, fullname, dob, email } = guest;
	const date = Date.parse(dob);
	const age = Math.floor((Date.now() - date) / 31556952000);
	const buttonText = type ? "+ ADD GUEST" : "View Events →"
	return (
		<tr >
			<td>{fullname}</td>
			<td className="hide">{age}</td>
			<td className="hide">{email}</td>
			<td className="view">
				<Button className="view main" onClick={onClick} id={id} value={fullname}>{buttonText}</Button>
			</td>
		</tr>
	);
};
