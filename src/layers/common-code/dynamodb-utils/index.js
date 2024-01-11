import dynamodb from "./client.js";
import {
  PUT_PARAMS_TEMPLATE,
  GET_PARAMS_TEMPLATE,
  DELETE_PARAMS_TEMPLATE,
  UPDATE_PARAMS_TEMPLATE,
} from "./templates.js";
import { generateDynamoExpressions } from "./utils.js";

const TASK_TABLE = process.env.TASK_TABLE;

export const createDynamodbItem = async (objectItem) => {
  if (!objectItem) {
    throw new Error("No objectItem was provided");
  }

  const params = structuredClone(PUT_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.Item = objectItem;
  params.ReturnValues = "NONE";
  console.log("PARAMS --> ", JSON.stringify(params));

  await dynamodb.put(params);
};

export const queryDynamodbItem = async (pkName, pkValue) => {
  if (!pkName) {
    throw new Error("No pkName was provided");
  }
  if (!pkValue) {
    throw new Error("No pkValue was provided");
  }

  const params = structuredClone(GET_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.KeyConditionExpression = `${pkName} = :id`;
  params.ExpressionAttributeValues = {
    ":id": pkValue,
  };
  console.log("PARAMS --> ", JSON.stringify(params));

  const { Items } = await dynamodb.query(params);
  return Items;
};

export const deleteDynamodbItem = async (pkName, pkValue) => {
  if (!pkName) {
    throw new Error("No pkName was provided");
  }
  if (!pkValue) {
    throw new Error("No pkValue was provided");
  }

  const params = structuredClone(DELETE_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.Key = {
    [pkName]: pkValue,
  };

  console.log("PARAMS --> ", JSON.stringify(params));
  const result = await dynamodb.delete(params);
  return !!result?.Attributes;
};

export const updateDynamodbItem = async (pkName, pkValue, valuesObject) => {
  if (!pkName) {
    throw new Error("No pkName was provided");
  }
  if (!pkValue) {
    throw new Error("No pkValue was provided");
  }
  if (!valuesObject) {
    throw new Error("No valuesObject was provided");
  }

  const params = structuredClone(UPDATE_PARAMS_TEMPLATE);
  params.TableName = TASK_TABLE;
  params.Key = {
    [pkName]: pkValue,
  };

  const [expression, attributeNames, attributeValues] =
    generateDynamoExpressions(valuesObject);
  params.UpdateExpression = "SET " + expression;
  params.ExpressionAttributeNames = attributeNames;
  params.ExpressionAttributeValues = attributeValues;

  console.log("PARAMS --> ", JSON.stringify(params));
  const result = await dynamodb.update(params);
  return result?.Attributes;
};
