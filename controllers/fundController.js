const { Fund, UsersDonate } = require("../models");

exports.getFunds = async (req, res) => {
  try {
    const funds = await Fund.findAll({
      // include: [{
      // model: UsersDonate
      // attributes: {
      //     exclude: ["createdAt", "updatedAt"]
      //   }
      // }]
      exclude: ["createdAt", "updatedAt"],
    });
    res.status(200).send({
      status: "success",
      data: funds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFundsDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const fund = await Fund.findOne({
      where: {
        id,
      },
      // include: [{
      // model: UsersDonate
      // attributes: {
      //     exclude: ["createdAt", "updatedAt"]
      //   }
      // }]
    });
    res.status(200).send({
      status: "success",
      data: fund,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.createFund = async (req, res) => {
  const { title, thumbnail, goal, description } = req.body;

  try {
    const fund = await Fund.create({
      title,
      thumbnail,
      goal,
      description,
    });

    res.status(200).send({
      status: "success",
      data: fund,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateFund = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const findFund = Fund.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await Fund.update(data, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateUsersDonate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const findFund = UsersDonate.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await Fund.update(data, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteFund = async (req, res) => {
  try {
    const id = req.params.id;

    const findFund = Fund.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    await Fund.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
