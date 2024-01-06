const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../middlewares/errorHandlerMiddleware");

const putDynamodbItem = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log(error);
        const httpError = new ErrorHandler(
          StatusCodes.SERVICE_UNAVAILABLE,
          "Could not put item to DynamoDB"
        );
        reject(httpError);
      } else {
        resolve(params);
      }
    });
  });
};

const getDynamodbItem = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.query(params, function (error, data) {
      if (error) {
        console.log(error);
        const httpError = new ErrorHandler(
          StatusCodes.SERVICE_UNAVAILABLE,
          "Could not get item from DynamoDB"
        );
        reject(httpError);
      } else {
        resolve(data);
      }
    });
  });
};

const scanDynamodbTable = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.scan(params, function (error, data) {
      if (error) {
        console.log(error);
        const httpError = new ErrorHandler(
          StatusCodes.SERVICE_UNAVAILABLE,
          "Could not scan items from DynamoDB"
        );
        reject(httpError);
      } else {
        resolve(data);
      }
    });
  });
};

const updateDynamodbItem = (updateParams) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    dynamoDb.update(updateParams, function (error, data) {
      if (error) {
        console.log(error);
        const httpError = new ErrorHandler(
          StatusCodes.SERVICE_UNAVAILABLE,
          "Could not update item"
        );
        reject(httpError);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  putDynamodbItem,
  getDynamodbItem,
  updateDynamodbItem,
  scanDynamodbTable,
};
