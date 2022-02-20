import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";
import { EventApi } from "../services/eventsApi";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import { Container } from "../ui/Container/Container";
import { FormAdd } from "../components/FormAdd";
import { FormField } from "../ui/FormFIeld/FormField";
import { Button } from "../ui/Button/Button";
import { Footer } from "../components/Footer";

export const AddEvent = () => {
	const navigate = useNavigate();
	const event = { eventName: "", date: "" };
	const [model, setModel] = useState(event);
	const [error, setError] = useState(null);
	const { token } = useAuth();
	const handleUpdate = (update) => setModel(update);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!model.eventName.length ||
			!model.date.length
		)
			return setError("All fields are required");

		const res = await EventApi.addEvent(token, model);
		if (res.errors) return setError(res.errors);
		setError(null);
		navigate("/", {
			state: {
				newEvent: res.added,
				date: res.date,
			},
		});
	};
	const showError = error ? <Error error={error} /> : "";
	return (
		<>
			<Header title="Add Event" />
			<Container as="form" onSubmit={handleSubmit}>
				<FormAdd onUpdate={handleUpdate}/>
				{showError}
				<FormField className="buttons">
					<Button type="submit" className="main">+ ADD</Button>
					<Button type="reset">CANCEL</Button>
				</FormField>
			</Container>
			<Footer/>
		</>
	);
};
