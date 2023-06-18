export const generateUpdateQuery = (columnNames = [], values = []) => {
  let updateQuery = "";

  //all params are validate to be not null or empty
  if (columnNames.length === 0 || values.length === 0) return null;

  columnNames.forEach((targetColumn, index) => {
    updateQuery =
      updateQuery +
      `${targetColumn} = ${values[index]} ${
        columnNames.length - 1 === index ? "" : ","
      }`;
  });

  return updateQuery;
};
