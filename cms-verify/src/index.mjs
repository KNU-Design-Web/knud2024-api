import jwt from "jsonwebtoken";
import { BaseResponse } from "./base/BaseResponse.mjs";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const token = event.headers.Authorization.split(" ")[1];

    try {
        jwt.verify(token, JWT_SECRET);
        return BaseResponse.from(200, { message: "Authorized" });
    } catch (error) {
        return BaseResponse.from(401, { message: "Unauthorized", error: error.message });
    }
};
