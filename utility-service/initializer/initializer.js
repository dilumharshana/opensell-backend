import dbHandler from "../services/db-connector.js";

export const initializer = async () => {
  await dbHandler.connectDatabase();
};
