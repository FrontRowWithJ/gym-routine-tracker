import { Handler } from "@netlify/functions";
import { TEXT_PLAIN_HEADER } from "../src/constants";
import { genCookieString } from "../src/security";

export const handler: Handler = async () => ({
  statusCode: 200,
  headers: {
    ...TEXT_PLAIN_HEADER,
    "Set-Cookie": genCookieString(""),
  },
});
