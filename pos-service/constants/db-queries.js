export const getSystemData = "SELECT NAME FROM TBL_SYSTEM";

export const stockItemQueries = {
  getAllStockItems: `SELECT A.*, B.STOCK_AMOUNT, B.SELLING_PRICE, C.PURCHASED_PRICE, C.PURCHASED_DATE
                    from TBL_ITEMS A  
                    INNER JOIN TBL_STOCKS B 
                    ON A.ITEM_ID = B.ITEM_ID 
                    INNER JOIN TBL_ITEM_PURCHASE C 
                    ON A.ITEM_ID = C.ITEM_ID`,

  addItem: `INSERT INTO
            TBL_ITEMS (ITEM_CODE, ITEM_NAME, ITEM_DESC) 
            VALUES (:1,:2,:3)`,

  updateItem: `UPDATE
               TBL_ITEMS 
               SET ITEM_CODE =:1, ITEM_NAME =:2, ITEM_DESC =:3 
               WHERE ITEM_ID =:4`,

  addItemToStock: `INSERT INTO
                   TBL_STOCKS (ITEM_ID, STOCK_AMOUNT,SELLING_PRICE) 
                   VALUES (:1,:2,:3)`,

  updateItemToStock: `UPDATE
                      TBL_STOCKS SET STOCK_AMOUNT=:1, SELLING_PRICE=:2
                      WHERE ITEM_ID =:3`,

  addItemToItemPurchase: `INSERT INTO
                        TBL_ITEM_PURCHASE (ITEM_ID, PURCHASED_PRICE, PURCHASED_DATE, PURCHASED_BY, AMOUNT ) 
                        VALUES (:1,:2,:3,:4,:5)`,

  updateItemToItemPurchase: `UPDATE
                          TBL_ITEM_PURCHASE SET PURCHASED_PRICE =:1, PURCHASED_DATE =:2,
                          PURCHASED_BY =:3, 
                          AMOUNT =:4 
                          WHERE ITEM_ID =:5`,
};

export const saleQueries = {
  insetSell: `INSERT INTO TBL_SALES (SELLED_BY, RECIVED_CASH, DISCOUNT) VALUES (:1,:2,:3)`,
  insetSellItems: `INSERT INTO TBL_SALES_ITEMS (SALE_ID, ITEM_ID, QUANTITY, SELLD_PRICE) VALUES (:1,:2,:3,:4)`,
  updateStockItems: `UPDATE TBL_STOCKS SET STOCK_AMOUNT =:1 WHERE ITEM_ID =:2`,
  getSalesData: `SELECT A.*, B.*, C.ITEM_NAME, C.ITEM_CODE FROM TBL_SALES A INNER JOIN TBL_SALES_ITEMS B ON A.SALE_ID = B.SALE_ID INNER JOIN TBL_ITEMS C ON B.ITEM_ID = C.ITEM_ID`,
  getSalesDataByDate: `SELECT A.*, B.*, C.ITEM_NAME, C.ITEM_CODE FROM TBL_SALES A INNER JOIN TBL_SALES_ITEMS B ON A.SALE_ID = B.SALE_ID INNER JOIN TBL_ITEMS C ON B.ITEM_ID = C.ITEM_ID
                      WHERE A.SALE_DATE = :1`,
  getSingleSaleData: `SELECT A.*, B.*, C.ITEM_NAME, C.ITEM_CODE FROM TBL_SALES A INNER JOIN TBL_SALES_ITEMS B ON A.SALE_ID = B.SALE_ID INNER JOIN TBL_ITEMS C ON B.ITEM_ID = C.ITEM_ID 
                      WHERE A.SALE_ID =:1`,
};
