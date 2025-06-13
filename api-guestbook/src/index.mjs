import { BaseResponse } from "./base/BaseResponse.mjs";
import { GuestbookController } from "./controllers/GuestbookController.mjs";
import { GuestbookRepository } from "./repository/GuestbookRepository.mjs";

/**
 * @param {import("aws-lambda").APIGatewayProxyEventV2} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const httpMethod = event.requestContext.http.method;

    const guestbookRepository = new GuestbookRepository();
    const guestbookController = new GuestbookController(event, guestbookRepository);

    switch (httpMethod) {
        case "GET":
            return guestbookController.readGuestbook();
        case "POST":
            return guestbookController.createGuestbook();
        case "DELETE":
            return guestbookController.deleteGuestbook();
        default:
            return BaseResponse.from(405, {
                message: `Method Not Allowed : ${httpMethod}`,
            });
    }
};
