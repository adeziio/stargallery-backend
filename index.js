var express = require('express');
var app = express();
var router = require('./src/router');
var PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));
app.use("/", router);