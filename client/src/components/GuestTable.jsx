import React from "react";
import { Table, TBody, THead } from "../ui/Table/Table";
import { Guest } from "./Guest";

export const GuestTable = ({ guests }) => {
	
	return (
		<Table>
			<THead>
				<tr>
					<th>Guest</th>
					<th>Age</th>
					<th>Email</th>
				</tr>
			</THead>
			<TBody>
				{guests.map((guest) => <Guest key={guest.guestId} guest={guest} />)}
			</TBody>
		</Table>
	);
};
