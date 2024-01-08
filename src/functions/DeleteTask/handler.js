import middy from "@middy/core";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { transpileSchema } from "@middy/validator/transpile";
import httpResponseSerializer from "@middy/http-response-serializer";

import controller from "./src/controller.js";

const eventSchema = transpileSchema({
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["taskId"],
      properties: {
        taskId: { type: "string" },
      },
    },
  },
});

export const handler = middy()
  .use(httpJsonBodyParser())
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
