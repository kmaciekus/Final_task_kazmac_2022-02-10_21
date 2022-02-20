import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";
import { Footer } from "../components/Footer";
import { GuestTable } from "../components/GuestTable";
import { Header } from "../components/Header";
import { EventApi } from "../services/eventsApi";
import { Button } from "../ui/Button/Button";
import { Container } from "../ui/Container/Container";
import { Popup } from "../components/Popup";

export const EventGuests = () => {
	const [guests, setGuests] = useState(null);
	const [allGuests, setAllGuests] = useState(null);
	const [error, setError] = useState(null);
	const [buttonPopup, setButtonPopup] = useState(false);
	const { token } = useAuth();
	const { state } = useLocation();
	const eventId = state.eventId;
	const navigate = useNavigate();

	const fetchGuests = async () => {
		const guests = await EventApi.eventGuestList(token, eventId);
		const allGuests = await EventApi.allGuests(token);
		if (!guests.error) {
			if (!guests.guestList.length) return setGuests(null);
			setGuests(guests.guestList);
			setError(null);
		}
		setError(guests.error);
		if(!allGuests.error){
			if(!allGuests.guests.length) return setAllGuests(null);
			setAllGuests(allGuests.guests);
			setError(null);
		}
		setError(allGuests.error);

	};

	useEffect(() => {
		fetchGuests();
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
	}
	const addGuestToEvent = async (e) => {
		if (!e.target.id) {
			return;
		}
		const guestId = {guestId: e.target.id};
		await EventApi.addGuestToEvent(token, guestId, eventId);
		fetchGuests();
		setButtonPopup(false);
		// navigate("/guests/add", {
		// 	state: {
		// 		guestId: e.target.id,
		// 		guestName: e.target.value,
		// 	},
		// });
	}
	const errorText = !error ? "Loading..." : `${error}`;
	const title = `${state.eventName} Guests`;
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
			<Header title={title} />
			<Container>
				<GuestTable guests={guests} onClick={navigateToGuestEvents} />
				<Button
					className="button-popup"
					onClick={() => setButtonPopup(true)}
				>
					+ ADD GUEST
				</Button>
			</Container>
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
				<GuestTable guests={allGuests} type={true} onClick={addGuestToEvent}/>
				<Link to="/guests/add">
					<Button className="button-popup">+ ADD NEW GUEST</Button>
				</Link>
			</Popup>
		</div>
	);
};
