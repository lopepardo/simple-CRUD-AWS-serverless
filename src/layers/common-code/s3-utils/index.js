import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3 from "./client.js";

const BUCKET_NAME = process.env.BUCKET_NAME;

export const uploadFile = async (file) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: file.name,
    Body: file.data,
    ContentType: file.type,
  };
  console.log("PARAMS --> ", params);

  await s3.send(new PutObjectCommand(params));
};
