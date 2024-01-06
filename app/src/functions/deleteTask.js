const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = require("../services/dynamodbClient");

const TASK_TABLE = process.env.TASK_TABLE;

exports.deleteTask = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    // TODO: Change logic to delete list of tasks
    let { taskId } = JSON.parse(event.body);

    const params = {
      TableName: TASK_TABLE,
      Key: {
        id: taskId,
      },
    };

    console.log("PARAMS TO DELETE --> ", params);

    await ddbClient.send(new DeleteCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task deleted" }),
    };
  } catch (err) {
    console.log("Error during delete", err.message);
  }
};
