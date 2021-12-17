const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

require('./server/config/mongoose.config');

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use( express.json() );
app.use( express.urlencoded( {extended: true }));

require('./server/routes/user.route')(app);
require('./server/routes/parkingLot.route')(app);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running at port " + process.env.PORT);
});