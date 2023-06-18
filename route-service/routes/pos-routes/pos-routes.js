import express from "express";
import { get_system_data } from "../../../pos-service/services/get-system-data";
import { add_update_stock_service } from "../../../pos-service/services/add-update-stocks";

const router = express.Router();

router.get("/systemData", (req, res) => get_system_data(req, res));

router.post("/stockItem", (req, res) => add_update_stock_service(req, res));

export default router;
