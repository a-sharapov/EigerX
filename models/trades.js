// Uncomment the code below to use Sequelize ORM
const { Sequelize, DataTypes } = require("sequelize");
const { DICTIONARY, AVAILABLE_TYPES } = require("../assets/trades");
const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');

// Insert your model definition below

const MODEL_NAME = "Trade";

const struct = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
      isIn: {
        args: [AVAILABLE_TYPES],
        msg: DICTIONARY.INVALID_STRUCT_TYPE,
      },
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
    },
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
    },
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
      min: {
        args: 1,
        msg: DICTIONARY.INVALID_STRUCT_SHARES_MIN,
      },
      max: {
        args: 100,
        msg: DICTIONARY.INVALID_STRUCT_SHARES_MAX,
      },
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
    },
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notNull: {
        msg: DICTIONARY.INVALID_STRUCT_NOT_NULL,
      },
    },
  },
};

const options = {
  timestamps: false,
  freezeTableName: true,
  tableName: MODEL_NAME.toLowerCase(),
};

module.exports = sequelize.define(MODEL_NAME, struct, options);
module.exports.struct = struct;
