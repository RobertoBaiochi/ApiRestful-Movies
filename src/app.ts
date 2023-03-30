// ENV variables
require("dotenv").config();


import express from 'express';
import config from 'config'

const app = express();
const port = config.get<number>("port")

// JSON Middleware
app.use(express.json());

// DB
import db from '../config/db';

// Routes
import router from './router';

// Logger
import Logger from '../config/logger';

// Middlewares
import morganMiddleware from './middleware/morganMiddleware';

app.use(morganMiddleware);

app.use("/api/", router);


app.listen(port, async () => {

  await db();

  Logger.info("Aplicação está funcionando")
  console.log(`http://localhost:${port}/`)
})