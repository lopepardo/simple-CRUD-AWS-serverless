const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = require("../services/dynamodbClient");

const TASK_TABLE = process.env.TASK_TABLE;

exports.handler = async (event) => {
  try {
    const params = {
      TableName: TASK_TABLE,
    };

    const { Items } = await ddbClient.send(new ScanCommand(params));
    console.log("SCAN RESULT --> ", Items);
    return {
      statusCode: 200,
      body: JSON.stringify({ data: Items }),
    };
  } catch (err) {
    console.log("Failure", err.message);
  }
};
