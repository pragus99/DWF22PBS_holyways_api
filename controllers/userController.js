const { User } = require("../models");

exports.getUsers = async (req, res) => {
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
