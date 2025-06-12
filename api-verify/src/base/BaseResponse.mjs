export class BaseResponse {
    static from(statusCode, body) {
        return {
            statusCode,
            body: JSON.stringify(body),
        };
    }
}
