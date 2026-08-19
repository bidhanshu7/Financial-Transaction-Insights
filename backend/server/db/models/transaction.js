"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      totalTxnSum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalTxn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false,
      },
      productCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      featureCode: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      featureName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      channel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Success", "Failed", "Pending", "Reversed"),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      timestamps: true,
    }
  );
  return Transaction;
};
