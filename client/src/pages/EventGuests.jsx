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
	const [allGuestsNotIn, setAllGuests] = useState(null);
	const [error, setError] = useState(null);
	const [buttonPopup, setButtonPopup] = useState(false);
	const { token } = useAuth();
	const { state } = useLocation();
	const eventId = state.eventId;
	const navigate = useNavigate();

	const fetchGuests = async () => {
		const guests = await EventApi.eventGuestList(token, eventId);
		if (!guests.error) {
			if (!guests.guestList.length) return setGuests(null);
			setGuests(guests.guestList);
			setError(null);
		}
		setError(guests.error);
	};
	const fetchNotInGuests = async () => {
		const allGuestsNotIn = await EventApi.eventGuestsNotInList(
			token,
			eventId
		);
		if (!allGuestsNotIn.error) {
			if (!allGuestsNotIn.guestList.length) return setAllGuests(null);
			setAllGuests(allGuestsNotIn.guestList);
			setError(null);
		}
		setError(allGuestsNotIn.error);
	};

	useEffect(() => {
		fetchGuests();
		fetchNotInGuests();
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
	const addGuestToEvent = async (e) => {
		if (!e.target.id) {
			return;
		}
		const guestId = { guestId: e.target.id };
		await EventApi.addGuestToEvent(token, guestId, eventId);
		fetchGuests();
		fetchNotInGuests();
		setButtonPopup(false);
		// navigate("/guests/add", {
		// 	state: {
		// 		guestId: e.target.id,
		// 		guestName: e.target.value,
		// 	},
		// });
	};

	const errorText = !error ? "Loading..." : `${error}`;
	const title = `${state.eventName} Guests`;
	if (!guests) {
		return (
			<Container>
				<Header title={errorText} />
				{errorText === "Loading..." ? (
					<Button
						className="button-popup"
						onClick={() => setButtonPopup(true)}
					>
						+ ADD GUEST
					</Button>
				) : (
					""
				)}

				<Footer />
				<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
					<GuestTable
						guests={allGuestsNotIn}
						type={true}
						onClick={addGuestToEvent}
					/>
					<Link to="/guests/add">
						<Button className="button-popup">
							+ ADD NEW GUEST
						</Button>
					</Link>
				</Popup>
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
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
				<GuestTable
					guests={allGuestsNotIn}
					type={true}
					onClick={addGuestToEvent}
				/>
				<Link to="/guests/add">
					<Button className="button-popup">+ ADD NEW GUEST</Button>
				</Link>
			</Popup>
		</div>
	);
};
