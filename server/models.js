// Db
const { DataTypes } = require('sequelize')
const db = require('./db.js')

const United_Base = db.define('united_base',
  // Описание таблиц
  {
    site: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    area: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salary_from: {
      type: DataTypes.INTEGER,
    },
    salary_to: {
      type: DataTypes.INTEGER,
    },
    salary_val: {
      type: DataTypes.STRING(3),
    },
    created_at: {
      type: DataTypes.TEXT,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    shedule: {
      type: DataTypes.TEXT,
    },
    alternate_url: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false
    }

  },
  // Опции
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = United_Base