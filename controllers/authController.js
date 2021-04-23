const { User } = require("../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Validation failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (!checkEmail) {
      return res.send({
        status: "Login failed",
        message: "Email/Password is wrong1",
      });
    }

    const checkPassword = await User.findOne({
      where: {
        password,
      },
    });
    if (!checkPassword) {
      return res.send({
        status: "Login Failed",
        message: "Email/Password is wrong2",
      });
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: email,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullName: checkEmail.fullName,
          email: checkEmail.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
