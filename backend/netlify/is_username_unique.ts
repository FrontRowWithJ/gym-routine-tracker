import { Handler } from "@netlify/functions";
import { getDatabase } from "../src/mongoClient";
import { ROUTINE_COLLECTION_NAME, TEXT_PLAIN_HEADER } from "../src/constants";
import { hashUsername } from "../src/security";

const statusCode = 200;
const ERROR_RESPONSE = {
  statusCode: 200,
  body: "false",
  headers: TEXT_PLAIN_HEADER,
} as const;

export const handler: Handler = async ({
  queryStringParameters,
  httpMethod,
}) => {
  switch (httpMethod) {
    case "GET":
      if (!queryStringParameters) return ERROR_RESPONSE;
      const username = queryStringParameters["username"];
      if (!username) return ERROR_RESPONSE;
      const database = await getDatabase();
      const collection = database.collection(ROUTINE_COLLECTION_NAME);
      const sanitisedUsername = username
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "");
      const query = { [hashUsername(sanitisedUsername)]: { $exists: true } };
      const result = await collection.findOne(query);
      return {
        statusCode,
        body: JSON.stringify(!result),
        headers: TEXT_PLAIN_HEADER,
      };
    default:
      return ERROR_RESPONSE;
  }
};
