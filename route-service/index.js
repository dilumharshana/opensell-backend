import express from "express";

import posRoutes from "../pos-service/routes/routes.js";

const router = express.Router();

router.use("/pos", posRoutes);

export default router;
