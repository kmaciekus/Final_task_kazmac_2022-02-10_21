export const sendError = (error, res) => {
	console.error(error);
	res.status(500).send({
		error: error.message,
	});
};

export const wrongUserDataError = (res) => {
	return res.status(404).send({
		error: "Incorrect username or password",
	});
};