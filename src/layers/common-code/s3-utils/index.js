import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { writeFileSync } from "fs";

import s3 from "./client.js";

const BUCKET_NAME = process.env.BUCKET_NAME;

export const uploadS3Object = async (
  fileName,
  body,
  contentType,
  path = ""
) => {
  if (!fileName) {
    throw new Error("No fileName was provided");
  }
  if (!body) {
    throw new Error("No body was provided");
  }
  if (!contentType) {
    throw new Error("No contentType was provided");
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: path + fileName,
    Body: body,
    ContentType: contentType,
  };
  console.log("PARAMS --> ", params);

  await s3.send(new PutObjectCommand(params));
};

export const getS3Object = async (fileName, path = "") => {
  if (!fileName) {
    throw new Error("No fileName was provided");
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: path + fileName,
  };
  console.log("PARAMS --> ", params);

  const data = await s3.send(new GetObjectCommand(params));
  return data?.Body;
};

export const downloadS3Object = async (fileName, path = "") => {
  if (!fileName) {
    throw new Error("No fileName was provided");
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: path + fileName,
  };
  console.log("PARAMS --> ", params);

  const data = await s3.send(new GetObjectCommand(params));
  await writeFileSync("./tmp/" + fileName, data.Body);
  return "./tmp/" + fileName;
};

export const listS3Objects = async () => {
  const params = {
    Bucket: BUCKET_NAME,
  };
  console.log("PARAMS --> ", params);

  const data = await s3.send(new ListObjectsV2Command(params));
  return data?.Contents;
};

export const deleteS3Object = async (fileName, path = "") => {
  if (!fileName) {
    throw new Error("No fileName was provided");
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: path + fileName,
  };
  console.log("PARAMS --> ", params);

  await s3.send(new DeleteObjectCommand(params));
};

// TODO: This works?
export const uploadS3ObjectWithPresignedUrl = async () => {
  const params = {
    Bucket: BUCKET_NAME,
  };

  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(command, { expiresIn: 3600 });
  return url;
};
