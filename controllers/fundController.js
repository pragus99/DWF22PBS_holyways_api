const { Fund, UsersDonate } = require("../models");
const fs = require("fs");

exports.getFunds = async (req, res) => {
  try {
    let dataFunds = await Fund.findAll({
      include: [
        {
          model: UsersDonate,
          as: "usersDonate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundId", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
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
          as: "usersDonate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundId", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "fundId", "userId"],
      },
    });

    if (!dataFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

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
    const thumbnail = req.files.thumbnail[0].filename;

    const dataFund = await Fund.create({
      ...req.body,
      thumbnail,
    });

    res.status(200).send({
      status: "success",
      data: {
        fund: {
          id: dataFund.id,
          title: dataFund.title,
          thumbnail: dataFund.thumbnail,
          goal: dataFund.goal,
          description: dataFund.description,
          usersdonate: [],
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

exports.updateFund = async (req, res) => {
  try {
    const { id } = req.params;

    const findFund = await Fund.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    if (req.files) {
      var thumbnail = req.files.thumbnail[0].filename;
      fs.unlink(`storage/${findFund.thumbnail}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const dataFund = {
      ...req.body,
      thumbnail,
    };

    await Fund.update(dataFund, {
      where: { id },
    });

    const updateFund = await Fund.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    res.status(200).send({
      status: "Success",
      data: {
        fund: {
          title: updateFund.title,
          goal: updateFund.goal,
          description: updateFund.description,
          thumbnail: updateFund.thumbnail,
          usersdonate: [],
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

exports.deleteFund = async (req, res) => {
  try {
    const id = req.params.id;

    const findFund = await Fund.findOne({ where: { id } });

    if (!findFund) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    fs.unlink(`storage/${findFund.thumbnail}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await Fund.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findFund.id },
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
    const { fundid, userid } = req.params;
    const { status } = req.body;

    const dataDonate = {
      status,
    };

    await UsersDonate.update(dataDonate, {
      where: { id: userid },
    });

    const updateFund = await Fund.findOne({
      where: { id: fundid },
      include: [
        {
          model: UsersDonate,
          as: "usersDonate",
          attributes: {
            exclude: ["createdAt", "updatedAt", "fundId", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "fundId", "userId"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: updateFund,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
