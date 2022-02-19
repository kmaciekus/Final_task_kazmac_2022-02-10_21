import React from "react";

import { Card, CardInfoText, CardTextHolder, CardTitle } from "../ui/Card/Card";

export const Event = ({event, onClick}) => {
	const { id, name, date } = event;
	const fullDate = date.split("T")[0];
	const time = date.split("T")[1].split(".")[0];
  return (
	<Card onClick={onClick} id={id}>
		<CardTextHolder>
			<CardTitle>{name}</CardTitle>
		</CardTextHolder>
		<CardTextHolder>
			<CardInfoText>{fullDate}</CardInfoText>
			<CardInfoText>{time}</CardInfoText>
		</CardTextHolder>
	</Card>
  )
}
