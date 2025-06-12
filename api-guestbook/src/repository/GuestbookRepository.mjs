import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

export class GuestbookRepository {
    static GUESTBOOK_TABLE = process.env.GUESTBOOK_TABLE;

    constructor() {
        const client = new DynamoDBClient({ region: process.env.AWS_REGION });
        this.documentClient = DynamoDBDocumentClient.from(client);
    }

    /**
     * 방명록 목록을 조회합니다. 페이지네이션을 지원합니다.
     * @param {number} take - 가져올 항목의 최대 개수
     * @param {string | null} lastSK - 페이지네이션을 위한 마지막 항목의 SK (Sort Key)
     */
    async readGuestbook(take, lastSK) {
        const params = {
            TableName: GuestbookRepository.GUESTBOOK_TABLE,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: { ":pk": "Guestbook" },
            ScanIndexForward: false, // 최신순으로 정렬
            Limit: take,
        };

        if (lastSK) params.ExclusiveStartKey = { PK: "Guestbook", SK: lastSK };

        const command = new QueryCommand(params);
        const response = await this.documentClient.send(command);

        return {
            items: response.Items || [],
            lastSK: response.LastEvaluatedKey ? response.LastEvaluatedKey.SK : null,
        };
    }

    /**
     * 새로운 방명록 항목을 생성합니다.
     * @param {string} to - 받는 사람
     * @param {string} from - 보내는 사람
     * @param {string} content - 내용
     */
    async createGuestbook(to, from, content) {
        const createdAt = new Date().toISOString();
        const id = uuid();
        const item = {
            PK: "Guestbook",
            SK: `${createdAt}#${id}`,
            id,
            to,
            from,
            content,
            createdAt,
        };

        const putCommandParams = {
            TableName: GuestbookRepository.GUESTBOOK_TABLE,
            Item: item,
        };

        const putCommand = new PutCommand(putCommandParams);
        await this.documentClient.send(putCommand);
        return item;
    }

    /**
     * 특정 방명록 항목을 삭제합니다.
     * @param {string} sk - 삭제할 항목의 SK (Sort Key)}
     */
    async deleteGuestbook(sk) {
        const params = {
            TableName: GuestbookRepository.GUESTBOOK_TABLE,
            Key: {
                PK: "Guestbook",
                SK: sk,
            },
        };

        const command = new DeleteCommand(params);
        await this.documentClient.send(command);
    }
}
