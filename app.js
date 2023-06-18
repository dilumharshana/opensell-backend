import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { initializer } from "./utility-service/index.js";

import utilityRoutes from "./utility-service/routes/routes.js";
import posRoutes from "./route-service/index.js";

dotenv.config();

const app = express();

const port = process.env.port;

app.use(cors());
app.use(bodyParser.json());

app.use(utilityRoutes);
app.use("/api", posRoutes);

app.listen(port, () => {
  initializer();
});
