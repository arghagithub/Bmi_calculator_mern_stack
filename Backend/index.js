const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const cors=require('cors');
const app = express()
const port = 80
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/data',require('./routes/data'));

app.listen(port, () => {
    console.log(`Backend API is listening on port ${port}`)
})