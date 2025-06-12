import { handler } from "../src/index.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// @ts-ignore
const response = await handler({
    httpMethod: "GET",
    queryStringParameters: { take: "5" },
    body: null,
});

console.log("Response:", response);
