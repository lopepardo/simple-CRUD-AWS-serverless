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
  UpdateExpression: null,
  ExpressionAttributeNames: null,
  ExpressionAttributeValues: null,
  ReturnValues: "ALL_NEW",
};

export const DELETE_PARAMS_TEMPLATE = {
  TableName: null,
  Key: null,
  ReturnValues: "ALL_OLD",
};
