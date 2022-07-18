"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var index_1 = require("./src/routers/index");
require("express-async-errors");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.use((0, express_1.json)());
app.use(index_1["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Running on port ".concat(PORT));
});
