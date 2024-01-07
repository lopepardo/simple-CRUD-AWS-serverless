import { StatusCodes } from "http-status-codes";

import { getItemByPartitionKey } from "../services/dynamodbManager.js";
import { sendResponse } from "../utils/apiGatewayUtils.js";

export async function handler(event) {
  try {
    if (!event.body || JSON.parse(event.body).tasksId?.length === 0) {
      return sendResponse(StatusCodes.BAD_REQUEST, {
        message: "Invalid request",
      });
    }

    const { tasksId } = JSON.parse(event.body);

    const item = await getItemByPartitionKey("id", tasksId);
    if (item.length === 0) {
      return sendResponse(StatusCodes.NOT_FOUND, {
        message: "No tasks found",
      });
    }

    console.log("QUERY RESULT --> ", item);
    return sendResponse(StatusCodes.OK, { data: item });
  } catch (err) {
    console.error("Failure in error handler", err);
    return sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: "Internal Server Error",
    });
  }
}
