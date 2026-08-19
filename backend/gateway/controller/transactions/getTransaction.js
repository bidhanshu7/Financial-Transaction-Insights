const transactionClient = require("../../grpcClients/transactionClient");

const getTransaction = async (req, resp, next) => {
  try {
    let { volume, amount, days, pageNo } = req.query;
    const segregatedValue = req.segregateValues;

    let minVolume = segregatedValue.minVolume;
    let maxVolume = segregatedValue.maxVolume;
    let minAmount = segregatedValue.minAmount;
    let maxAmount = segregatedValue.maxAmount;
    let noOfDays = segregatedValue.days;

    if (pageNo < 1 || pageNo === undefined) {
      pageNo = 1;
    }

    if (volume) {
      const isRangeValid = /^(\d+)-(\d+)$/.test(volume);
      if (!isRangeValid) {
        const error = new Error(`Please provide the valid range for volume`);
        error.code = 400;
        return next(error);
      }
      const [userVolumeMin, userVolumeMax] = volume.split("-");

      if (Number(userVolumeMax) < Number(userVolumeMin)) {
        const error = new Error(`Please provide the valid range for volume`);
        error.code = 400;
        return next(error);
      }

      if (
        Number(segregatedValue.minVolume) > Number(userVolumeMin) ||
        Number(segregatedValue.maxVolume) < Number(userVolumeMax)
      ) {
        const error = new Error(
          `You can only see the data volume between ${segregatedValue.minVolume} - ${segregatedValue.maxVolume}`
        );
        error.status = 400;
        error.extraDetails = "Invalid Volume Count";
        return next(error);
      } else {
        minVolume = userVolumeMin;
        maxVolume = userVolumeMax;
      }
    }
    if (amount) {
      const isRangeValid = /^(\d+)-(\d+)$/.test(amount);
      if (!isRangeValid) {
        const error = new Error(`Please provide the valid range for Amount`);
        error.code = 400;
        return next(error);
      }

      const [userAmountMin, userAmountMax] = amount.split("-");

      if (Number(userAmountMax) < Number(userAmountMin)) {
        console.log("userAmountMax", userAmountMax);
        console.log("userAmountMin", userAmountMin);
        const error = new Error(`Please provide the valid range for amount`);
        error.code = 400;
        return next(error);
      }

      if (
        Number(segregatedValue.minAmount) > Number(userAmountMin) ||
        Number(segregatedValue.maxAmount) < Number(userAmountMax)
      ) {
        console.log(segregatedValue);
        const error = new Error(
          `You an only see the data Amount between ${segregatedValue.minAmount} - ${segregatedValue.maxAmount}`
        );
        error.code = 400;
        error.extraDetails = "Invalid Amount Count";
        return next(error);
      } else {
        minAmount = userAmountMin;
        maxAmount = userAmountMax;
      }
    }

    if (days) {
      const isRangeValid = /^(\d+)$/.test(days);
      if (!isRangeValid) {
        const error = new Error(`Please provide the valid day`);
        error.code = 400;
        return next(error);
      }
      if (segregatedValue.days < days) {
        const error = new Error(
          `You an only see the data of ${segregatedValue.days} days`
        );
        error.code = 400;
        error.extraDetails = "Days limit exceeded";
        return next(error);
      } else {
        noOfDays = days;
      }
    }

    transactionClient.GetTransactions(
      { minVolume, maxVolume, minAmount, maxAmount, noOfDays, pageNo },
      (error, response) => {
        if (error) {
          console.log(error);
          return next(error);
        } else {
          return resp.status(200).json(response);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = { getTransaction };
