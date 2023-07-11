import OracleDB from "oracledb";
import { connection } from "../../utility-service/index.js";
import { saleQueries } from "../constants/db-queries.js";

export const save_bill = async (req, res) => {
  try {
    const selledItems = req.body?.cart || null;
    const discount = req.body?.discount || null;
    const recivedCash = req.body?.recivedCash || null;

    if (!selledItems || !recivedCash) {
      return res.json({
        status: 500,
        data: "Invalid Data !",
      });
    }

    const saleResponse = await connection.insertExecute(
      saleQueries.insetSell,
      {
        1: 1,
        2: recivedCash,
        3: discount,
      },
      ["SALE_ID"]
    );

    const saleId = saleResponse?.outBinds.SALE_ID[0] | null;

    if (!saleId)
      return res.json({
        status: 500,
        data: "Error in inserting sale",
      });

    const selledItemsArray = [];
    const stockItems = [];

    Object.keys(selledItems).forEach((item) => {
      selledItemsArray[selledItemsArray.length] = {
        1: saleId,
        2: selledItems[item]?.ITEM_ID,
        3: selledItems[item]?.ITEM_QUANTITY,
        4: selledItems[item]?.SELLING_PRICE,
      };

      stockItems[stockItems.length] = {
        1:
          selledItems[item]?.REMAIN_STOCK_AMOUNT -
          selledItems[item]?.ITEM_QUANTITY,
        2: selledItems[item]?.ITEM_ID,
      };
    });

    const sellItemResponse = await connection.insertExecuteMany(
      saleQueries.insetSellItems,
      selledItemsArray
    );

    const stockitemsUpdateResponse = await connection.insertExecuteMany(
      saleQueries.updateStockItems,
      stockItems
    );

    if (sellItemResponse?.rowsAffected !== selledItemsArray.length)
      return res.json({
        status: 500,
        data: "Error in inserting sale items",
      });
  } catch (error) {
    console.log(error);
  }
};
