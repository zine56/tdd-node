const express = require("express");
const parser = require("body-parser");
const services = require("./services");
const { posts } = require("./endpoints");
const { authenticate } = require("./middlewares");

const app = express();
const port = 3000;

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const postHandlers = posts(services);

app.post("/", authenticate, postHandlers.post);

app.listen(port, () => console.log(`La aplicacion esta escuchando en el puerto ${port}`));

module.exports = app;
