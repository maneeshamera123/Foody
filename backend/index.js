const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
//     res.header(
//       "Access-Control-Allow-Origin",
//       "Origin,X-Requested-With,Content-Type,Accept"
//     )
//     next();
// })

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
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

