export const validateMandatoryData = (targetObject) => {
  //verify there is no null values or empty strings in the array if array received
  if (Array.isArray(targetObject)) {
    let validValue = true;

    for (let value of targetObject) {
      // check whether if value is a string
      const isStringValue = typeof value === "string";

      if (value === null || (isStringValue && value.trim() === "")) {
        validValue = false;
        break;
      }
    }

    return validValue;
  }

  return targetObject === null || targetObject.trim() === "" ? false : true;
};
