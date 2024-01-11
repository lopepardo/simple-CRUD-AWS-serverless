import { updateDynamodbItem } from "/opt/dynamodb-utils/index.js";

export default async (event) => {
  if (!event?.Records) {
    throw new Error("Records is required");
  }

  const Records = event.Records;
  for (const record of Records) {
    const { bucket, object } = record.s3;

    const taskId = object.key.split(".")[0];
    const valuesObject = {
      attachmentUrl: `https://${bucket.name}.s3.amazonaws.com/${object.key}`,
      isDone: true,
    };

    try {
      await updateDynamodbItem("id", taskId, valuesObject);
    } catch (err) {
      console.error("updateDynamodbItem error", err);
    }
  }

  return {
    menssage: "Task updated successfully",
  };
};
