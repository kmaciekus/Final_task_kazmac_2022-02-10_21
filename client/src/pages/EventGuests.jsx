import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";
import { Footer } from "../components/Footer";
import { GuestTable } from "../components/GuestTable";
import { Header } from "../components/Header";
import { EventApi } from "../services/eventsApi";
import { Container } from "../ui/Container/Container";

export const EventGuests = () => {
	const [guests, setGuests] = useState(null);
	const [error, setError] = useState(null);
	const { token } = useAuth();
	const { state } = useLocation();
	const eventId = state.eventId;

	const fetchGuests = async () => {
		const guests = await EventApi.eventGuestList(token, eventId);
		if(!guests.error){
			if(!guests.guestList.length) return setGuests(null);
			setGuests(guests.guestList);
			setError(null);
		}
		setError(guests.error);
	}

	useEffect(() => {
		fetchGuests();
	},[]);
	const errorText = !error ? "Loading..." : `${error}`;
	const title = `${state.eventName} Guests`
	if(!guests){
		return (
			<Container>
				<Header title={errorText} />
				<Footer />
			</Container>
		)
	}
	return (
	<div>
		<Header title={title} />
		<Container>
			<GuestTable guests={guests}/>
		</Container>
	</div>
	);
};
