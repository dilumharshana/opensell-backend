import dbHandler from "../../utility-service/services/db-connector.js";
import { getSystemData } from "../constants/db-queries.js";

export const get_system_data = async (req, res) => {
  const name = await dbHandler.connection.execute(getSystemData, []);
  console.log(name);
};
