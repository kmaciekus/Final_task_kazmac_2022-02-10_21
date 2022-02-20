import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";
import { Container } from "../ui/Container/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Event } from "../components/Event";

export const Home = () => {
	const [events, setEvents] = useState(null);
	const [error, setError] = useState(null);
	const { token, user } = useAuth();
	const { state } = useLocation();
	const navigate = useNavigate();

	const fetchEvents = async () => {
		const events = await EventApi.allEvents(token);
		if (!events.error) {
			if (!events.events.length) return setEvents(null);
			setEvents(events.events);
			setError(null);
		}
		setError(events.error);
	};

	const onClick = (e) => {
		if (!e.target.id) {
			return;
		}
		navigate("/event-guests", {
			state: {
				eventId: e.target.id,
				eventName: e.target.children[0].innerText,
			},
		});
	};

	useEffect(() => {
		fetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const errorText = !error ? "Loading..." : `${error}`;
	const eventsSection = !events ? (
		<span>
			You have no events yet <Link to="/add">Add</Link>
		</span>
	) : (
		events.map((event) => (
			<Event key={event.id} event={event} onClick={onClick} />
		))
	);

	const username = user ? user.username : "User"

	const title = "Events";

	if (!events) {
		return (
			<Container>
				<Header title={errorText} />
				{errorText !== "Loading..." ? (
					<span>
						Try to <Link to="/login"> Login </Link> or{" "}
						<Link to="/register">Register</Link>
					</span>
				) : (
					<span>
						There are no events yet <Link to="/add">Add</Link>
					</span>
				)}
				<Footer />
			</Container>
		);
	}

	return (
		<div>
			<Header title={title} />
			<p>{`Logged in as ${username}`}</p>
			<Container>{eventsSection}</Container>
			<Footer />
		</div>
	);
};
