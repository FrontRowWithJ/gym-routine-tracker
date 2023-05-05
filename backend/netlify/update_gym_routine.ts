import { Handler } from "@netlify/functions";
import {
  ROUTINE_COLLECTION_NAME,
  TEXT_PLAIN_HEADER,
  ROUTINE_DOCUMENT_QUERY,
  OPTIONS_RESPONSE,
  ROUTINE_DB_NAME,
} from "../src/constants";
import { getDatabase } from "../src/mongoClient";
import { Document, Routines } from "../src/types";
import { verifyToken } from "../src/security";

export const handler: Handler = async ({ httpMethod, body, headers }) => {
  switch (httpMethod) {
    case "OPTIONS":
      return OPTIONS_RESPONSE;
    case "POST":
      const hashedUsername = verifyToken(headers);
      if (!hashedUsername)
        return {
          statusCode: 401,
          body: "Unauthorized",
          headers: TEXT_PLAIN_HEADER,
        };
      const database = await getDatabase(ROUTINE_DB_NAME);
      if (!body)
        return {
          statusCode: 400,
          body: "Bad Request",
          headers: TEXT_PLAIN_HEADER,
        };
      const routines = JSON.parse(body) as Routines;
      await database
        .collection<Document<Routines>>(ROUTINE_COLLECTION_NAME)
        .updateOne(ROUTINE_DOCUMENT_QUERY, {
          $set: { [hashedUsername]: routines },
        });
      return { statusCode: 200, body: "Success", headers: TEXT_PLAIN_HEADER };
    default:
      return {
        statusCode: 405,
        headers: TEXT_PLAIN_HEADER,
        body: "Method not Allowed",
      };
  }
};
