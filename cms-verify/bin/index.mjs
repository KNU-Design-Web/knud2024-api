import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { handler } from "../src/index.mjs";

dotenv.config({ path: ".env" });

const JWT_SECRET = process.env.JWT_SECRET;

const success = jwt.sign({ email: "test@gmail.com" }, JWT_SECRET, {
    expiresIn: "1h",
});

// @ts-ignore
const response = await handler({
    headers: {
        Authorization: `Bearer ${success}`,
    },
});

console.log(response);
