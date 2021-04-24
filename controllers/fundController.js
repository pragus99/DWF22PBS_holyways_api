const { Fund, UsersDonate } = require("../models");
const Joi = require("joi");

exports.getFunds = async (req, res) => {
  try {
    const path = process.env.PATH_KEY;

    const dataFunds = await Fund.findAll({
      include: [
        {
          model: UsersDonate,
          as: "usersdonate",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      exclude: ["createdAt", "updatedAt"],
    });

    const parseJSON = JSON.parse(JSON.stringify(dataFunds));

    dataFunds = parseJSON.map((content) => {
      return {
        ...content,
        image: path + item.image,
      };
    });

    res.status(200).send({
      status: "success",
      data: { funds: dataFunds },
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
    const dataFund = await Fund.findOne({
      where: {
        id,
      },
      include: [
        {
          model: UsersDonate,
          as: "usersdonate",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).send({
      status: "success",
      data: { fund: dataFund },
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
  try {
    const { title, goal, description } = req.body;
    const thumbnail = req.files.imageFile[0].filename;

    const dataFund = await Fund.create({
      title,
      thumbnail,
      goal,
      description,
    });

    res.status(200).send({
      status: "success",
      data: { fund: dataFund },
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
    const { id } = req.params;
    const dataFund = req.body;

    const findFund = Fund.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await Fund.update(dataFund, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      data: { fund: fund },
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

exports.updateUsersDonate = async (req, res) => {
  try {
    const id = req.params.id;
    const fund = req.body;

    const findFund = UsersDonate.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await Fund.update(fund, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      data: { fund: fund },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
