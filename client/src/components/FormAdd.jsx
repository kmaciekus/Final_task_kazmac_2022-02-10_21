import { Field } from "../components/Field";
import { SelectField } from "./SelectField";
import React, { useEffect, useReducer } from "react";

import { ACTIONS } from "../variables/variables";
import { Error } from "../components/Error";
import { useState } from "react";
import { useAuth } from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";

const {
	SET_FIRSTNAME,
	SET_LASTNAME,
	SET_EMAIL,
	SET_DOB,
	SET_EVENT_NAME,
	SET_EVENT_DATE,
	SET_EVENT_ID,
	SET_ERROR,
} = ACTIONS;

const reducer = (state, action) => {
	switch (action.type) {
		case SET_FIRSTNAME:
			return {
				...state,
				firstname: action.payload,
			};
		case SET_LASTNAME:
			return {
				...state,
				lastname: action.payload,
			};
		case SET_EMAIL:
			return {
				...state,
				email: action.payload,
			};
		case SET_DOB:
			return {
				...state,
				dob: action.payload,
			};
		case SET_EVENT_NAME:
			return {
				...state,
				eventName: action.payload,
			};
		case SET_EVENT_DATE:
			return {
				...state,
				date: action.payload,
			};
		case SET_EVENT_ID:
			return {
				...state,
				eventId: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			break;
	}
};

export const FormAdd = ({ onUpdate, type }) => {
	const [state, dispatch] = useReducer(reducer, {
		firstname: "",
		lastname: "",
		email: "",
		dob: "",
		eventName: "",
		date: "",
		eventId: "",
		error: "",
	});
	const [events, setEvents] = useState(null);
	const { token } = useAuth();

	const onFNameChange = (e) => {
		dispatch({ type: SET_FIRSTNAME, payload: e.target.value });
	};
	const onLNameChange = (e) => {
		dispatch({ type: SET_LASTNAME, payload: e.target.value });
	};
	const onEmailChange = (e) => {
		dispatch({ type: SET_EMAIL, payload: e.target.value });
	};
	const onDobChange = (e) => {
		dispatch({ type: SET_DOB, payload: e.target.value });
	};
	const onSelectChange = (e) => {
		dispatch({ type: SET_EVENT_ID, payload: e.target.value });
	};
	const onEventNameChange = (e) => {
		dispatch({ type: SET_EVENT_NAME, payload: e.target.value });
	};
	const onEventDateChange = (e) => {
		dispatch({ type: SET_EVENT_DATE, payload: e.target.value });
	};

	const fetchEvents = async () => {
		const events = await EventApi.allEvents(token);
		if (!events.error) {
			if (!events.events.length) return setEvents(null);
			setEvents(events.events);
			dispatch({ type: SET_ERROR, payload: "" });
		}
		dispatch({ type: SET_ERROR, payload: events.error });
	};

	useEffect(() => {
		fetchEvents();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formFields =
		type === "guest" ? (
			<>
				<Field
					label="First name"
					name="firstname"
					onChange={onFNameChange}
					required
				/>
				<Field
					label="Last name"
					name="lastname"
					onChange={onLNameChange}
					required
				/>
				<Field
					label="Email"
					name="email"
					type="email"
					onChange={onEmailChange}
					required
				/>
				<Field
					label="Date of birth"
					type="date"
					name="dob"
					onChange={onDobChange}
					required
				/>
				<SelectField
					label="Event"
					name="eventId"
					options={events}
					onChange={onSelectChange}
					required
				/>
			</>
		) : (
			<>
				<Field
					label="Event name"
					name="eventName"
					onChange={onEventNameChange}
					required
				/>
				<Field
					label="Event date"
					type="datetime-local"
					name="date"
					onChange={onEventDateChange}
					required
				/>
			</>
		);
	const showError = state.error ? <Error error={state.error} /> : "";
	useEffect(() => {
		onUpdate({
			firstname: state.firstname,
			lastname: state.lastname,
			email: state.email,
			dob: state.dob,
			eventName: state.eventName,
			date: state.date,
			eventId: state.eventId,

		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<>
			{formFields}
			{showError}
		</>
	);
};
