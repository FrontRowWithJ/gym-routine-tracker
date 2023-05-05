import { Handler } from "@netlify/functions";
import { getDatabase } from "../src/mongoClient";
import {
  CREDENTIALS_COLLECTION_NAME,
  CREDENTIALS_DB_NAME,
  JSON_HEADER,
  OPTIONS_RESPONSE,
  TEXT_PLAIN_HEADER,
} from "../src/constants";
import { compare, genTokenCookie, hashUsername } from "../src/security";
import { Credentials, Document, LoginBody } from "../src/types";

export const handler: Handler = async ({ httpMethod, body }) => {
  switch (httpMethod) {
    case "OPTIONS":
      return OPTIONS_RESPONSE;

    case "POST":
      if (!body)
        return {
          statusCode: 400,
          body: "Bad Request",
          headers: TEXT_PLAIN_HEADER,
        };
      const parsedBody = JSON.parse(body) as LoginBody;
      const username = parsedBody["username"];
      const password = parsedBody["password"];
      if (!username || !password)
        return {
          statusCode: 400,
          body: "Bad Request",
          headers: TEXT_PLAIN_HEADER,
        };
      const credentialsDatabase = await getDatabase(CREDENTIALS_DB_NAME);
      const credentialsCollection = credentialsDatabase.collection<
        Document<Credentials>
      >(CREDENTIALS_COLLECTION_NAME);
      const credentialsDocument = await credentialsCollection.findOne({});
      if (!credentialsDocument)
        return {
          statusCode: 500,
          body: "Credentials Document Not Found",
          headers: TEXT_PLAIN_HEADER,
        };
      const hashedUsername = hashUsername(username.trim().toLowerCase());
      const credentials = credentialsDocument[hashedUsername];
      if (!credentials)
        return {
          statusCode: 401,
          body: "Unauthorized",
          headers: TEXT_PLAIN_HEADER,
        };
      const hashedPassword = credentials["password"];
      const comparison = await compare(
        password,
        hashedPassword,
        process.env["PEPPER"]!
      );
      if (!comparison)
        return {
          statusCode: 401,
          body: "Unauthorized",
          headers: TEXT_PLAIN_HEADER,
        };
      return {
        statusCode: 200,
        headers: { ...JSON_HEADER, "Set-Cookie": genTokenCookie(hashedUsername) },
      };

    default:
      return {
        statusCode: 405,
        headers: TEXT_PLAIN_HEADER,
        body: "Method not Allowed",
      };
  }
};
