import middy from "@middy/core";
import eventNormalizer from "@middy/event-normalizer";

import controller from "./src/controller.js";

export const handler = middy().use(eventNormalizer()).handler(controller);
