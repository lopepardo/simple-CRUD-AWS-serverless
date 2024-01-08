import createError from "http-errors";

import { deleteItem } from "/opt/dynamodb-utils/index.js";

export default async (event) => {
  const { taskId } = event.body;

  let isDeleted;
  try {
    isDeleted = await deleteItem("id", taskId);
  } catch (error) {
    console.log("deleteItem error", error);
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
