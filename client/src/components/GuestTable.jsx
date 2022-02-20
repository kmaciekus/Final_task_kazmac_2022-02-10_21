import React from "react";
import { Table, TBody, THead } from "../ui/Table/Table";
import { Guest } from "./Guest";

export const GuestTable = ({ guests, onClick, type }) => {
	if(guests){
		return (
			<Table>
				<THead>
					<tr>
						<th>Guest</th>
						<th>Age</th>
						<th>Email</th>
						<th></th>
					</tr>
				</THead>
				<TBody>
					{guests.map((guest) => <Guest key={guest.id} guest={guest} onClick={onClick} type={type} />)}
				</TBody>
			</Table>
		);
	} 
	return <div>All Guests are in this event!!!</div>;
};
