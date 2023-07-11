import { connection } from "../../utility-service/index.js";
import { stockItemQueries } from "../constants/db-queries.js";
import { validateMandatoryData } from "../helpers/validateMandatoryData.js";

export const add_update_stock_service = async (req, res) => {
  try {
    const itemId = req.body?.ITEM_ID || null;
    const itemName = req.body?.ITEM_NAME || null;
    const itemCode = req.body?.ITEM_CODE || null;
    const itemDesc = req.body?.ITEM_DESC || null;
    const itemAmount = req.body?.STOCK_AMOUNT || null;
    const itemPurchasePrice = req.body?.PURCHASED_PRICE || null;
    const itemSellingPrice = req.body?.SELLING_PRICE || null;
    const itemPurchaseDate = req.body?.PURCHASED_DATE || null;

    const mandatoryValues = [itemName, itemCode, itemAmount];
    const validData = validateMandatoryData(mandatoryValues);

    if (!validData) {
      return res.json({
        status: 500,
        data: "Mandatory Fields are missing",
      });
    }

    // replace transaction here

    if (!itemId) {
      // insert main item data
      const itemId = await connection.insertExecute(
        stockItemQueries.addItem,
        {
          1: itemCode,
          2: itemName,
          3: itemDesc,
        },
        ["ITEM_ID"]
      );

      if (!itemId?.outBinds.ITEM_ID[0])
        return res.json({
          status: 500,
          data: "Error in inserting data to tbl_items",
        });

      // insert item stock data
      const stockId = await connection.insertExecute(
        stockItemQueries.addItemToStock,
        {
          1: itemId.outBinds.ITEM_ID[0],
          2: itemAmount,
          3: itemSellingPrice,
        },
        ["ITEM_STOCK_ID"]
      );

      if (!stockId?.outBinds.ITEM_STOCK_ID)
        return res.json({
          status: 500,
          data: "Error in inserting data to tbl_stocks",
        });

      // insert item purchase data
      const itemPurchaseId = await connection.insertExecute(
        stockItemQueries.addItemToItemPurchase,
        {
          1: itemId.outBinds.ITEM_ID[0],
          2: itemPurchasePrice,
          3: null, //itemPurchaseDate,
          4: 1, //itemPurchasePrice
          5: itemAmount,
        },
        ["ITEM_PURCHASE_ID"]
      );

      if (!itemPurchaseId?.outBinds.ITEM_PURCHASE_ID)
        return res.json({
          status: 500,
          data: "Error in inserting data to tbl_item_purchase",
        });

      return res.json({
        status: 200,
        data: {
          ITEM_ID: itemId?.outBinds.ITEM_ID[0],
        },
      });
    } else {
      // update item table
      const itemResponse = await connection.insertExecute(
        stockItemQueries.updateItem,
        {
          1: itemCode,
          2: itemName,
          3: itemDesc,
          4: itemId,
        }
      );

      console.log(itemResponse);

      if (!itemResponse?.rowsAffected)
        return res.json({
          status: 500,
          data: "Error in updating data to tbl_items",
        });

      // update item stock data
      const stockId = await connection.insertExecute(
        stockItemQueries.updateItemToStock,
        {
          1: itemAmount,
          2: itemSellingPrice,
          3: itemId,
        }
      );

      if (!stockId?.rowsAffected)
        return res.json({
          status: 500,
          data: "Error in inserting data to tbl_stocks",
        });

      // update item purchase data
      const itemPurchaseId = await connection.insertExecute(
        stockItemQueries.updateItemToItemPurchase,
        {
          1: itemPurchasePrice,
          2: itemPurchaseDate,
          3: 1, //itemPurchasePrice
          4: itemAmount,
          5: itemId,
        }
      );

      if (!itemPurchaseId?.rowsAffected)
        return res.json({
          status: 500,
          data: "Error in updating data to tbl_item_purchase",
          updated: true,
        });

      return res.json({
        status: 200,
        data: "Item updated successfully !",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      status: 500,
      data: `Error ${error}`,
    });
  }
};
