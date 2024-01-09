import middy from "@middy/core";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";

import controller from "./src/controller.js";

const eventSchema = transpileSchema({
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["imageFile"],
      properties: {
        imageFile: { type: "object" },
      },
    },
  },
});

export const handler = middy()
  .use(httpMultipartBodyParser())
  .use(validator({ eventSchema }))
  .use(
    httpResponseSerializer({
      serializers: [
        {
          regex: /^application\/json$/,
          serializer: ({ body }) => JSON.stringify(body),
        },
      ],
      defaultContentType: "application/json",
    })
  )
  .use(httpErrorHandler())
  .handler(controller);
