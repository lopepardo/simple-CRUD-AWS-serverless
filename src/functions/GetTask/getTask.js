import { StatusCodes } from "http-status-codes";

import { getItemByPartitionKey } from "/opt/dynamodb-utils/index.js";

export const handler = async (event) => {
  try {
    if (!event.body || JSON.parse(event.body).tasksId?.length === 0) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    const { tasksId } = JSON.parse(event.body);

    const item = await getItemByPartitionKey("id", tasksId);
    if (item.length === 0) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: JSON.stringify({ message: "No tasks found" }),
      };
    }

    console.log("QUERY RESULT --> ", item);
    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify({ data: item }),
    };
  } catch (err) {
    console.error("Failure in error handler", err);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
