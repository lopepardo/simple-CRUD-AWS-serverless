export const PUT_PARAMS_TEMPLATE = {
  TableName: null,
  Item: null,
  ReturnValues: null,
};

export const GET_PARAMS_TEMPLATE = {
  TableName: null,
  IndexName: null,
  KeyConditionExpression: null,
  ExpressionAttributeNames: null,
  ExpressionAttributeValues: null,
};

export const UPDATE_PARAMS_TEMPLATE = {
  TableName: null,
  Key: null,
  UpdateExpression: "SET ",
  ExpressionAttributeNames: null,
  ExpressionAttributeValues: null,
  ReturnValues: "ALL_NEW",
};

export const DELETE_PARAMS_TEMPLATE = {
  TableName: null,
  IndexName: null,
  KeyConditionExpression: null,
  ExpressionAttributeValues: null,
  FilterExpression: null,
  ProjectionExpression: null,
  ScanIndexForward: null,
};

// export const generateDynamoExpressions = (objectData) => {
//   let expression = "";
//   let attributeNames = {};
//   let attributeValues = {};

//   const entries = Object.entries(objectData);

//   entries.forEach((e) => {
//     if (objectData[e[0]] !== undefined) {
//       expression += `#${e[0]} = :${e[0]},`;
//       attributeNames[`#${e[0]}`] = e[0];
//       attributeValues[`:${e[0]}`] = objectData[e[0]];
//     }
//   });

//   expression = expression.slice(0, -1);

//   return [expression, attributeNames, attributeValues];
// };
