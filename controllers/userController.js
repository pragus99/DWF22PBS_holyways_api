const { user } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const dataUser = await user.findAll();
    res.send({
      status: "success",
      data: dataUser,
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

    const findUser = user.findOne({ where: { id } });

    if (!findUser) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }
    await user.destroy({ where: { id } });

    res.send({
      status: "Sucessfully delete user",
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
