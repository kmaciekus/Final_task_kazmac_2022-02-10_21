import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";
import { Footer } from "../components/Footer";
import { FormAdd } from "../components/FormAdd";
import { Header } from "../components/Header";
import { EventApi } from "../services/eventsApi";
import { Button } from "../ui/Button/Button";
import { Container } from "../ui/Container/Container";
import { FormField } from "../ui/FormFIeld/FormField";
import { Error } from "../components/Error";

export const AddGuest = () => {
	const navigate = useNavigate();
	const guest = {
		firstname: "",
		lastname: "",
		email: "",
		dob: "",
		eventId: "",
	};
	const [model, setModel] = useState(guest);
	const [error, setError] = useState(null);
	const { token } = useAuth();
	const handleUpdate = (update) => setModel(update);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!model.firstname.length ||
			!model.lastname.length ||
			!model.email.length ||
			!model.dob.length ||
			!model.eventId.length
		)
			return setError("All fields are required");

		const res = await EventApi.addGuest(token, model);
		if (res.errors) return setError(res.errors);
		setError(null);
		navigate("/guests", {
			state: {
				newGuest: res.added.fullName,
			},
		});
	};
	const showError = error ? <Error error={error} /> : "";

	return (
		<>
			<Header title="Add New Guest" />
			<Container as="form" onSubmit={handleSubmit}>
				<FormAdd onUpdate={handleUpdate} type="guest" />
				{showError}
				<FormField className="buttons">
					<Button type="submit" className="main">
						+ ADD
					</Button>
					<Button type="reset">CANCEL</Button>
				</FormField>
			</Container>
			<Footer />
		</>
	);
};
