import { Router } from "express";
import { body } from "express-validator";

import Event from "../models/Event.js";
import EventGuesList from "../models/EventGuestList.js";

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
				added: event.eventName,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

router.get(
	"/:guestId",
	loggedInMiddleware,
	async (req, res) => {
		const guestId = Number(req.params.guestId);
		try {
			const eventList = await EventGuesList.getGuestEvents(guestId);
			if(!eventList) return res.status(204).send(`Guest with id: ${guestId} is not in the list`);
			res.status(200).send({
				eventList,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

export default router;