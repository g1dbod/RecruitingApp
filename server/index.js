const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const config = require('config')


const app = express();
const PORT = config.get('PORT_SERVER') || 8080;

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(PORT, ()=>{
  console.log(`server started on port ${PORT}`);
})