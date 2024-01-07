import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dynamodbClient = new DynamoDB({ region: process.env.REGION });

const dynamodb = DynamoDBDocument.from(dynamodbClient);

export default dynamodb;
