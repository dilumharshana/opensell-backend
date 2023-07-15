import { connection } from "../../utility-service/index.js";
import { saleQueries } from "../constants/db-queries.js";

export const get_sales_data = async (req, res) => {
  const response = await connection.selectExecute(saleQueries.getSalesData, []);

  if (response?.rows) {
    const saleData = {};

    response?.rows?.forEach((sale) => {
      const targetSale = sale?.SALE_ID;

      if (saleData.hasOwnProperty(targetSale)) {
        //adding selled items in to a existing sale in saleData object
        const salesItemsArray = saleData[targetSale].ITEMS;

        saleData[targetSale].ITEMS[salesItemsArray.length] = {
          ITEM_NAME: sale?.ITEM_NAME,
          QUANTITY: sale?.QUANTITY,
          ITEM_CODE: sale?.ITEM_CODE,
        };

        return;
      }

      const saleDataObject = {
        SALE_ID: targetSale,
        RECIVED_CASH: sale?.RECIVED_CASH,
        DISCOUNT: sale?.DISCOUNT,
        SALE_DATE: sale?.SALE_DATE,
        SELLED_BY: sale?.SELLED_BY,
        ITEMS: [
          {
            ITEM_NAME: sale?.ITEM_NAME,
            QUANTITY: sale?.QUANTITY,
            ITEM_CODE: sale?.ITEM_CODE,
          },
        ],
      };

      //appending first item in to sales data object
      saleData[sale?.SALE_ID] = saleDataObject;
    });

    return res.json({
      status: 200,
      data: saleData,
    });
  }

  return res.json({
    status: 500,
    data: "Faild to load sales !",
  });
};
