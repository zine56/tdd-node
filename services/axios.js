const axios = require("axios");

const instance = axios.create({
  baseURL: "https://www.miapp.com.ar"
});

module.exports = instance;
