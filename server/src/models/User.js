import { getConnection } from "../database/mysql.js";

export default class User {
	constructor({id, fullname, email, password}) {
		this.id = id;
		this.fullname = fullname;
		this.email = email;
		this.password = password;
	}

	static async create({fullname, email, password}) {
		try {
			const connection = await getConnection();
			const query = `
			INSERT INTO users (fullname, email, password)
			VALUES (?, ?, ?)`;

			const [{insertId}] = await connection.query(query, [fullname, email, password]);

			return new User ({id: insertId, fullname, email, password});
		} catch (error) {
			console.log("Couldn't create user", error);
			throw error;
		}
	}

	static async oneByEmail(email) {
		try {
			const connection = await getConnection();
			const query = `
			SELECT * FROM users WHERE email = ?`;
			const [data] = await connection.query(query, [email]);
			const [user] = data;
			
			if (!user) return null;

			return new User({...user});
		} catch (error) {
			console.log(`Couldn't get user with email: ${email}`, error);
			throw error;
		}
	}

	static async init() {
		try {
			const connection = await getConnection();
			const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER AUTO_INCREMENT NOT NULL,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR (255) NOT NULL,
                password VARCHAR (60) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE (email)
            )`;

			await connection.query(query);

			console.log("Succesfully created 'users' table");
		} catch (error) {
			console.log("Could not init 'users' db", error);
			throw error;
		}
	}

	
}