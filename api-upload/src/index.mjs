import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const BUCKET_NAME = "cms.knud2024.com";
const REGION = "ap-northeast-2";

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const requestBody = JSON.parse(event.body || "{}");

    const s3Client = new S3Client({ region: REGION });

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "index.json",
        ContentType: "application/json",
        Body: JSON.stringify(requestBody),
    });

    try {
        await s3Client.send(command);
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Failed to upload file",
                error: error.message || String(error),
            }),
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: "File uploaded successfully",
            data: requestBody,
        }),
    };
};
