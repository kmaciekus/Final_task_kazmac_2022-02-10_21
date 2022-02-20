import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { EventApi } from "../services/eventsApi";
import { Event } from "../components/Event";
import { Popup } from "../components/Popup";
import { Container } from "../ui/Container/Container";
import { Header } from "../components/Header";
import { Button } from "../ui/Button/Button";
import { Footer } from "../components/Footer";
import { useAuth } from "../authHook/useAuth";

export const GuestEvents = () => {
	const [events, setEvents] = useState(null);
	const [eventsNotInList, setEventsNotInList] = useState(null);
	const [error, setError] = useState(null);
	const [buttonPopup, setButtonPopup] = useState(false);
	const { state } = useLocation();
	const { token } = useAuth();
	const navigate = useNavigate();

	const guestId = state.guestId;
	const guestName = state.guestName;

	const fetchEvents = async () => {
		const events = await EventApi.allGuestEvents(token, guestId);
		if (!events.error) {
			if (!events.events.length) return setEvents(null);
			setEvents(events.events);
			setError(null);
		}
		setError(events.error);
	};

	const fetchEventsNotInList = async () => {
		const eventsNotInList = await EventApi.allEventsNotInList(token, guestId);
		if (!eventsNotInList.error) {
			if (!eventsNotInList.events.length) return setEventsNotInList(null);
			setEventsNotInList(eventsNotInList.events);
			setError(null);
		}
		setError(eventsNotInList.error);
	};

	useEffect(() => {
		fetchEvents();
		fetchEventsNotInList();
	}, []);
	const addEventForGuest = async (e) => {
		if (!e.target.id) {
			return;
		}
		await EventApi.addGuestToEvent(token, {guestId}, e.target.id);
		fetchEvents();
		fetchEventsNotInList();
		setButtonPopup(false);
	}
	const errorText = !error ? "Loading..." : `${error}`;
	const eventsSection = !events ? (
		<span>
			You have no events yet <Link to="/add">Add</Link>
		</span>
	) : (
		events.map((event) => <Event key={event.id} event={event} />)
	);
	const username = state ? guestName : "User undefined";
	const title = username ? `${username} Events` : "Events";

	if (!events & !error) {
		return (
			<Container>
				<Header title={title} />
				<Button className="button-popup" />
				<Footer />
				<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
					<Container>
						{!eventsNotInList ? "" : eventsNotInList.map((event) => (
							<Event key={event.id} event={event} onClick={addEventForGuest} />
						))}
						<Link to="/events/add">
							<Button className="button-popup">
								+ ADD NEW EVENT
							</Button>
						</Link>
					</Container>
				</Popup>
			</Container>
		);
	}
	return (
		<div>
			<Header title={title} />
			<Container>
				{eventsSection}
				<Button
					className="button-popup"
					onClick={() => setButtonPopup(true)}
				>
					+ ADD EVENT
				</Button>
			</Container>
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
				<Container>
					{!eventsNotInList ? "" : eventsNotInList.map((event) => (
						<Event key={event.id} event={event} onClick={addEventForGuest} />
					))}
					<Link to="/events/add">
						<Button className="button-popup">
							+ ADD NEW EVENT
						</Button>
					</Link>
				</Container>
			</Popup>
		</div>
	);
};
