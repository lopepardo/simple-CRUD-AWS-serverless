export const generateDynamoExpressions = (objectData) => {
  if (!objectData) {
    throw new Error("objectData is required");
  }
  if (typeof objectData !== "object") {
    throw new Error("objectData must be an object");
  }
  if (Object.keys(objectData).length === 0) {
    throw new Error("objectData must not be empty");
  }

  const expressionArray = [];
  const attributeNames = {};
  const attributeValues = {};

  Object.entries(objectData).forEach(([key, value]) => {
    expressionArray.push(`#${key} = :${key}`);
    attributeNames[`#${key}`] = key;
    attributeValues[`:${key}`] = value;
  });

  const expression = expressionArray.join(", ");

  return [expression, attributeNames, attributeValues];
};
