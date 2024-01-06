const short = require("short-uuid");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = require("../services/dynamodbClient");

const TASK_TABLE = process.env.TASK_TABLE;

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request" }),
      };
    }

    let { name, description } = JSON.parse(event.body);

    let newTask = {
      id: short.generate(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: name,
      description: description,
      isDone: false,
    };

    console.log("NEWTASK --> ", newTask);

    const params = {
      TableName: TASK_TABLE,
      Item: newTask,
      ReturnValues: "NONE",
    };

    console.log("PARAMS WITH CREATE NEWTASK --> ", params);

    await ddbClient.send(new PutCommand(params));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Task created" }),
    };
  } catch (err) {
    console.log("Error inserting data", err.message);
  }
};
