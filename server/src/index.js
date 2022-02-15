import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

import Event from "./models/Event.js";
import EventGuestList from "./models/EventGuestList.js";
import Guest from "./models/Guest.js";
import User from "./models/User.js";

import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import guestsRouter from "./routes/guests.js";

import { mysqlConfig } from "./utils/config.js";


dotenv.config();

const main = async () => {

	const connection = await mysql.createConnection(mysqlConfig);

	await User.init();
	await Guest.init();
	await Event.init();
	await EventGuestList.init();

	const app = express();
	app.use(cors());

	app.use(express.json());

	app.use("/auth", authRouter);
	app.use("/events", eventsRouter);
	app.use("/guests", guestsRouter);

	app.sql = connection;

	app.listen(8080, () => {
		console.log("http://localhost:8080");
	});
};

main();