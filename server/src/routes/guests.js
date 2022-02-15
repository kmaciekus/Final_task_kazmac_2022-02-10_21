import { Router } from "express";
import { body } from "express-validator";

import Guest from "../models/Guest.js";
import EventGuesList from "../models/EventGuestList.js";

import { loggedInMiddleware } from "../middleware/loggedIn.js";
import { sendError } from "../utils/error.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";


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
	body(["fullName", "email", "dob", "eventId"]).exists().notEmpty().withMessage("Field is missing"),
	body("fullName").trim().isAlpha().escape().withMessage("Name must not contain numbers"),
	body("email").trim().isEmail().normalizeEmail(),
	body("dob").isISO8601().isDate().withMessage("Wrong date format"),
	body("eventId").toInt(),
	validateErrorsMiddleware,
	async (req, res) => {
		const { fullName, email, dob, eventId } = req.body;
		try {
			const guest = await Guest.add({fullName, email, dob});
			const assignToEvent = await EventGuesList.add({eventId, guestId: guest.id);
			res.status(201).send({
				added: guest,
				eventId,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

router.get(
	"/:eventId",
	loggedInMiddleware,
	async (req, res) => {
		const eventId = Number(req.params.eventId);
		try {
			const guestList = await EventGuesList.getGuestList(eventId);
			if (!guestList) return res.status(204).send(`Event with id: ${eventId} does not exists or has no guests yet.`);
			res.status(200).send({
				guestList,
			})
		} catch (error) {
			sendError(error, res);
		}
	}
);

export default router;