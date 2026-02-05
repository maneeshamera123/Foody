require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

const { run } = require('./db')
run();

app.get('/', cors(), async (req, res) => {
  res.send("Hello world")
});

app.use(express.json());

app.use('/api',  require('./Routes/CreatUser'))
app.use('/api',  require('./Routes/DisplayData'))
app.use('/api',  require('./Routes/OrderData'))
app.use('/api',  require('./Routes/MyOrderdata'))

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

