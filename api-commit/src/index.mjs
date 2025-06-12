import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

const REGION = "ap-northeast-2";
const DISTRIBUTION_ID = "E87ULND0END4M";
const INVALIDATION_PATHS = ["/index.json"];

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const cloudfrontClient = new CloudFrontClient({ region: REGION });

    const cloudfrontInvalidationCommand = new CreateInvalidationCommand({
        DistributionId: DISTRIBUTION_ID,
        InvalidationBatch: {
            CallerReference: `cms-commit-${Date.now()}`,
            Paths: {
                Quantity: INVALIDATION_PATHS.length,
                Items: INVALIDATION_PATHS,
            },
        },
    });

    try {
        await cloudfrontClient.send(cloudfrontInvalidationCommand);
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Failed to create CloudFront invalidation",
                error: error.message || String(error),
            }),
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: "CloudFront invalidation created successfully",
            paths: INVALIDATION_PATHS,
        }),
    };
};
