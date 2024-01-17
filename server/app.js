import express from "express";
import logger from "morgan";
import connectDB from "#root/db/index";
import agentsRoute from "#root/routes/agents";
import ticketsRoute from "#root/routes/tickets";
import configs from "#root/configs/index";
import { initializeSettings } from "#root/controllers/settings";

var app = express();
const db = connectDB();

// Initialize Settings document.
(async function () {
  await initializeSettings();
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Agents routes
app.use("/api/support-agents", agentsRoute);

// Ticket routes
app.use("/api/support-tickets", ticketsRoute);

app.use(function (err, req, res, next) {
  next(err);
});

// error handler TODO put this in middle ware
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = configs.node.env === "development" ? err : {};
  // debug("Ip Address", req.ip);
  // render the error page
  res.status(err.code || err.status || 500);
  res.json({
    code: err.code || err.status || 500,
    error: err.message || "Something went wrong!",
  });
});

export default app;
