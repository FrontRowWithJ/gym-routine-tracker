import { Handler } from "@netlify/functions";
import {
  ROUTINE_COLLECTION_NAME,
  OPTIONS_RESPONSE,
  ROUTINE_DB_NAME,
  JSON_HEADER,
  TEXT_PLAIN_HEADER,
} from "../src/constants";
import { getDatabase } from "../src/mongoClient";
import { Document, Routines } from "../src/types";
import { verifyToken } from "../src/security";

export const handler: Handler = async ({ httpMethod, headers }) => {
  switch (httpMethod) {
    case "OPTIONS":
      return OPTIONS_RESPONSE;
    case "GET":
      const hashedUsername = verifyToken(headers);
      if (!hashedUsername)
        return {
          statusCode: 401,
          body: "Unauthorized",
          headers: TEXT_PLAIN_HEADER,
        };
      const database = await getDatabase(ROUTINE_DB_NAME);
      const routinesCollection = database.collection<Document<Routines>>(
        ROUTINE_COLLECTION_NAME
      );

      const routinesDocument = (await routinesCollection.findOne({}))!;
      const routines = routinesDocument[hashedUsername];
      if (!routines)
        return {
          statusCode: 404,
          body: "Not Found",
          headers: TEXT_PLAIN_HEADER,
        };
      return {
        statusCode: 200,
        headers: JSON_HEADER,
        body: JSON.stringify(routines),
      };
    default:
      return {
        body: "Method not Allowed",
        statusCode: 405,
        headers: TEXT_PLAIN_HEADER,
      };
  }
};
