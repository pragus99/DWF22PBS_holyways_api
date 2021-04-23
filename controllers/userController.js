const { User } = require("../models");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
  // access global path
  const path = process.env.IMG_PATH;

  try {
    const dataUser = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // data database di ubah ke format JSON lalu di parsing
    const parseJSON = JSON.parse(JSON.stringify(dataUser));

    data = parseJSON.map((data) => {
      return {
        ...data,
        image: path + data.image,
      };
    });

    res.status(200).send({
      status: "success",
      data: {
        users: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.userId;
    const data = req.body;

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "password"],
      },
    });

    if (!dataUser) {
      return res.send({
        status: "Error",
        message: "User doesn't exist",
      });
    }

    const schema = Joi.object({
      fullName: Joi.string().min(3),
      email: Joi.string().email(),
    });

    const { error } = schema.validate(data);
    if (error) {
      return res.send({
        status: "Error",
        message: error,
      });
    }

    const path = process.env.IMG_PATH;
    const image = req.files.imageFile[0].filename;

    const dataUpdated = {
      ...data,
      image,
    };

    await user.update(dataUpdated, {
      where: { id },
    });

    res.status(200).send({
      status: "success",
      message: "update success",
      data: { user: { ...dataUpdated, image: path + image } },
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
