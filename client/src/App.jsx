import { Routes, Route, Navigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { useState } from "react";

import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { MenuContext, useMenu } from "./menuHook/menuContext";

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
import { Navbar } from "./components/Navbar";

function App() {
	const [toggleMenu, setToggleMenu] = useState(false);
	return (
		<div className="App" >
			<MenuContext.Provider value={{ toggleMenu, setToggleMenu }}>
				<IconContext.Provider value={{ className: "react-icons" }}>
					<AuthProvider>
						<Navbar />
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
							<Route path="/404" element={<NotFound />} />

							<Route path="*" element={<Navigate to="/404" />} />
						</Routes>
					</AuthProvider>
				</IconContext.Provider>
			</MenuContext.Provider>
		</div>
	);
}

export default App;
