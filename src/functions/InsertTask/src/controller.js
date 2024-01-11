import shortUUID from "short-uuid";
import createError from "http-errors";

import { createDynamodbItem } from "/opt/dynamodb-utils/index.js";

export default async (event) => {
  let { name, description } = event.body;

  let newTask = {
    id: shortUUID.generate(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name,
    description,
    isDone: false,
  };

  try {
    await createDynamodbItem(newTask);
  } catch (err) {
    console.error("createDynamodbItem error", err);
    const dynamoDBError = new createError.InternalServerError(
      "Internal server error"
    );
    dynamoDBError.expose = true;
    throw dynamoDBError;
  }

  return {
    statusCode: 200,
    body: { message: "Task created" },
  };
};
