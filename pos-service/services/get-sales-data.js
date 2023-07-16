import { connection } from "../../utility-service/index.js";
import { saleQueries } from "../constants/db-queries.js";

export const get_sales_data = async (req, res) => {
  const saleId = req?.query?.saleId || null;

  //ifsinle sale request
  if (saleId) {
    const response = await connection.selectExecute(
      saleQueries.getSingleSaleData,
      {
        1: saleId,
      }
    );

    if (response?.rows) {
      const saleData = await prepareSaleData(response?.rows);

      return res.json({
        status: 200,
        data: saleData?.[saleId],
      });
    }

    return res.json({
      status: 500,
      data: "Faild to load sales !",
    });
  }

  const response = await connection.selectExecute(saleQueries.getSalesData, {});

  if (response?.rows) {
    const saleData = await prepareSaleData(response?.rows);

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

const prepareSaleData = (data) => {
  const saleData = {};

  data?.forEach((sale) => {
    const targetSale = sale?.SALE_ID;

    if (saleData.hasOwnProperty(targetSale)) {
      //adding selled items in to a existing sale in saleData object
      const salesItemsArray = saleData[targetSale].ITEMS;

      saleData[targetSale].ITEMS[salesItemsArray.length] = {
        ITEM_NAME: sale?.ITEM_NAME,
        QUANTITY: sale?.QUANTITY,
        ITEM_CODE: sale?.ITEM_CODE,
        SELLED_PRICE: sale?.SELLED_PRICE,
        SALE_DATE:sale?.SALE_DATE
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
          SELLED_PRICE: sale?.SELLED_PRICE,
        },
      ],
    };

    //appending first item in to sales data object
    saleData[sale?.SALE_ID] = saleDataObject;

  });
  
  return saleData
};
