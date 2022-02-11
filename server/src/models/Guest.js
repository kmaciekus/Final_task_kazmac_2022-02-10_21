import { getConnection } from "../database/mysql.js";

export default class Guest {
	constructor ({id, fullName, email, age}) {
		this.id=id;
		this.fullName=fullName;
		this.email=email;
		this.age=age;
	}

	static async init() {
		try {
			const conn = await getConnection();
			const query = `
			CREATE TABLE IF NOT EXISTS guests (
				id INTEGER AUTO_INCREMENT NOT NULL,
				fullname VARCHAR(255) NOT NULL,
				email VARCHAR(255) UNIQUE NOT NULL ,
				age INTEGER,
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

	static async add({fullName, email, age}) {
		try {
			const conn = getConnection();
			const query = `
			INSERT INTO guests (fullname, email, age)
			VALUES (?, ?, ?)
			`;
			const [{insertId}] = await conn.query(query, [fullName, email, age]);
			return new Guest({id: insertId, fullName, email, age});
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

	static async getFromList(list) {
		let stringList = "";
		for (const id in list) {
			if(id==list.length-1){
				stringList += list[id];
			}else{
				stringList += list[id] + ",";
			}
		}
		try {
			const conn = getConnection();
			const query = `
			SELECT * FROM guests
			WHERE id IN (?)
			`;
			const [guests] = await conn.query(query, [stringList]);
			if(!guests) return null;
			return guests;
		} catch (error) {
			console.log("Couldn't get any guests", error);
			throw error;
		}
	}
}