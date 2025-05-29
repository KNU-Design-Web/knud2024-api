import { handler } from "../src/index.mjs";
import dotenv from "dotenv";

dotenv.config();

// @ts-ignore
const response = await handler({
    queryStringParameters: {
        email: "toothless042@gmail.com",
    },
});

console.log(response);
