export const getSystemData = "SELECT NAME FROM TBL_SYSTEM";

export const stockItemQueries = {
  getAllStockItems: `SELECT A.*, B.STOCK_AMOUNT, B.SELLING_PRICE, C.ITEM_PURCHASED_PRICE, C.ITEM_PURCHASED_DATE
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
                        TBL_ITEM_PURCHASE (ITEM_ID, ITEM_PURCHASED_PRICE, ITEM_PURCHASED_DATE, ITEM_PURCHASED_BY, ITEM_AMOUNT ) 
                        VALUES (:1,:2,:3,:4,:5)`,

  updateItemToItemPurchase: `UPDATE
                          TBL_ITEM_PURCHASE SET ITEM_PURCHASED_PRICE =:1, ITEM_PURCHASED_DATE =:2,
                          ITEM_PURCHASED_BY =:3, 
                          ITEM_AMOUNT =:4 
                          WHERE ITEM_ID =:5`,
};
