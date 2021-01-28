const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();
const helmet = require("helmet");
const ServerRouter = require("./router");

server.use(express.json());
server.use(helmet());
server.use("/api", ServerRouter);

module.exports = server;
