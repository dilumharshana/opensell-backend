import { connection } from "../../utility-service/index.js";
import { stockItemQueries } from "../constants/db-queries.js";

export const get_stocks = async (req, res) => {
  try {
    const result = await connection.selectExecute(
      stockItemQueries.getAllStockItems,
      {}
    );

    return res.json({
      status: 200,
      data: result?.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
