import { Router } from "express";
import { body } from "express-validator";

import Guest from "../models/Guest.js";
import EventGuestList from "../models/EventGuestList.js";

import { loggedInMiddleware } from "../middleware/loggedIn.js";
import { sendError } from "../utils/error.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";
import { today, normalizeName } from "../utils/helpers.js";


const router = Router();

router.get(
	"/",
	loggedInMiddleware,
	async (req, res) => {
		try {
			const guests = await Guest.getAll();
			if (!guests) return res.status(204).send("No guests found");
			res.status(200).send({
				guests,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

router.post(
	"/",
	loggedInMiddleware,
	body(["firstname","lastname", "email", "dob", "eventId"]).exists().notEmpty().withMessage("Field is missing"),
	body("firstname").trim().isAlpha().escape().withMessage("First name must not contain numbers").isLength({min:2, max:25}).withMessage("First name must contain min 2 characters and not be longer than 25 characters"),
	body("lastname").trim().isAlpha().escape().withMessage("Last name must not contain numbers").isLength({min:2, max:25}).withMessage("Lastname must contain min 2 characters and not be longer than 25 characters"),
	body("email").trim().isEmail().withMessage("Not an email").normalizeEmail(),
	body("dob").isISO8601().withMessage("Wrong date format").isDate().withMessage("Wrong date format").isBefore(today(-15)).withMessage("Guest must be at leaset 15 years old"),
	body("eventId").toInt(),
	validateErrorsMiddleware,
	async (req, res) => {
		const { firstname, lastname, email, dob, eventId } = req.body;
		const fullname = normalizeName(firstname).concat(" ", normalizeName(lastname));
		try {
			const guest = await Guest.add({fullname, email, dob});
			const assignToEvent = await EventGuestList.add({eventId, guestId: guest.id});
			res.status(201).send({
				added: guest,
				eventId,
				assignToEvent,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);
router.get(
	"/guest/:guestId",
	loggedInMiddleware,
	async (req, res) => {
		const guestId = Number(req.params.guestId);
		try {
			const eventList = await EventGuestList.getGuestEvents(guestId);
			if(!eventList) return res.status(204).send(`Guest with id: ${guestId} is not in the list`);
			res.status(200).send({
				eventList,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);
router.get(
	"/guest/:guestId/notIn",
	loggedInMiddleware,
	async (req, res) => {
		const guestId = Number(req.params.guestId);
		try {
			const eventList = await EventGuestList.getEventsNotInList(guestId);
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