const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = require("../services/dynamodbClient");

const TASK_TABLE = process.env.TASK_TABLE;

exports.updateTask = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    let request = JSON.parse(event.body);

    const params = {
      TableName: TASK_TABLE,
      Key: {
        id: request.id,
      },
      UpdateExpression:
        "set #name = :name, #description = :description, #updatedAt = :updatedAt, #isDone = :isDone",
      ExpressionAttributeNames: {
        "#name": "name",
        "#description": "description",
        "#updatedAt": "updatedAt",
        "#isDone": "isDone",
      },
      ExpressionAttributeValues: {
        ":name": request.name,
        ":description": request.description,
        ":updatedAt": new Date().toISOString(),
        ":isDone": request.isDone,
      },
    };

    console.log("PARAMS TO UPDATE --> ", params);

    await ddbClient.send(new UpdateCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task updated" }),
    };
  } catch (err) {
    console.log("Error during update", err.message);
  }
};
