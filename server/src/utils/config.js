import dotenv from "dotenv";

dotenv.config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW, MYSQL_DB } = process.env;

export const mysqlConfig = {
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PW,
	database: MYSQL_DB,
	port: MYSQL_PORT,
};

export const registrationSchema = {
	email: {
		isEmail: {
			bail: true,
		},
	},
	password: {
		isLength: {
			errorMessage: "Password should be at least 8 characters long",
			// Multiple options would be expressed as an array
			options: { min: 8 },
		},
	},
};
