var express = require('express');
var app = express();
var cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
var router = require('./src/router');
var PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))
app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));
app.use("/", router);