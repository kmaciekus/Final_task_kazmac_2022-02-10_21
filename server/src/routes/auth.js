import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { body, checkSchema } from "express-validator";
import { config } from "dotenv";
import User from "../models/User.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";
import { sendError, wrongUserDataError } from "../utils/error.js";
import { registrationSchema } from "../utils/config.js";

config();

const router = Router();

router.post(
	"/register",
	body(["firstname", "lastname", "email", "password"]).exists().notEmpty(),
	body("firstname").trim().isAlpha().escape().withMessage("First name must not contain numbers"),
	body("lastname").trim().isAlpha().escape().withMessage("Last name must not contain numbers"),
	checkSchema(registrationSchema),
	validateErrorsMiddleware,
	async (req, res) => {
		const { firstname, lastname, email, password } = req.body;
		const fullname = firstname.concat(" ", lastname);
		const hashed = await hash(password, 10);

		try {
			const user = await User.create({
				fullname,
				email,
				password: hashed,
			});

			res.status(201).send({
				registeredEmail: user.email,
			});
		} catch (error) {
			sendError(error, res);
		}
	}
);

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.oneByEmail(email);
		
		if (!user) {
			wrongUserDataError(res);
		}

		const validPw = await compare(password, user.password);

		if (!validPw) {
			return wrongUserDataError(res);
		}

		const token = jwt.sign(
			{ user_id: user.id, username: user.fullname },
			process.env.TOKEN_SECRET
		);

		res.send({
			token,
		});
	} catch (error) {
		sendError(error, res);
	}
});

export default router;
