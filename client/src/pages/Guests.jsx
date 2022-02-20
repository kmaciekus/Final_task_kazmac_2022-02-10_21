import { useState } from "react";
import React from "react";
import { useAuth } from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";
import { useEffect } from "react";
import { Container } from "../ui/Container/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GuestTable } from "../components/GuestTable";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button/Button";

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const navigateToGuestEvents = (e) => {
		if (!e.target.id) {
			return;
		}
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
				<Link to="/guests/add">
					<Button className="button-popup">+ ADD NEW GUEST</Button>
				</Link>
			</Container>
			<Footer />
		</div>
	);
};
