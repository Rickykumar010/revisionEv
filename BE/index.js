
require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./configs/db');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const countryRoutes = require('./router/countryRoutes');
const { userRouter } = require('./router/userRouter');


app.use(cors());
app.use(express.json())


app.use('/api', countryRoutes)
app.use(userRouter)

app.listen(port, async () => {
    try {
        await mongoConnect(process.env.MONGODB_URL);
        console.log(`Listening on port ${port}`);
    } catch (err) {
        console.log(err);
    }
});

