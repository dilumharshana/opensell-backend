import OracleDB from "OracleDB";

// service related to get database connection

class DatabaseHandler {
  constructor() {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = this;
    }

    return DatabaseHandler.instance;
  }

  // db connector function
  async connectDatabase() {
    let connection = null;
    try {
      console.log(process.env.DATABASE_USER);
      connection = await this.createDatabaseConnection().then(
        (oracleDbConnection) => {
          this.connection = oracleDbConnection;
          console.log(
            `Server is running on http://localhost:${process.env.port}/`
          );
          console.log("Connected to database ...");
        }
      );
    } catch (error) {
      console.log(`Error in connecting to db : ${error}`);
    } finally {
      this.closeDatabaseConnection(this.connection);
    }
  }

  createDatabaseConnection() {
    return OracleDB.getConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      connectionString: process.env.CONNECTION_STRING,
    });
  }

  closeDatabaseConnection(connection) {
    connection.close();
  }

  //Commit connection
  async commitConnection(connection) {
    await connection.commit();
  }

  //Select Data
  async selectExecute(query, data) {
    let connection;
    try {
      connection = await this.createDatabaseConnection();

      const result = await connection.execute(query, data, {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      });

      return result;
    } catch (err) {
      // logger.logError(`DB Select Execute: ${err}`);
      console.log(err);
      return null;
    } finally {
      //close db connection
      if (connection) {
        try {
          await this.closeDatabaseConnection(connection);
        } catch (errDBClose) {
          console.log(`Database error : ${err}`);
          return null;
        }
      }
    }
  }

  //Insert Data
  async insertExecute(query, data, returnValues = false) {
    let connection, setQuery, setData;
    try {
      connection = await this.createDatabaseConnection();

      setData = data;
      //if return values needed
      if (returnValues) {
        let tempReturnValuesWithComma = returnValues.join(", ");
        let tempReturnValuesWithColon = returnValues.join(", :");

        returnValues.map((value) => {
          setData = {
            ...setData,
            ...{ [value]: { dir: OracleDB.BIND_OUT } }, //{ type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT }
          }; //{}
        });

        setQuery = `${query} RETURNING ${tempReturnValuesWithComma} INTO :${tempReturnValuesWithColon}`;
      }
      //without return values
      else {
        setQuery = query;
      }

      const result = await connection.execute(setQuery, setData);

      await this.commitConnection(connection);
      return result;
    } catch (err) {
      console.log(`Database error : ${err}`);
      return null;
    } finally {
      //close db connection
      if (connection) {
        try {
          await this.closeDatabaseConnection(connection);
        } catch (errDBClose) {
          console.log(`Database error : ${err}`);
          return null;
        }
      }
    }
  }

  //Insert Many Data
  async insertExecuteMany(query, data, returnValues = false) {
    let connection, setQuery, setData;
    try {
      connection = await this.createDatabaseConnection();

      setData = data;
      //if return values needed
      if (returnValues) {
        let tempReturnValuesWithComma = returnValues.join(", ");
        let tempReturnValuesWithColon = returnValues.join(", :");

        returnValues.map((value) => {
          setData = {
            ...setData,
            ...{ [value]: { dir: OracleDB.BIND_OUT } }, //{ type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT }
          }; //{}
        });

        setQuery = `${query} RETURNING ${tempReturnValuesWithComma} INTO :${tempReturnValuesWithColon}`;
      }
      //without return values
      else {
        setQuery = query;
      }

      const result = await connection.executeMany(setQuery, setData);

      await this.commitConnection(connection);
      return result;
    } catch (err) {
      console.log(`Database error : ${err}`);
      return null;
    } finally {
      //close db connection
      if (connection) {
        try {
          await this.closeDatabaseConnection(connection);
        } catch (errDBClose) {
          console.log(`Database error : ${err}`);
          return null;
        }
      }
    }
  }

  //Handle transactions
  // async executeTransaction(transactionFunction) {
  //   let connection;
  //   try {
  //     connection = await this.createDatabaseConnection();

  //     //executing queries that are parsing
  //     transactionFunction();

  //     await this.commitConnection(connection);
  //   } catch (err) {
  //     console.log(`Database error : ${err}`);
  //     return null;
  //   } finally {
  //     //close db connection
  //     if (connection) {
  //       try {
  //         await this.closeDatabaseConnection(connection);
  //       } catch (errDBClose) {
  //         console.log(`Database error : ${err}`);
  //         return null;
  //       }
  //     }
  //   }
  // }
}

const dbHandler = new DatabaseHandler();
export default dbHandler;
