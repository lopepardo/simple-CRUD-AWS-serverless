import createError from "http-errors";

import { deleteDynamodbItem } from "/opt/dynamodb-utils/index.js";

export default async (event) => {
  const { taskId } = event.body;

  let isDeleted;
  try {
    isDeleted = await deleteDynamodbItem("id", taskId);
  } catch (error) {
    console.log("deleteDynamodbItem error", error);
    const dynamoDBError = new createError.InternalServerError(
      "Internal server error"
    );
    dynamoDBError.expose = true;
    throw dynamoDBError;
  }

  if (!isDeleted) {
    throw new createError.NotFound("Task not found");
  }

  return {
    statusCode: 200,
    body: { message: "Task deleted" },
  };
};
