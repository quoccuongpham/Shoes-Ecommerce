const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactsRouter = require("./app/routes/admin/contact.route");
const admin = require("./app/routes/admin/admin.route");
const users = require("./app/routes/users/users.route");
const ApiError = require("./app/api-error");
require("dotenv").config();
const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public/products", express.static("./public/products"));

app.use("/api/contacts", contactsRouter);
app.use("/admin", admin);
app.use("/users", users);

app.get("/", (req, res) => {
	res.json({ message: "welcome to contact book application." });
});
// handle 404 response
app.use((req, res, next) => {
	return res.json(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
	return res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});

module.exports = app;
