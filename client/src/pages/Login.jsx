import React, { useState } from "react";
import { Container } from "../ui/Container/Container";
import { Form } from "../components/FormLogReg";
import { FormField } from "../ui/FormFIeld/FormField";
import { Button } from "../ui/Button/Button";
import { useAuth } from "../authHook/useAuth";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Error } from "../components/Error";
import { Footer } from "../components/Footer";

export const Login = () => {
	const navigate = useNavigate();
	const { login, error } = useAuth();
	const user = { email: "", password: "" };
	const [model, setModel] = useState(user);
	const [logError, setLogError] = useState(null);
	const handleUpdate = (update) => setModel(update);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!model.email.length || !model.password.length)
			return setLogError("Please enter email and password!");
		const res = await login(model);
		if (res.err) return setLogError(res.err);
		setLogError(null);
		navigate("/", { state: { logedIn: model } });
	};
	const showError = error || logError ? <Error error={error+logError} /> :"";
	return (
		<>
			<Header title="Login" />
			<Container as="form" onSubmit={handleSubmit}>
				<Form onUpdate={handleUpdate} />
				{showError}
				<FormField className="buttons">
					<Button
						type="submit"
						className="main"
					>
						LOGIN
					</Button>
					<Button type="reset">CANCEL</Button>
				</FormField>
			</Container>
			<Footer/>
		</>
	);
};
