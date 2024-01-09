import createError from "http-errors";

import { uploadFile } from "/opt/s3-utils/index.js";

export default async (event) => {
  const { imageFile } = event.body;

  try {
    await uploadFile({
      name: imageFile.filename,
      data: imageFile.content,
      type: imageFile.mimetype,
    });
  } catch (error) {
    console.log("uploadFile error", error);
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
