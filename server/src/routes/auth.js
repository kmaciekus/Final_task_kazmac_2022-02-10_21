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
	body(["firstname", "lastname", "email", "password"]).exists().notEmpty().withMessage("Field is missing"),
	body(["firstname", "lastname"]).trim().isAlpha().escape().withMessage("Firstname and lastname must not contain numbers")
		.isLength({min:2, max: 25}).withMessage("Firstname and lastname must be between 2 and 25 letters"),
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

router.post(
	"/login",
	checkSchema(registrationSchema),
	validateErrorsMiddleware,
	async (req, res) => {
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
