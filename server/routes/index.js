const Router = require('express')
const { getData, getSettings } = require('../service')

const router = new Router()

router.get('/getData', async (req, res) => {
  const {page, filters} = req.query;
  // console.log(req.query.page)
  const response = await getData(page, filters);
  return res.json({data: response})
})

router.get('/getSettings', async (req, res) => {
  const response = await getSettings();
  return res.json({settings: response})
})


module.exports = router