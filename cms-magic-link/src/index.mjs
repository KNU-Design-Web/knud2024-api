import { S3Service } from "./services/S3Service.mjs";
import { SESService } from "./services/SESService.mjs";
import { BaseResponse } from "./base/BaseResponse.mjs";
import { ConfigService } from "./services/ConfigService.mjs";

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const email = event.queryStringParameters.email;

    const configService = new ConfigService();
    const s3Service = new S3Service(configService);
    const sesService = new SESService(s3Service, configService, email);

    const isAuthenticated = await s3Service.isInWhiteList(email);

    if (!isAuthenticated) {
        return BaseResponse.from(403, { message: "UnAuthorized" });
    }

    try {
        const response = await sesService.sendMagicLink();

        return BaseResponse.from(200, {
            message: "Email sent successfully",
            response,
        });
    } catch (error) {
        return BaseResponse.from(500, {
            message: "Failed to send email",
            error: error.message,
        });
    }
};
