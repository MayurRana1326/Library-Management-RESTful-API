const User = require("./../models/users.model");
const jwt = require("jsonwebtoken");
const appConfig = require("../config/app.config");
const {
  getSuccessResponse,
  getFailureResponse,
} = require("../utils/response.util");

exports.signup = async (req, res, next) => {
  try {
    const payload = req.body;

    const isUserExist = await User.findOne({
      email: payload.email,
    }).lean();
    if (isUserExist) return res.status(409).json(getFailureResponse("Email already exists."));

    const user = await User.create(payload);

    return res
      .status(200)
      .json(getSuccessResponse("User added successfully", user));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json(getFailureResponse("Invalid Credentials."));

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
      return res.status(400).json(getFailureResponse("Invalid Credentials."));

    const tokenPayload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = jwt.sign(tokenPayload, appConfig.jwtSecret, {
      expiresIn: "5m",
    });

    return res.status(200).json(
      getSuccessResponse("User logged in successfully.", {
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};