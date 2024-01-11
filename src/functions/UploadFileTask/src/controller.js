import createError from "http-errors";

import { uploadS3Object } from "/opt/s3-utils/index.js";

export default async (event) => {
  const { imageFile } = event.body;
  const { filename, content, mimetype } = imageFile;
  try {
    await uploadS3Object(filename, content, mimetype);
  } catch (error) {
    console.log("uploadS3Object error", error);
    const S3Error = new createError.InternalServerError(
      "Internal server error"
    );
    S3Error.expose = true;
    throw S3Error;
  }

  return {
    statusCode: 200,
    body: { message: "Image upload success" },
  };
};
