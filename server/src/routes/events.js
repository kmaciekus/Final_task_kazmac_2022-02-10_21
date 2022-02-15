import { Router } from "express";
import { body } from "express-validator";

import Event from "../models/Event.js";
import EventGuestList from "../models/EventGuestList.js";

import { loggedInMiddleware } from "../middleware/loggedIn.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";
import { sendError } from "../utils/error.js";

const router = Router();

router.get(
	"/",
	loggedInMiddleware,
	async (req, res) => {
		try {
			const events = await Event.getAll();
			if (!events) return res.status(204).send("No events yet");
			res.status(200).send({
				events,
			});
		} catch (error) {
			sendError(error, res);
		}

	}
);

router.post(
	"/",
	loggedInMiddleware,
	body(["eventName", "date"]).exists().notEmpty().withMessage("Fields are missing"),
	body("date").trim().isDate().withMessage("Must be a valid date"),
	validateErrorsMiddleware,
	async (req, res) => {
		const { eventName, date } = req.body;
		try {
			const event = await Event.add({eventName, date});

			res.status(201).send({
				added: event.name,
				date: event.date,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);
router.post(
	"/event/:eventId",
	loggedInMiddleware,
	body("guestId").exists().notEmpty().toInt(),
	validateErrorsMiddleware,
	async (req, res) => {
		const { guestId } = req.body;
		const eventId = Number(req.params.eventId);

		try {
			await EventGuestList.add({eventId, guestId});

			res.status(201).send({
				added: guestId,
				toEvent: eventId,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

router.get(
	"/event/:eventId",
	loggedInMiddleware,
	async (req, res) => {
		const eventId = Number(req.params.eventId);
		try {
			const guestList = await EventGuestList.getGuestList(eventId);
			if (!guestList) return res.status(204).send(`Event with id: ${eventId} does not exists or has no guests yet.`);
			res.status(200).send({
				guestList,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

export default router;