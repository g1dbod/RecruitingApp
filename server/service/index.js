const { response } = require('express')
// const client = require('../db')
const db = require('../db')
const United_Base = require('../models')
const { Op, QueryTypes } = require("sequelize");

const checkStr = (str) => {
  return !(str.toLowerCase().includes('drop') || str.toLowerCase().includes('delete') || str === "" || str === "ALL")
}

const getData = async (page, filters) => {
  let pages = 0
  if (checkStr(String(page))) {
    pages = (Number(page) - 1) * 20
  }
  //-----------------------------------------

  let sql = {}

  if (checkStr(filters.site)) {
    sql.site = `${filters.site}`
  } else { delete sql.site }

  if (checkStr(filters.name)) {
    sql.name = {
      [Op.like]: `%${filters.name}%`
    }
  } else { delete sql.name }

  if (checkStr(filters.area)) {
    sql.area = {
      [Op.like]: `%${filters.area}%`
    }
  } else { delete sql.area }

  if (checkStr(filters.salary_from)) {
    sql.salary_from = {
      [Op.gte]: filters.salary_from
    }
  } else { delete sql.salary_from }

  if (checkStr(filters.salary_to)) {
    sql.salary_to = {
      [Op.lte]: filters.salary_to
    }
  } else { delete sql.salary_to }

  if (checkStr(filters.salary_val)) {
    sql.salary_val = `${filters.salary_val}`
  } else { delete sql.salary_val }

  if (checkStr(filters.created_at)) {
    sql.created_at = `${filters.created_at}`
  } else { delete sql.created_at }

  if (checkStr(filters.archived)) {
    sql.archived = `${filters.archived}`
  } else { delete sql.archived }

  if (checkStr(filters.shedule)) {
    sql.shedule = `${filters.shedule}`
  } else { delete sql.shedule }

  //--------------------------------------
  let order = []

  if (checkStr(filters.order.column)) {
    order.push(filters.order.column)
  } else { order.push('name') }

  if (checkStr(filters.order.type)) {
    order.push(filters.order.type)
  } else { order.push('ASC') }

  //---------------------------------------

  const response = await United_Base.findAndCountAll({
    where: sql,
    offset: pages,
    limit: 20,
    order: [
      order
    ],
  })

  const salary = {
    salary_from: {
      min: await United_Base.min('salary_from', { where: sql }),
      max: await United_Base.max('salary_from', { where: sql }),
    },
    salary_to: {
      min: await United_Base.min('salary_to', { where: sql }),
      max: await United_Base.max('salary_to', { where: sql }),
    }
  }

  return {...response, salary}
}

const getSettings = async () => {
  const shedules = await db.query("SELECT DISTINCT(shedule) FROM united_base ORDER BY shedule ASC;", { type: QueryTypes.SELECT });
  const salary_vals = await db.query("SELECT DISTINCT(salary_val) FROM united_base ORDER BY salary_val ASC;", { type: QueryTypes.SELECT });
  const sites = await db.query("SELECT DISTINCT(site) FROM united_base ORDER BY site ASC;", { type: QueryTypes.SELECT });
  return {
    shedules,
    salary_vals,
    sites
  }
}

module.exports = {
  getData,
  getSettings
}