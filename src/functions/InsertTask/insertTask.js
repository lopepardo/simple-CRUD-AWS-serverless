import { StatusCodes } from "http-status-codes";
import short from "short-uuid";

import { createItem } from "/opt/dynamodb-utils/index.js";

export const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    let { name, description } = JSON.parse(event.body);

    let newTask = {
      id: short.generate(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name,
      description,
      isDone: false,
    };

    await createItem(newTask);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify({ message: "Task created" }),
    };
  } catch (err) {
    console.error("Failure in error handler", err);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
