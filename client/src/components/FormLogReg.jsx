import { Field } from "../components/Field";
import React, { useEffect, useReducer } from "react";

import { ACTIONS } from "../variables/variables";
import { Error } from "../components/Error";

const { SET_FIRSTNAME, SET_LASTNAME, SET_EMAIL, SET_PASSWORD, SET_ERROR } =
	ACTIONS;

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
		case SET_PASSWORD:
			return {
				...state,
				password: action.payload,
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

export const Form = ({ onUpdate, type }) => {
	const [state, dispatch] = useReducer(reducer, {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		error: "",
	});

	const onFNameChange = (e) => {
		dispatch({ type: SET_FIRSTNAME, payload: e.target.value });
	};
	const onLNameChange = (e) => {
		dispatch({ type: SET_LASTNAME, payload: e.target.value });
	};
	const onEmailChange = (e) => {
		dispatch({ type: SET_EMAIL, payload: e.target.value });
	};
	const onPasswordChange = (e) => {
		dispatch({ type: SET_PASSWORD, payload: e.target.value });
	};
	const onRepeat = (e) => {
		if (e.target.value === state.password) {
			dispatch({ type: SET_ERROR, payload: "" });
			return;
		}
		dispatch({ type: SET_ERROR, payload: "Password doesn not match!" });
	};
	const formFields =
		type === "Register" ? (
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
					label="Password"
					name="password"
					type="password"
					onChange={onPasswordChange}
					required
					minLength={8}
				/>
				<Field
					label="Repeat password"
					name="re-password"
					type="password"
					onChange={onRepeat}
					required
					minLength={8}
				/>
			</>
		) : (
			<>
				<Field
					label="Email"
					name="email"
					type="email"
					onChange={onEmailChange}
					required
				/>
				<Field
					label="Password"
					name="password"
					type="password"
					onChange={onPasswordChange}
					required
					minLength={8}
				/>
			</>
		);
	const showError = state.error.length ? <Error error1={state.error} /> : "";
	useEffect(() => {
		onUpdate({
			firstname: state.firstname,
			lastname: state.lastname,
			email: state.email,
			password: state.password,
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
