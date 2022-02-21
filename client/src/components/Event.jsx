import React from "react";

import { Card, CardInfoText, CardTextHolder, CardTitle } from "../ui/Card/Card";

export const Event = ({ event, onClick }) => {
	if (event) {
		const { id, name, date } = event;
		const fullDate = date.split("T")[0];
		const time = date.split("T")[1].split(".")[0];
		return (
			<Card>
				<CardTextHolder >
					<CardTitle  onClick={onClick} id={id}>{`Event: ${name}`}</CardTitle>
				</CardTextHolder>
				<CardTextHolder>
					<CardInfoText>{`On: ${fullDate}`}</CardInfoText>
					<CardInfoText>{`At: ${time}`}</CardInfoText>
				</CardTextHolder>
			</Card>
		);
	}
	return (
		<Card>
			<CardTextHolder>
				<CardTitle>This guest is registered to all events =)</CardTitle>
			</CardTextHolder>
		</Card>
	);
};
