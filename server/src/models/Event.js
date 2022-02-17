import { getConnection } from "../database/mysql.js";

export default class Event {
	constructor ({id, name, date, archived}) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.archived = archived;
	}

	static async init() {
		try {
			const conn = await getConnection();
			const query = `
			CREATE TABLE IF NOT EXISTS events (
				id INTEGER AUTO_INCREMENT NOT NULL,
				name VARCHAR(255) NOT NULL,
				date DATETIME NOT NULL,
				archived BOOL NOT NULL DEFAULT 0,
				PRIMARY KEY (id)
			)
			`;
			await conn.query(query);

			console.log("Succesfully created 'events' table");
		} catch (error) {
			console.log("Could not init 'events' db", error);
			throw error;
		}
	}

	static async add({eventName, date}) {
		try {
			const conn = await getConnection();
			const query = `
			INSERT INTO events (name, date)
			VALUES (?, DATE_FORMAT(?,'%Y-%m-%d %H:%i'))
			`;
			const [{insertId}] = await conn.query(query, [eventName, date]);

			return new Event({id:insertId, name: eventName, date});
		} catch (error) {
			console.log("Couldn't create event", error);
			throw error;
		}
	}

	static async getAll() {
		try {
			const conn = await getConnection();
			const query = `
			SELECT * FROM events
			`;
			const [events] = await conn.query(query);
			if (!events.length) return null;
			return events;
		} catch (error) {
			console.log("Couldn't get events", error);
			throw error;
		}
	}

	static async getUpcomingEvents() {
		try {
			const conn = await getConnection();
			const query = `
			SELECT * FROM events
			WHERE archived=0
			`;
			const [events] = await conn.query(query);
			if(!events.length) return null;
			return events;
		} catch (error) {
			console.log("Couldn't get events", error);
			throw error;
		}
	}

	static async getPastEvents() {
		try {
			const conn = await getConnection();
			const query = `
			SELECT * FROM events
			WHERE archived=1
			`;
			const [events] = await conn.query(query);
			if(!events.length) return null;
			return events;
		} catch (error) {
			console.log("Couldn't get events", error);
			throw error;
		}
	}
}