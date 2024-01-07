import { getParamsTemplate } from "../utils/dynamodbUtils.js";
import dynamodb from "./dynamodbClient.js";

const TASK_TABLE = process.env.TASK_TABLE;

// const putDynamodbItem = (params) => {
//   const dynamoDb = new AWS.DynamoDB.DocumentClient();
//   return new Promise((resolve, reject) => {
//     dynamoDb.put(params, (error, data) => {
//       if (error) {
//         console.log(error);
//         const httpError = new ErrorHandler(
//           StatusCodes.SERVICE_UNAVAILABLE,
//           "Could not put item to DynamoDB"
//         );
//         reject(httpError);
//       } else {
//         resolve(params);
//       }
//     });
//   });
// };

export async function getItemByPartitionKey(pkName, pkValue) {
  const params = structuredClone(getParamsTemplate);
  params.TableName = TASK_TABLE;
  params.KeyConditionExpression = `${pkName} = :id`;
  params.ExpressionAttributeValues = {
    ":id": pkValue,
  };
  const { Items } = await dynamodb.query(params);
  return Items;
}

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
