import { Handler } from "@netlify/functions";
import { getDatabase } from "../src/mongoClient";
import { RegisterBody, Document, Credentials, Routines } from "../src/types";
import {
  genSalt,
  genTokenCookie,
  hashPassword,
  hashUsername,
} from "../src/security";
import {
  ROUTINE_COLLECTION_NAME,
  CREDENTIALS_COLLECTION_NAME,
  CREDENTIALS_DB_NAME,
  ROUTINE_DB_NAME,
  OPTIONS_RESPONSE,
  ROUTINES,
  TEXT_PLAIN_HEADER,
} from "../src/constants";

export const handler: Handler = async ({ body, httpMethod }) => {
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
      const parsedBody = JSON.parse(body) as RegisterBody;
      const username = parsedBody["username"];
      const password = parsedBody["password"];
      if (!username || !password)
        return {
          statusCode: 400,
          body: "Bad Request",
          headers: TEXT_PLAIN_HEADER,
        };
      const database = await getDatabase(CREDENTIALS_DB_NAME);
      const credentialsCollection = database.collection<Document<Credentials>>(
        CREDENTIALS_COLLECTION_NAME
      );

      const hashedUsername = hashUsername(username.trim().toLowerCase());
      const credentialsDocument = await credentialsCollection.findOne({});

      if (!credentialsDocument)
        return {
          statusCode: 500,
          body: "Credentials Document Not Found",
          headers: TEXT_PLAIN_HEADER,
        };
      if (credentialsDocument[hashedUsername])
        return {
          statusCode: 409,
          body: "User Already Exists",
          headers: TEXT_PLAIN_HEADER,
        };

      const salt = await genSalt();
      const hashedPassword = await hashPassword(
        salt,
        password,
        process.env["PEPPER"]!
      );
      const credentials: Credentials = { password: hashedPassword, salt };
      const update = { $set: { [hashedUsername]: credentials } };
      await credentialsCollection.updateOne({}, update);

      const routineDb = await getDatabase(ROUTINE_DB_NAME);
      const routinesCollection = routineDb.collection<Document<Routines>>(
        ROUTINE_COLLECTION_NAME
      );
      await routinesCollection.updateOne({}, [
        { $set: { [hashedUsername]: ROUTINES } },
      ]);
      return {
        statusCode: 200,
        headers: {
          ...TEXT_PLAIN_HEADER,
          "Set-Cookie": genTokenCookie(hashedUsername),
        },
        body: "OK",
      };
    default:
      return {
        statusCode: 405,
        headers: TEXT_PLAIN_HEADER,
        body: "Method Not Allowed",
      };
  }
};
