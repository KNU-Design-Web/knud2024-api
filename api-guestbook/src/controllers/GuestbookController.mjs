import { BaseResponse } from "../base/BaseResponse.mjs";
import { GuestbookRepository } from "../repository/GuestbookRepository.mjs";

export class GuestbookController {
    /**
     * @param {import("aws-lambda").APIGatewayEvent} event
     * @param {GuestbookRepository} guestbookRepository
     */
    constructor(event, guestbookRepository) {
        this.event = event;
        this.guestbookRepository = guestbookRepository;
    }

    async readGuestbook() {
        const take = parseInt(this.event.queryStringParameters?.take || "10", 10);

        const lastSK = this.event.queryStringParameters?.lastSK || null;

        if (isNaN(take)) return BaseResponse.from(400, { message: "Query parameter 'take' must be a number." });

        try {
            const response = await this.guestbookRepository.readGuestbook(take, lastSK);
            return BaseResponse.from(200, response);
        } catch (error) {
            console.error("Error reading guestbook:", error);
            return BaseResponse.from(500, { message: "Failed to read guestbook." });
        }
    }

    async createGuestbook() {
        try {
            const body = this.event.body ? JSON.parse(this.event.body) : {};
            const { to, from, content } = body;

            if (!to || !from || !content) {
                return BaseResponse.from(400, { message: "Missing required fields: to, from, content." });
            }

            const newItem = await this.guestbookRepository.createGuestbook(to, from, content);
            return BaseResponse.from(201, newItem);
        } catch (error) {
            console.error("Error creating guestbook entry:", error);

            if (error instanceof SyntaxError) return BaseResponse.from(400, { message: "Invalid JSON format in request body." });
            return BaseResponse.from(500, { message: "Failed to create guestbook entry." });
        }
    }

    /**
     * 방명록 항목을 삭제하는 요청을 처리합니다.
     */
    async deleteGuestbook() {
        const sk = this.event.pathParameters?.sk;

        if (!sk) return BaseResponse.from(400, { message: "Missing required path parameter: sk" });

        try {
            await this.guestbookRepository.deleteGuestbook(sk);
            return BaseResponse.from(204, {
                message: "Guestbook deleted successfully.",
            });
        } catch (error) {
            console.error(`Error deleting guestbook entry with sk ${sk}:`, error);

            return BaseResponse.from(500, { message: "Failed to delete guestbook entry." });
        }
    }
}
