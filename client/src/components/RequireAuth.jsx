import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authHook/useAuth";

export const RequireAuth = ({ children }) => {
	const auth = useAuth();

	if (!auth.token) {
		return <Navigate to="/login" />;
	}
	return children;
};
