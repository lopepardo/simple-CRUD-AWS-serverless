import dynamodb from "./client.js";
import { PUT_PARAMS_TEMPLATE, GET_PARAMS_TEMPLATE } from "./constants.js";

const TASK_TABLE = process.env.TASK_TABLE;

export const createItem = async (objectItem) => {
  const params = structuredClone(PUT_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.Item = objectItem;
  params.ReturnValues = "NONE";
  console.log("PARAMS --> ", JSON.stringify(params));

  await dynamodb.put(params);
};

export const getItemByPartitionKey = async (pkName, pkValue) => {
  const params = structuredClone(GET_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.KeyConditionExpression = `${pkName} = :id`;
  params.ExpressionAttributeValues = {
    ":id": pkValue,
  };
  console.log("PARAMS --> ", params);

  const { Items } = await dynamodb.query(params);
  return Items;
};

// const scanDynamodbTable = (params) => {
//   const dynamoDb = new AWS.DynamoDB.DocumentClient();
//   return new Promise((resolve, reject) => {
//     dynamoDb.scan(params, function (error, data) {
//       if (error) {
//         console.log(error);
//         const httpError = new ErrorHandler(
//           StatusCodes.SERVICE_UNAVAILABLE,
//           "Could not scan items from DynamoDB"
//         );
//         reject(httpError);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// const updateDynamodbItem = (updateParams) => {
//   const dynamoDb = new AWS.DynamoDB.DocumentClient();
//   return new Promise((resolve, reject) => {
//     dynamoDb.update(updateParams, function (error, data) {
//       if (error) {
//         console.log(error);
//         const httpError = new ErrorHandler(
//           StatusCodes.SERVICE_UNAVAILABLE,
//           "Could not update item"
//         );
//         reject(httpError);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };