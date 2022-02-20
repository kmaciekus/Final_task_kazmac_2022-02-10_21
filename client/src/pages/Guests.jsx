import { useState } from "react";
import React from "react";
import { useAuth } from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";
import { useEffect } from "react";
import { Container } from "../ui/Container/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GuestTable } from "../components/GuestTable";
import { useNavigate } from "react-router-dom";

export const Guests = () => {
	const [guests, setGuests] = useState(null);
	const [error, setError] = useState(null);
	const { token } = useAuth();
	const navigate = useNavigate();

	const fetchGuests = async () => {
		const guests = await EventApi.allGuests(token);
		if (!guests.error) {
			if (!guests.guests.length) return setGuests(null);
			setGuests(guests.guests);
			setError(null);
		}
		setError(guests.error);
	};

	useEffect(() => {
		fetchGuests();
	}, []);
	const navigateToGuestEvents = (e) => {
		if (!e.target.id) {
			return;
		}
		console.log(e.target.id)
		console.log(e.target.value)
		navigate("/guests/guest-events", {
			state: {
				guestId: e.target.id,
				guestName: e.target.value,
			},
		});
	};
	const errorText = !error ? "Loading..." : `${error}`;
	if (!guests) {
		return (
			<Container>
				<Header title={errorText} />
				<Footer />
			</Container>
		);
	}
	return (
		<div>
			<Header title="All guests" />
			<Container>
				<GuestTable guests={guests} onClick={navigateToGuestEvents} />
			</Container>
		</div>
	);
};
