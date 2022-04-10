var express = require('express');
var cors = require('cors')
var app = express();
var router = require('./src/router');
var PORT = process.env.PORT || 8080;

app.use(cors())
app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));
app.use("/", router);