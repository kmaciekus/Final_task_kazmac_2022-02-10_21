import { getConnection } from "../database/mysql.js";

export default class EventGuestList {
	constructor({ id, eventId, guestId }) {
		this.id = id;
		this.eventId = eventId;
		this.guestId = guestId;
	}

	static async init() {
		try {
			const conn = await getConnection();
			const query = `
			CREATE TABLE IF NOT EXISTS eventGuestLists (
				id INTEGER AUTO_INCREMENT NOT NULL,
				event_id INTEGER NOT NULL,
				guest_id INTEGER NOT NULL,
				status VARCHAR(255) NOT NULL DEFAULT 'attending' CHECK (status IN ('attending', 'maybe', 'not-attending')),
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				PRIMARY KEY (id),
				FOREIGN KEY (event_id) REFERENCES events(id),
				FOREIGN KEY (guest_id) REFERENCES guests(id)
			)
			`;
			await conn.query(query);

			console.log("Succesfully created 'eventGuestLists' table");
		} catch (error) {
			console.log("Could not init 'eventGuestLists' db", error);
			throw error;
		}
	}

	static async add({ eventId, guestId }) {
		try {
			const conn = await getConnection();
			const query = `
			INSERT INTO eventGuestLists (event_id, guest_id)
			VALUES (?, ?)
			`;
			const [{ insertId }] = await conn.query(query, [eventId, guestId]);
			
			return new EventGuestList({ id: insertId, eventId, guestId });
		} catch (error) {
			console.log("Couldn't assign to guest list", error);
			throw error;
		}
	}

	static async getGuestList(eventId) {
		try {
			const conn = await getConnection();
			const query = `
			SELECT egl.guest_id as id, gst.fullname as fullName, gst.dob as dob, gst.email as email
			FROM eventGuestLists AS egl
				LEFT JOIN guests AS gst ON gst.id = egl.guest_id
				WHERE egl.event_id=?
			`;
			const [guests] = await conn.query(query,[eventId]);
			if(!guests) return null;
			return guests;
		} catch (error) {
			console.log("Couldn't get guest list", error);
			throw error;
		}
	}

	static async getGuestEvents(guestId) {
		try {
			const conn = await getConnection();
			const query = `
			SELECT evnt.id as id evnt.name as name, evnt.date as date, evnt.archived as past
			FROM eventGuestLists AS egl
				LEFT JOIN events AS evnt ON evnt.id = egl.event_id
				WHERE guest_id=?
			`;
			const [events] = await conn.query(query,[guestId]);
			if(!events) return null;
			return events;
		} catch (error) {
			console.log("Couldn't get events list", error);
			throw error;
		}
	}
}
