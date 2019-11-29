'use strict';

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.LBAPI);
module.exports = {
  api: process.env.LBAPI,
};
