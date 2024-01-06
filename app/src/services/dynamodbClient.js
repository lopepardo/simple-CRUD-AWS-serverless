const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const dynamodbClient = new DynamoDBClient({ region: "us-east-1" });

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbClient = DynamoDBDocumentClient.from(dynamodbClient, translateConfig);

module.exports = ddbClient;
