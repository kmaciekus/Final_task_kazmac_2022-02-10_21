const { REACT_APP_BASE_URL } = process.env;

export class EventApi {

	static async register(user) {
		const res = await fetch(`${REACT_APP_BASE_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return res.json();
	}

	static async login(user) {
		const res = await fetch(`${REACT_APP_BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return res.json();
	}

	static async allEvents(token) {
		const res = await fetch(`${REACT_APP_BASE_URL}/events`, {
			method: "GET",
			headers: { authorization: `Bearer ${token}` },
		});
		return res.json();
	}
	static async eventGuestList(token, eventId) {
		const res = await fetch(`${REACT_APP_BASE_URL}/events/event/${eventId}`, {
			method: "GET",
			headers: { authorization: `Bearer ${token}` },
		});
		return res.json();
	}
	
	static async addEvent(token, event) {
		const res = await fetch(`${REACT_APP_BASE_URL}/events`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
			body: JSON.stringify(event),
		});
		return res.json();
	}
	static async allGuests(token) {
		const res = await fetch(`${REACT_APP_BASE_URL}/guests`, {
			method: "GET",
			headers: { authorization: `Bearer ${token}` },
		});
		return res.json();
	}
	static async allGuestEvents(token, guestId) {
		const res = await fetch(`${REACT_APP_BASE_URL}/guests/guest/${guestId}`, {
			method: "GET",
			headers: { authorization: `Bearer ${token}` },
		});
		return res.json();
	}
	static async addGuest(token, guest) {
		const res = await fetch(`${REACT_APP_BASE_URL}/guests`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
			body: JSON.stringify(guest),
		});
		return res.json();
	}
}
