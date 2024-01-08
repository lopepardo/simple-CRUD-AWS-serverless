// Archivo principal que contiene la lógica de negocio después del handler de la función Lambda.
// En este archivo, se realiza la lógica específica de la aplicación relacionada con el evento Lambda recibido.
// Aquí se pueden realizar diversas tareas, como validaciones, solicitudes a otras APIs, llamadas a servicios de AWS,
// y la preparación y retorno de la respuesta final.

import createError from "http-errors";

import { getItemByPartitionKey } from "/opt/dynamodb-utils/index.js";

export default async (event) => {
  const { taskId } = event.body;

  let item;
  try {
    item = await getItemByPartitionKey("id", taskId);
  } catch (error) {
    console.log("getItemByPartitionKey error", error);
    const dynamoDBError = new createError.InternalServerError(
      "Internal server error"
    );
    dynamoDBError.expose = true;
    throw dynamoDBError;
  }

  if (item.length === 0) {
    throw new createError.NotFound("No tasks found");
  }

  console.log("QUERY RESULT --> ", item);
  return {
    statusCode: 200,
    body: { data: item },
  };
};
