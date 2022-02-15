import { getConnection } from "../database/mysql.js";

export default class Guest {
	constructor ({id, fullName, email, dob}) {
		this.id=id;
		this.fullName=fullName;
		this.email=email;
		this.dob=dob;
	}

	static async init() {
		try {
			const conn = await getConnection();
			const query = `
			CREATE TABLE IF NOT EXISTS guests (
				id INTEGER AUTO_INCREMENT NOT NULL,
				fullname VARCHAR(255) NOT NULL,
				email VARCHAR(255) UNIQUE NOT NULL ,
				dob DATE NOT NULL,
				PRIMARY KEY (id)
			)
			`;
			await conn.query(query);

			console.log("Succesfully created 'guests' table");
		} catch (error) {
			console.log("Could not init 'guests' db", error);
			throw error;
		}
	}

	static async add({fullName, email, dob}) {
		try {
			const conn = getConnection();
			const query = `
			INSERT INTO guests (fullname, email, dob)
			VALUES (?, ?, ?)
			`;
			const [{insertId}] = await conn.query(query, [fullName, email, dob]);
			return new Guest({id: insertId, fullName, email, dob});
		} catch (error) {
			console.log("Couldn't add guest", error);
			throw error;
		}
	}

	static async getAll() {
		try {
			const conn = getConnection();
			const query = `
			SELECT * FROM guests
			`;
			const [guests] = await conn.query(query);
			if (!guests) return null;
			return guests;
		} catch (error) {
			console.log("Couldn't get guests", error);
			throw error;
		}
	}
}