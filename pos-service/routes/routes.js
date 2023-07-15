import express from "express";
import { get_system_data } from "../services/get-system-data.js";
import { add_update_stock_service } from "../services/add-update-stocks.js";
import { get_stocks } from "../services/get-stocks.js";
import { save_bill } from "../services/save-bill.js";
import { get_sales_data } from "../services/get-sales-data.js";

const router = express.Router();

router.get("/system", (req, res) => get_system_data(req, res));

router.get("/stockItems", (req, res) => get_stocks(req, res));

router.get("/sales", (req, res) => get_sales_data(req, res));

router.post("/stockItem", (req, res) => add_update_stock_service(req, res));

router.post("/saveBill", (req, res) => save_bill(req, res));

export default router;
