import { BaseResponse } from "./base/BaseResponse.mjs";
import { GuestbookController } from "./controllers/GuestbookController.mjs";
import { GuestbookRepository } from "./repository/GuestbookRepository.mjs";

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const guestbookRepository = new GuestbookRepository();
    const guestbookController = new GuestbookController(event, guestbookRepository);

    switch (event.httpMethod) {
        case "GET":
            return guestbookController.readGuestbook();
        case "POST":
            return guestbookController.createGuestbook();
        case "DELETE":
            return guestbookController.deleteGuestbook();
        default:
            return BaseResponse.from(405, {
                message: `Method Not Allowed : ${event.httpMethod}`,
                allowedMethods: ["GET", "POST", "DELETE"],
            });
    }
};
