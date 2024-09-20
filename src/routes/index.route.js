const indexRouter = require("express").Router();

const authRouter = require("./auth.route");
const bookRouter = require("./book.route");

indexRouter.use("/auth", authRouter);
indexRouter.use("/books", bookRouter);

module.exports = indexRouter;
