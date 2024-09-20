const User = require("./../models/users.model");
const jwt = require("jsonwebtoken");
const appConfig = require("../config/app.config");
const { getFailureResponse } = require("../utils/response.util");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json(getFailureResponse("Access denied. No token provided."));

    const decoded = jwt.verify(token, appConfig.jwtSecret);
    const { email } = decoded;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json(getFailureResponse("Invalid token. User no longer exists."));

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(getFailureResponse("Session expired. Please log in again."));
    } else {
      return res.status(401).json(getFailureResponse("Invalid token."));
    }
  }
};
