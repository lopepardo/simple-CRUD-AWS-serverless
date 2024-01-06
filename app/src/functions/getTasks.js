const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = require("../services/dynamodbClient");

const TASK_TABLE = process.env.TASK_TABLE;

exports.handler = async (event) => {
  try {
    if (!event.body || JSON.parse(event.body).tasksId?.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    const { tasksId } = JSON.parse(event.body);
    const dynamodbPromises = tasksId.map(async (idTask) => {
      const params = {
        TableName: TASK_TABLE,
        KeyConditionExpression: "id = :idTask",
        ExpressionAttributeValues: {
          ":idTask": idTask,
        },
      };
      // TODO: study how to use dynamoDB client
      return ddbClient.send(new QueryCommand(params));
    });

    const promiseResponse = await Promise.all(dynamodbPromises);
    console.log("QUERY RESULT --> ", promiseResponse);

    const Items = promiseResponse
      .filter((item) => !!item.Items.length)
      .map((item) => item.Items[0]);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: Items }),
    };
  } catch (err) {
    console.log("Failure", err.message);
  }
};
