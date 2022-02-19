import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Guests } from "./pages/Guests";
import { GuestEvents } from "./pages/GuestEvents";
import { EventGuests } from "./pages/EventGuests";
import { AddGuest } from "./pages/AddGuest";
import { AddEvent } from "./pages/AddEvent";
import { NotFound } from "./pages/NotFound";
import "./App.css";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/guests"
						element={
							<RequireAuth>
								<Guests />
							</RequireAuth>
						}
					/>
					<Route
						path="/guests/guest-events"
						element={
							<RequireAuth>
								<GuestEvents />
							</RequireAuth>
						}
					/>
					<Route
						path="/event-guests"
						element={
							<RequireAuth>
								<EventGuests />
							</RequireAuth>
						}
					/>
					<Route
						path="/guests/add"
						element={
							<RequireAuth>
								<AddGuest />
							</RequireAuth>
						}
					/>
					<Route
						path="/events/add"
						element={
							<RequireAuth>
								<AddEvent />
							</RequireAuth>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/404" element={<NotFound/>} />

					<Route path="*" element={<Navigate to="/404"/>} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
