// Archivo principal que contiene el handler de la función Lambda.
// En este archivo, se realiza la preparación y configuración del entorno para el manejo de eventos Lambda.
// Aquí se deben realizar tareas que no están directamente relacionadas con la lógica de negocio,
// como validaciones, serialización de datos, etc., antes de pasar el control al controlador.

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
      required: ["tasksId"],
      properties: {
        tasksId: { type: "string" },
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
