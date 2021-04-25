const { User } = require("../models");
const fs = require("fs");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
  // access global path

  try {
    const dataUser = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { users: dataUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const findUser = await User.findOne({ where: { id } });

    if (!findUser) {
      return res.send({
        status: "Error",
        message: "User doesn't exist",
      });
    }

    const schema = Joi.object({
      fullName: Joi.string().min(3),
      email: Joi.string().email(),
    });

    const { error } = schema.validate(body);
    if (error) {
      return res.send({
        status: "Error",
        message: error,
      });
    }

    if (req.files) {
      var avatar = req.files.avatar[0].filename;

      fs.stat(`storage/${findUser.avatar}`, function (err, stats) {
        if (err) {
          return console.log(error);
        }

        fs.unlink(`storage/${findUser.avatar}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }

    const dataUpdated = {
      ...body,
      avatar,
    };

    await User.update(dataUpdated, {
      where: { id },
    });

    const updateUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "password"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { user: updateUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const findUser = User.findOne({ where: { id } });

    if (!findUser) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }
    await User.destroy({ where: { id } });

    res.status(200).send({
      status: "Sucessfully delete data",
      data: { id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
